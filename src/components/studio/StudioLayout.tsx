import type { ValidationRunState } from '../../hooks/useValidationRun';
import { ExplorerPanel } from './ExplorerPanel';
import { SetupPanel } from './SetupPanel';
import { ValidationErrorsPanel } from './ValidationErrorsPanel';
import { ViewportPanel } from './ViewportPanel';
import './StudioLayout.css';

interface StudioLayoutProps {
  run: ValidationRunState;
}

export function StudioLayout({ run }: StudioLayoutProps) {
  return (
    <div className="studio" data-figma-node="40000063:56345">
      <SetupPanel />
      <ViewportPanel />
      <aside className="studio__panels" aria-label="Side panels">
        <ExplorerPanel />
        <ValidationErrorsPanel run={run} />
      </aside>
    </div>
  );
}
