import { useEffect, useState } from 'react';
import { loadRuntime } from './core/persistence/runtime_persistence';
import { initializeRuntime } from './core/runtime/runtime_controller';
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';
import { JourneyScreen } from './screens/JourneyScreen/JourneyScreen';
import { PlaybookScreen } from './screens/PlaybookScreen/PlaybookScreen';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPlaybook, setShowPlaybook] = useState(false);

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

  useEffect(() => {
    const onHashChange = () => {
      setShowPlaybook(window.location.hash === '#playbook');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (!isReady) return <div>Loading...</div>;

  if (showPlaybook) {
    return (
      <PlaybookScreen
        onBack={() => {
          setShowPlaybook(false);
          window.location.hash = '';
        }}
      />
    );
  }

  return showOnboarding ? <OnboardingScreen /> : <JourneyScreen />;
}

export default App;
