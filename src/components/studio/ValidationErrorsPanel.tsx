import { useMemo, useState } from 'react';
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
  const [panelExpanded, setPanelExpanded] = useState(false);
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
  const allClear = bodyCount === 0;

  const headerVariant = allClear ? 'success' : 'alert';

  return (
    <section
      className={
        allClear
          ? 'validation-panel validation-panel--all-clear'
          : 'validation-panel'
      }
      aria-label="Validation errors"
      data-figma-node={allClear ? '40000063:57729' : undefined}
    >
      <div className={`panel-chrome panel-chrome--${headerVariant}`}>
        <button
          type="button"
          className="panel-chrome__header panel-chrome__header-btn"
          onClick={() => !allClear && setPanelExpanded((v) => !v)}
          aria-expanded={allClear ? undefined : panelExpanded}
          disabled={allClear}
        >
          <div className="panel-chrome__title-row">
            <span className="panel-chrome__title">Validation Errors</span>
            <span
              className={
                allClear
                  ? 'validation-panel__badge validation-panel__badge--success'
                  : 'validation-panel__badge validation-panel__badge--alert'
              }
            >
              <span className="validation-panel__status-dot" aria-hidden />
              <span className="validation-panel__count">
                {allClear ? 'No Errors' : `${bodyCount} found`}
              </span>
            </span>
            {!allClear && (
              <span className="validation-panel__chevron" aria-hidden>
                {panelExpanded ? '▾' : '▸'}
              </span>
            )}
          </div>
          <div className="panel-chrome__actions" aria-hidden>
            <span className="panel-chrome__icon-btn">⧉</span>
            <span className="panel-chrome__icon-btn">×</span>
          </div>
        </button>
      </div>

      {panelExpanded && !allClear && (
        <>
          <button
            type="button"
            className="validation-panel__warning-card"
            onClick={flow.openModal}
          >
            <span className="validation-panel__warning-title">
              Validation detected {bodyCount} Errors
            </span>
            <span className="validation-panel__warning-hint">
              Tap to review body errors and suggested fixes
            </span>
          </button>

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
        </>
      )}

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
