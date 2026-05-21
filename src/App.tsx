import { StudioLayout } from './components/studio/StudioLayout';
import { useValidationRun } from './hooks/useValidationRun';

function App() {
  const run = useValidationRun();

  return <StudioLayout run={run} />;
}

export default App;
