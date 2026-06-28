import { useEffect, useState } from 'react';
import { loadRuntime } from './core/persistence/runtime_persistence';
import { initializeRuntime } from './core/runtime/runtime_controller';
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';
import { JourneyScreen } from './screens/JourneyScreen/JourneyScreen';
import { PlaybookScreen } from './screens/PlaybookScreen/PlaybookScreen';
import { NotesScreen } from './screens/NotesScreen/NotesScreen';
import { DashboardScreen } from './screens/DashboardScreen/DashboardScreen';

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPlaybook, setShowPlaybook] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

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
      setShowNotes(window.location.hash === '#notes');
      setShowDashboard(window.location.hash === '#dashboard');
    };
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (!isReady) return <div style={{ background: '#071320', minHeight: '100vh' }} />;

  if (showOnboarding) {
    return (
      <OnboardingScreen
        onComplete={() => {
          setShowOnboarding(false);
          window.location.hash = '';
        }}
      />
    );
  }

  if (showNotes) {
    return (
      <NotesScreen
        onBack={() => {
          setShowNotes(false);
          window.location.hash = '';
        }}
      />
    );
  }

  if (showDashboard) {
    return (
      <DashboardScreen
        onBack={() => {
          setShowDashboard(false);
          window.location.hash = '';
        }}
      />
    );
  }

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

  return <JourneyScreen />;
}

export default App;
