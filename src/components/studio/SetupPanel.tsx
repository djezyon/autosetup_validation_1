import { FIGMA_ASSETS } from '../../assets/figma';
import './SetupPanel.css';

const PREVIEW_THUMBS = [
  FIGMA_ASSETS.setupPreview,
  'https://www.figma.com/api/mcp/asset/f0c4c93b-38dc-4f0b-8f03-da7e40a00923',
  'https://www.figma.com/api/mcp/asset/ff52932e-89fa-4f98-a3d0-12cd5883481a',
  'https://www.figma.com/api/mcp/asset/4d9f7546-427f-4cc4-bdc1-c5b36a604684',
];

interface SetupPanelProps {
  primaryTab: string;
  secondaryTab: string;
  onTabChange: (patch: {
    setupPrimaryTab?: string;
    setupSecondaryTab?: string;
  }) => void;
}

export function SetupPanel({
  primaryTab,
  secondaryTab,
  onTabChange,
}: SetupPanelProps) {
  return (
    <section className="setup-panel" aria-label="Avatar Setup">
      <header className="setup-panel__header">
        <span>Avatar Setup</span>
        <div className="setup-panel__header-actions" aria-hidden>
          <button type="button">⧉</button>
          <button type="button">×</button>
        </div>
      </header>

      <div className="setup-panel__body">
        <nav className="setup-panel__nav" aria-label="Setup modes">
          <button type="button" className="setup-panel__nav-btn" title="Avatar">
            ◉
          </button>
          <button
            type="button"
            className="setup-panel__nav-btn setup-panel__nav-btn--active"
            title="Body"
          >
            ☺
          </button>
          <button type="button" className="setup-panel__nav-btn" title="Play">
            ▶
          </button>
          <button type="button" className="setup-panel__nav-btn" title="Import">
            ↑
          </button>
        </nav>

        <div className="setup-panel__main">
          <div className="setup-panel__tabs setup-panel__tabs--primary">
            {['Animation', 'Body', 'Makeup', 'Rigid'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={
                  tab === primaryTab
                    ? 'setup-panel__tab setup-panel__tab--active'
                    : 'setup-panel__tab'
                }
                onClick={() => onTabChange({ setupPrimaryTab: tab })}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="setup-panel__tabs setup-panel__tabs--secondary">
            {['Skin', 'Head', 'Eyes'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={
                  tab === secondaryTab
                    ? 'setup-panel__tab setup-panel__tab--active'
                    : 'setup-panel__tab'
                }
                onClick={() => onTabChange({ setupSecondaryTab: tab })}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="setup-panel__workspace">
            <div className="setup-panel__tray">
              {PREVIEW_THUMBS.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={
                    i === 0
                      ? 'setup-panel__thumb setup-panel__thumb--selected'
                      : 'setup-panel__thumb'
                  }
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
            <div className="setup-panel__preview">
              <img
                className="setup-panel__preview-img"
                src={FIGMA_ASSETS.setupPreview}
                alt="Avatar preview"
              />
              <div className="setup-panel__timeline">
                <button type="button" className="setup-panel__play" aria-label="Play">
                  ▶
                </button>
                <div className="setup-panel__slider">
                  <div className="setup-panel__slider-fill" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
