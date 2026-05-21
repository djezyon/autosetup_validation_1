import { BODY_ERRORS } from '../../data/bodyErrors';
import type { ValidationFlowState } from '../../hooks/useValidationFlow';
import { SizeComparisonView } from './SizeComparisonView';
import './BodyErrorsModal.css';

interface BodyErrorsModalProps {
  flow: ValidationFlowState;
}

export function BodyErrorsModal({ flow }: BodyErrorsModalProps) {
  const { expandedErrorId, setExpandedErrorId, modalView, editManually } = flow;

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
          Validation detected {BODY_ERRORS.length} Errors
        </div>

        <div className="body-errors-modal__accordion">
          {BODY_ERRORS.map((error) => {
            const isOpen = expandedErrorId === error.id;
            return (
              <div
                key={error.id}
                className={
                  isOpen
                    ? 'body-errors-modal__item body-errors-modal__item--open'
                    : 'body-errors-modal__item'
                }
              >
                <button
                  type="button"
                  className="body-errors-modal__row"
                  onClick={() =>
                    setExpandedErrorId(isOpen ? '' : error.id)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="body-errors-modal__index">{error.index}</span>
                  <span className="body-errors-modal__labels">
                    <span className="body-errors-modal__title">{error.title}</span>
                    <span className="body-errors-modal__subtitle">
                      {error.subtitle}
                    </span>
                  </span>
                  <span className="body-errors-modal__chevron" aria-hidden>
                    {isOpen ? '▾' : '▸'}
                  </span>
                </button>
                {isOpen && error.hasComparison && (
                  <SizeComparisonView flow={flow} />
                )}
                {isOpen && !error.hasComparison && (
                  <p className="body-errors-modal__stub">
                    Detailed comparison for this error is planned in a later
                    phase.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
