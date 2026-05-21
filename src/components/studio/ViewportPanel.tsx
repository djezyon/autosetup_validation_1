import { FIGMA_ASSETS } from '../../assets/figma';
import './ViewportPanel.css';

export function ViewportPanel() {
  return (
    <section className="viewport-panel" aria-label="Viewport">
      <div className="viewport-panel__tabs">
        <div className="viewport-panel__tab viewport-panel__tab--active">
          <span className="viewport-panel__tab-icon">🌐</span>
          Baseplate
          <button type="button" className="viewport-panel__tab-close" aria-label="Close tab">
            ×
          </button>
        </div>
        <div className="viewport-panel__tab">
          <span className="viewport-panel__tab-icon">📜</span>
          ModuleScript
        </div>
        <div className="viewport-panel__tab">
          <span className="viewport-panel__tab-icon">📜</span>
          LocalScript
        </div>
      </div>
      <div className="viewport-panel__canvas">
        <img
          className="viewport-panel__bg"
          src={FIGMA_ASSETS.viewportBg}
          alt=""
        />
        <img
          className="viewport-panel__character"
          src={FIGMA_ASSETS.viewportCharacter}
          alt="Avatar in viewport"
        />
        <div className="viewport-panel__toolbar" aria-hidden>
          <button type="button" title="Attachments">
            ⊕
          </button>
          <button type="button" title="Caging">
            ▣
          </button>
        </div>
      </div>
    </section>
  );
}
