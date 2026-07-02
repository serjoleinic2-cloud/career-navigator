import { useState, useEffect } from 'react';
import { loadRuntime } from './core/persistence/runtime_persistence';
import { startJourney, initializeRuntime } from './core/runtime/runtime_controller';
import { WorldRenderer } from './core';
import { OnboardingScreen } from './screens/OnboardingScreen/OnboardingScreen';
import { IntroJourneyScreen } from './screens/IntroJourneyScreen/IntroJourneyScreen';
import { PlaybookScreen } from './screens/PlaybookScreen/PlaybookScreen';
import { NotesScreen } from './screens/NotesScreen/NotesScreen';
import { ShareScreen } from './screens/ShareScreen/ShareScreen';
import { JourneyScreenDebug } from './screens/JourneyScreen/JourneyScreenDebug';
import { BottomNav } from './components/BottomNav/BottomNav';
import './App.css';

type Screen = 'world' | 'playbook' | 'notes' | 'share' | 'debug';

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

  if (!isReady) return null;

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
    const common = {
      key: screen + (isPrev ? '-prev' : ''),
      style: {
        position: 'absolute' as const,
        inset: 0,
        opacity: isPrev ? 0 : 1,
        transform: isPrev ? 'translateX(-20px)' : 'translateX(0)',
        transition: 'opacity 250ms ease, transform 250ms ease',
        pointerEvents: isPrev ? ('none' as const) : ('auto' as const),
      },
    };

    switch (screen) {
      case 'world':
        return <WorldRenderer key={common.key} style={common.style} />;
      case 'playbook':
        return <PlaybookScreen key={common.key} style={common.style} />;
      case 'notes':
        return <NotesScreen key={common.key} style={common.style} />;
      case 'share':
        return <ShareScreen key={common.key} style={common.style} />;
      case 'debug':
        return <JourneyScreenDebug key={common.key} style={common.style} />;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {prevScreen && renderScreen(prevScreen, true)}
      {renderScreen(currentScreen, false)}
      <BottomNav currentTab={currentScreen as 'world' | 'playbook' | 'notes' | 'share'} onTabChange={handleTabChange} />
    </div>
  );
}

export default App;
