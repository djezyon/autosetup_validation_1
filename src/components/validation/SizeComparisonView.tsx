import {
  FIX_HOTSPOTS,
  SIZE_COMPARISON,
  VALIDATION_ASSETS,
} from '../../data/bodyErrors';
import type { ValidationFlowState } from '../../hooks/useValidationFlow';
import './SizeComparisonView.css';

const SIZE_ERROR_ID = 'size-too-big';

interface SizeComparisonViewProps {
  flow: ValidationFlowState;
  errorId?: string;
}

export function SizeComparisonView({ flow, errorId = SIZE_ERROR_ID }: SizeComparisonViewProps) {
  const { modalView, acceptHotspot, acceptAllForError, isHotspotAccepted } = flow;

  return (
    <div className="size-comparison" data-modal-view={modalView}>
      <div className="size-comparison__panels">
        <div className="size-comparison__panel">
          <div className="size-comparison__bar size-comparison__bar--error">
            Found Error
          </div>
          <div className="size-comparison__viewport">
            <div className="size-comparison__stage">
              <img src={VALIDATION_ASSETS.foundError} alt="Found error preview" />
              {FIX_HOTSPOTS.map((hotspot) => (
                <FoundErrorLabel key={hotspot.id} hotspot={hotspot} />
              ))}
            </div>
          </div>
          <div className="size-comparison__copy">
            <span className="size-comparison__chip">Error Overview</span>
            <h3>{SIZE_COMPARISON.errorHeadline}</h3>
            <p>{SIZE_COMPARISON.errorBody}</p>
          </div>
        </div>

        <div className="size-comparison__panel">
          <div className="size-comparison__bar size-comparison__bar--fix">
            Suggested Fix
          </div>
          <div className="size-comparison__viewport size-comparison__viewport--fix">
            <div className="size-comparison__stage">
              <img src={VALIDATION_ASSETS.suggestedFix} alt="Suggested fix preview" />
              {FIX_HOTSPOTS.map((hotspot) => (
                <HotspotButton
                  key={hotspot.id}
                  hotspot={hotspot}
                  accepted={isHotspotAccepted(hotspot.id)}
                  onAccept={() => acceptHotspot(hotspot.id)}
                />
              ))}
            </div>
          </div>
          <div className="size-comparison__copy">
            <span className="size-comparison__chip">Suggested Fix Overview</span>
            <h3>{SIZE_COMPARISON.fixHeadline}</h3>
            <p>{SIZE_COMPARISON.fixBody}</p>
            <div className="size-comparison__actions">
              <button
                type="button"
                className="size-comparison__btn size-comparison__btn--primary"
                onClick={() => acceptAllForError(errorId)}
              >
                Accept All Fixes
              </button>
              <button
                type="button"
                className="size-comparison__btn"
                onClick={flow.editManually}
              >
                Edit Manually
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoundErrorLabel({
  hotspot,
}: {
  hotspot: (typeof FIX_HOTSPOTS)[number];
}) {
  return (
    <span
      className="size-comparison__marker"
      style={{ top: hotspot.top, left: hotspot.left }}
      data-hotspot={hotspot.id}
    >
      <span className="size-comparison__marker-spacer" aria-hidden />
      <span className="size-comparison__marker-label">{hotspot.label}</span>
    </span>
  );
}

function HotspotButton({
  hotspot,
  accepted,
  onAccept,
}: {
  hotspot: (typeof FIX_HOTSPOTS)[number];
  accepted: boolean;
  onAccept: () => void;
}) {
  const index = FIX_HOTSPOTS.findIndex((h) => h.id === hotspot.id) + 1;

  return (
    <button
      type="button"
      className={
        accepted
          ? 'size-comparison__hotspot size-comparison__hotspot--accepted'
          : 'size-comparison__hotspot'
      }
      style={{ top: hotspot.top, left: hotspot.left }}
      data-hotspot={hotspot.id}
      onClick={onAccept}
      aria-pressed={accepted}
    >
      <span
        className={
          accepted
            ? 'size-comparison__hotspot-badge size-comparison__hotspot-badge--done'
            : 'size-comparison__hotspot-badge'
        }
      >
        {accepted ? '✓' : index}
      </span>
      <span className="size-comparison__hotspot-label">
        {hotspot.label}
        {accepted ? ' ✓' : ''}
      </span>
    </button>
  );
}
