import { useEffect, useState } from 'react';
import { loadRuntime } from './core/persistence/runtime_persistence';
import { initializeRuntime } from './core/runtime/runtime_controller';
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';
import { JourneyScreen } from './screens/JourneyScreen/JourneyScreen';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const saved = loadRuntime();
    if (saved) {
      initializeRuntime(saved);
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
    setIsReady(true);
  }, []);

  if (!isReady) return <div>Loading...</div>;

  return showOnboarding ? <OnboardingScreen /> : <JourneyScreen />;
}

export default App;
