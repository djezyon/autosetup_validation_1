import { useMemo, useState } from 'react';
import { BODY_ERROR_COUNT } from '../../data/bodyErrors';
import type { ValidationFlowState } from '../../hooks/useValidationFlow';
import type { ValidationRunState } from '../../hooks/useValidationRun';
import { formatIssuesForCopy, groupByCategory } from '../../lib/humanize';
import { ErrorCard } from '../ErrorCard';
import { PanelChrome } from './PanelChrome';
import './ValidationErrorsPanel.css';

interface ValidationErrorsPanelProps {
  run: ValidationRunState;
  flow: ValidationFlowState;
}

export function ValidationErrorsPanel({ run, flow }: ValidationErrorsPanelProps) {
  const [showRoxyList, setShowRoxyList] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [copyLabel, setCopyLabel] = useState('Copy all');

  const openIssues = useMemo(
    () => run.issues.filter((i) => i.status === 'open'),
    [run.issues],
  );

  const grouped = useMemo(() => groupByCategory(openIssues), [openIssues]);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(formatIssuesForCopy(run.issues));
    setCopyLabel('Copied!');
    window.setTimeout(() => setCopyLabel('Copy all'), 2000);
  };

  const bodyCount = flow.openCount;
  const badge = (
    <span className="validation-panel__badge">
      <span className="validation-panel__status-dot" aria-hidden />
      <span className="validation-panel__count">
        {bodyCount > 0 ? `${bodyCount} found` : 'cleared'}
      </span>
    </span>
  );

  return (
    <section className="validation-panel" aria-label="Validation errors">
      <PanelChrome title="Validation Errors" variant="alert" badge={badge} />

      {bodyCount > 0 ? (
        <button
          type="button"
          className="validation-panel__warning-card"
          onClick={flow.openModal}
        >
          <span className="validation-panel__warning-title">
            Validation detected {BODY_ERROR_COUNT} Errors
          </span>
          <span className="validation-panel__warning-hint">
            Tap to review body errors and suggested fixes
          </span>
        </button>
      ) : (
        <p className="validation-panel__cleared" role="status">
          All body fixes applied. Re-run validation to scan again.
        </p>
      )}

      <div className="validation-panel__phase1">
        <button
          type="button"
          className="validation-panel__phase1-toggle"
          onClick={() => setShowRoxyList((v) => !v)}
          aria-expanded={showRoxyList}
        >
          {showRoxyList ? 'Hide' : 'Show'} Roxy issue list (Phase 1)
        </button>

        {showRoxyList && (
          <div className="validation-panel__body">
            {run.diffMessage && (
              <p className="validation-panel__diff" role="status">
                {run.diffMessage}
              </p>
            )}

            <div className="validation-panel__toolbar">
              <button
                type="button"
                className="validation-panel__btn validation-panel__btn--primary"
                onClick={run.rerun}
                disabled={run.isRunning}
              >
                {run.isRunning ? 'Re-running…' : 'Re-run validation'}
              </button>
              <button
                type="button"
                className="validation-panel__btn"
                onClick={copyAll}
              >
                {copyLabel}
              </button>
            </div>

            <div className="validation-panel__list">
              {openIssues.length === 0 ? (
                <p className="validation-panel__empty">No open validation issues.</p>
              ) : (
                Object.entries(grouped).map(([category, issues]) => (
                  <div key={category} className="validation-panel__group">
                    <h3>
                      {category}
                      <span>{issues.length}</span>
                    </h3>
                    {issues.map((issue) => (
                      <ErrorCard
                        key={issue.id}
                        issue={issue}
                        expanded={expandedIds.has(issue.id)}
                        onToggle={() => toggleExpanded(issue.id)}
                        onMarkResolved={() => run.toggleResolved(issue.id)}
                      />
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <PanelChrome title="Properties">
        <div className="validation-panel__properties-placeholder">
          {flow.snapshot.propertiesTarget
            ? `Properties: ${flow.snapshot.propertiesTarget}`
            : 'Select an object to view properties.'}
        </div>
      </PanelChrome>
    </section>
  );
}
