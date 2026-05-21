import { BodyErrorsModal } from '../validation/BodyErrorsModal';
import { FixSnackbar } from '../validation/FixSnackbar';
import type { ValidationFlowState } from '../../hooks/useValidationFlow';
import type { ValidationRunState } from '../../hooks/useValidationRun';
import { ExplorerPanel } from './ExplorerPanel';
import { SetupPanel } from './SetupPanel';
import { ValidationErrorsPanel } from './ValidationErrorsPanel';
import { ViewportPanel } from './ViewportPanel';
import './StudioLayout.css';

interface StudioLayoutProps {
  run: ValidationRunState;
  flow: ValidationFlowState;
}

export function StudioLayout({ run, flow }: StudioLayoutProps) {
  return (
    <div className="studio" data-figma-node="40000063:56345">
      <SetupPanel
        primaryTab={flow.snapshot.setupPrimaryTab}
        secondaryTab={flow.snapshot.setupSecondaryTab}
        onTabChange={flow.updateSnapshot}
      />
      <ViewportPanel />
      <aside className="studio__panels" aria-label="Side panels">
        <ExplorerPanel
          selection={flow.snapshot.explorerSelection}
          onSelect={(explorerSelection) =>
            flow.updateSnapshot({ explorerSelection, propertiesTarget: explorerSelection })
          }
        />
        <ValidationErrorsPanel run={run} flow={flow} />
      </aside>
      {flow.flowScreen === 'modal' && <BodyErrorsModal flow={flow} />}
      <FixSnackbar message={flow.snackbarMessage} />
    </div>
  );
}
