import type { ReactNode } from 'react';

interface PanelChromeProps {
  title: string;
  variant?: 'default' | 'alert';
  badge?: ReactNode;
  children?: React.ReactNode;
}

export function PanelChrome({
  title,
  variant = 'default',
  badge,
  children,
}: PanelChromeProps) {
  return (
    <div className={`panel-chrome panel-chrome--${variant}`}>
      <div className="panel-chrome__header">
        <div className="panel-chrome__title-row">
          <span className="panel-chrome__title">{title}</span>
          {badge}
        </div>
        <div className="panel-chrome__actions" aria-hidden>
          <button type="button" className="panel-chrome__icon-btn" title="Minimize">
            ⧉
          </button>
          <button type="button" className="panel-chrome__icon-btn" title="Close">
            ×
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
