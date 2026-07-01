import { useState, useEffect } from 'react';
import { loadRuntime } from './core/persistence/runtime_persistence';
import { initializeRuntime, startJourney } from './core/runtime/runtime_controller';
import { WorldRenderer } from './world/world_renderer';
import { OnboardingScreen } from './screens/OnboardingScreen/OnboardingScreen';
import { IntroJourneyScreen } from './screens/IntroJourneyScreen/IntroJourneyScreen';
import { PlaybookScreen } from './screens/PlaybookScreen/PlaybookScreen';
import { NotesScreen } from './screens/NotesScreen/NotesScreen';
import { ShareScreen } from './screens/ShareScreen/ShareScreen';
import { JourneyScreenDebug } from './screens/JourneyScreen/JourneyScreenDebug';
import { AppShell } from './components/layout/AppShell';
import './App.css';

type Screen = 'world' | 'playbook' | 'notes' | 'share' | 'debug';

const SCREEN_TITLES: Record<string, string> = {
  world: 'Career Navigator',
  playbook: 'Playbook',
  notes: 'My Journal',
  share: 'Share Progress',
  debug: 'Debug',
};

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('world');
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);
  const [transitioning, setTransitioning] = useState(false);

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

  const navigateTo = (screen: Screen) => {
    if (screen === currentScreen || transitioning) return;
    setPrevScreen(currentScreen);
    setTransitioning(true);
    setCurrentScreen(screen);
    setTimeout(() => {
      setTransitioning(false);
      setPrevScreen(null);
    }, 300);
  };

  const handleTabChange = (tabId: string) => {
    if (tabId === 'world' || tabId === 'playbook' || tabId === 'notes' || tabId === 'share' || tabId === 'debug') {
      navigateTo(tabId as Screen);
    }
  };

  if (!isReady) return <div style={{ background: '#071320', minHeight: '100vh' }} />;

  if (showOnboarding) {
    return (
      <OnboardingScreen
        onComplete={(localState) => {
          const coreState = {
            professionId: localState.profession,
            experienceLevel: localState.experience,
            goals: localState.goals,
            timeline: localState.timeline,
            preferences: localState.preferences,
            situation: null,
            emotion: null,
            applicationsCount: null,
            interviewsCount: null,
            confidenceLevel: null,
            fears: [],
            step: 7,
            isComplete: true,
          };
          startJourney(coreState as any);
          setShowOnboarding(false);
          setShowIntro(true);
        }}
      />
    );
  }

  if (showIntro) {
    return (
      <IntroJourneyScreen
        onComplete={() => {
          setShowIntro(false);
        }}
      />
    );
  }

  const renderScreen = (screen: Screen, isPrev: boolean) => {
    const key = screen + (isPrev ? '-prev' : '');
    const style: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      opacity: isPrev ? 0 : 1,
      transform: isPrev ? 'translateX(-20px)' : 'translateX(0)',
      transition: 'opacity 250ms ease, transform 250ms ease',
      pointerEvents: isPrev ? 'none' : 'auto',
    };

    switch (screen) {
      case 'world':
        return <div key={key} style={style}><WorldRenderer /></div>;
      case 'playbook':
        return <div key={key} style={style}><PlaybookScreen /></div>;
      case 'notes':
        return <div key={key} style={style}><NotesScreen /></div>;
      case 'share':
        return <div key={key} style={style}><ShareScreen /></div>;
      case 'debug':
        return <div key={key} style={style}><JourneyScreenDebug /></div>;
    }
  };

  return (
    <AppShell
      title={SCREEN_TITLES[currentScreen] || 'Career Navigator'}
      activeTab={currentScreen === 'debug' ? 'journey' : currentScreen}
      onTabChange={handleTabChange}
    >
      <div style={{ position: 'relative', minHeight: '100%' }}>
        {prevScreen && renderScreen(prevScreen, true)}
        {renderScreen(currentScreen, false)}
      </div>
    </AppShell>
  );
}

export default App;
