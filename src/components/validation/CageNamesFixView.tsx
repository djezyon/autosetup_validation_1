import { CAGE_NAME_COPY, CAGE_NAME_FIXES } from '../../data/bodyErrors';
import type { ValidationFlowState } from '../../hooks/useValidationFlow';
import './CageNamesFixView.css';

const CAGE_ERROR_ID = 'cage-names';

interface CageNamesFixViewProps {
  flow: ValidationFlowState;
}

export function CageNamesFixView({ flow }: CageNamesFixViewProps) {
  const accepted = flow.cageAccepted;

  return (
    <div className="cage-fix" data-figma-node="40000063:55820">
      <div className="cage-fix__table">
        <div className="cage-fix__header">
          <span className="cage-fix__col cage-fix__col--error">Found Error</span>
          <span className="cage-fix__col cage-fix__col--fix">Suggested Fix</span>
        </div>
        {CAGE_NAME_FIXES.map((row, index) => {
          const checked = accepted.has(row.id);
          return (
            <div
              key={row.id}
              className={
                checked
                  ? 'cage-fix__row cage-fix__row--accepted'
                  : 'cage-fix__row'
              }
            >
              <div className="cage-fix__found">
                <span className="cage-fix__index">{index + 1}</span>
                <span className="cage-fix__name">{row.found}</span>
                <span className="cage-fix__pill">{row.foundChip}</span>
              </div>
              <div className="cage-fix__suggested">
                <label className="cage-fix__check-label">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => flow.toggleCageFix(row.id)}
                  />
                  <span className="cage-fix__check-ui" aria-hidden />
                </label>
                <span className="cage-fix__name">{row.suggested}</span>
                <span className="cage-fix__pill">{row.suggestedChip}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cage-fix__footers">
        <div className="cage-fix__overview">
          <span className="cage-fix__chip">Error Overview</span>
          <h3>{CAGE_NAME_COPY.errorHeadline}</h3>
        </div>
        <div className="cage-fix__overview cage-fix__overview--fix">
          <span className="cage-fix__chip">Suggested Fix Overview</span>
          <h3>{CAGE_NAME_COPY.fixHeadline}</h3>
          <p>{CAGE_NAME_COPY.fixBody}</p>
          <div className="cage-fix__actions">
            <button
              type="button"
              className="cage-fix__btn cage-fix__btn--primary"
              onClick={() => flow.acceptAllForError(CAGE_ERROR_ID)}
            >
              Accept All Fixes
            </button>
            <button
              type="button"
              className="cage-fix__btn"
              onClick={flow.editManually}
            >
              Edit Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
