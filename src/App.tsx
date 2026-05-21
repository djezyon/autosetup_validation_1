import { StudioLayout } from './components/studio/StudioLayout';
import { useValidationFlow } from './hooks/useValidationFlow';
import { useValidationRun } from './hooks/useValidationRun';

function App() {
  const run = useValidationRun();
  const flow = useValidationFlow();

  return <StudioLayout run={run} flow={flow} />;
}

export default App;
