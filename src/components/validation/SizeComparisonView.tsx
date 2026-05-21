import {
  FIX_HOTSPOTS,
  SIZE_COMPARISON,
  VALIDATION_ASSETS,
} from '../../data/bodyErrors';
import type { ValidationFlowState } from '../../hooks/useValidationFlow';
import './SizeComparisonView.css';

interface SizeComparisonViewProps {
  flow: ValidationFlowState;
}

export function SizeComparisonView({ flow }: SizeComparisonViewProps) {
  const { modalView, acceptedHotspots, acceptHotspot } = flow;

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
              <span className="size-comparison__label" style={{ top: '18%', left: '62%' }}>
                Head
              </span>
              <span className="size-comparison__label" style={{ top: '52%', left: '6%' }}>
                Right shoulder
              </span>
              <span className="size-comparison__label" style={{ top: '52%', left: '68%' }}>
                Left shoulder
              </span>
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
                  accepted={acceptedHotspots.has(hotspot.id)}
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
                onClick={flow.acceptAllFixes}
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
