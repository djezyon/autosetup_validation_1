import type { OpenBodyError } from '../../types/bodyErrors';
import type { ValidationFlowState } from '../../hooks/useValidationFlow';
import { CageNamesFixView } from './CageNamesFixView';
import { SizeComparisonView } from './SizeComparisonView';
import './BodyErrorsModal.css';

interface BodyErrorsModalProps {
  flow: ValidationFlowState;
}

function ErrorPanel({ error, flow }: { error: OpenBodyError; flow: ValidationFlowState }) {
  if (error.panel === 'size-comparison') {
    return <SizeComparisonView flow={flow} errorId={error.id} />;
  }
  if (error.id === 'cage-names') {
    return <CageNamesFixView flow={flow} />;
  }
  return (
    <p className="body-errors-modal__stub">
      Detailed comparison for this error is planned in a later phase.
    </p>
  );
}

function ErrorAccordionItem({
  error,
  isOpen,
  onToggle,
  flow,
}: {
  error: OpenBodyError;
  isOpen: boolean;
  onToggle: () => void;
  flow: ValidationFlowState;
}) {
  return (
    <div
      className={
        isOpen
          ? 'body-errors-modal__item body-errors-modal__item--open'
          : 'body-errors-modal__item'
      }
    >
      <button
        type="button"
        className="body-errors-modal__row"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="body-errors-modal__index">{error.displayIndex}</span>
        <span className="body-errors-modal__labels">
          <span className="body-errors-modal__title">{error.title}</span>
          <span className="body-errors-modal__subtitle">{error.subtitle}</span>
        </span>
        <span className="body-errors-modal__chevron" aria-hidden>
          {isOpen ? '▾' : '▸'}
        </span>
      </button>
      {isOpen && <ErrorPanel error={error} flow={flow} />}
    </div>
  );
}

export function BodyErrorsModal({ flow }: BodyErrorsModalProps) {
  const { openErrors, openCount, expandedErrorId, setExpandedErrorId, modalView, editManually } =
    flow;
  const [primaryError, ...secondaryErrors] = openErrors;

  return (
    <div
      className="body-errors-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="body-errors-title"
      data-modal-view={modalView}
    >
      <button
        type="button"
        className="body-errors-modal__backdrop"
        aria-label="Close"
        onClick={editManually}
      />
      <div className="body-errors-modal__dialog">
        <header className="body-errors-modal__titlebar">
          <h2 id="body-errors-title">Body Errors</h2>
          <button
            type="button"
            className="body-errors-modal__close"
            onClick={editManually}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="body-errors-modal__alert" role="alert">
          Validation detected {openCount} Errors
        </div>

        {primaryError && (
          <div className="body-errors-modal__primary">
            <ErrorAccordionItem
              error={primaryError}
              isOpen={expandedErrorId === primaryError.id}
              onToggle={() =>
                setExpandedErrorId(
                  expandedErrorId === primaryError.id ? '' : primaryError.id,
                )
              }
              flow={flow}
            />
          </div>
        )}

        {secondaryErrors.length > 0 && (
          <div className="body-errors-modal__secondary-scroll">
            {secondaryErrors.map((error) => (
              <ErrorAccordionItem
                key={error.id}
                error={error}
                isOpen={expandedErrorId === error.id}
                onToggle={() =>
                  setExpandedErrorId(
                    expandedErrorId === error.id ? '' : error.id,
                  )
                }
                flow={flow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
