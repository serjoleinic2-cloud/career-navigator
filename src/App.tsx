import { useState, useEffect } from 'react';
import { loadRuntime } from './core/persistence/runtime_persistence';
import { startJourney, initializeRuntime } from './core/runtime/runtime_controller';
import { WorldRenderer } from './core';
import { OnboardingScreen } from './screens/OnboardingScreen/OnboardingScreen';
import { IntroJourneyScreen } from './screens/IntroJourneyScreen/IntroJourneyScreen';
import { PlaybookScreen } from './screens/PlaybookScreen/PlaybookScreen';
import { NotesScreen } from './screens/NotesScreen/NotesScreen';
import { ShareScreen } from './screens/ShareScreen/ShareScreen';
import { JourneyHUD } from './screens/JourneyScreen';
import { BottomNav } from './components/BottomNav/BottomNav';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

// NOTE: 'debug' screen (JourneyScreenDebug) was removed — it was a dead
// placeholder stub that had silently replaced the real World tab content.
// Per project Constitution §6-7 (single world, single HUD, no duplication),
// 'world' now always renders the real composition: WorldRenderer (art/
// camera/atmosphere engine) with JourneyHUD (chapter cards, missions, nav)
// mounted on top of it.
type Screen = 'world' | 'playbook' | 'notes' | 'share';

function AppInner() {
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
    if (tabId === 'world' || tabId === 'playbook' || tabId === 'notes' || tabId === 'share') {
      navigateTo(tabId as Screen);
    }
  };

  const closeToWorld = () => navigateTo('world');

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
        // WorldRenderer is the permanent art/camera engine; JourneyHUD is
        // the UI layer (chapter cards, missions) mounted on top of it —
        // exactly one world, exactly one HUD, per project Constitution.
        return (
          <div key={common.key} style={common.style}>
            <JourneyHUD />
          </div>
        );
      case 'playbook':
        return <PlaybookScreen key={common.key} style={common.style} onClose={closeToWorld} />;
      case 'notes':
        return <NotesScreen key={common.key} style={common.style} onClose={closeToWorld} />;
      case 'share':
        return <ShareScreen key={common.key} style={common.style} />;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* WorldRenderer stays permanently mounted underneath everything —
          it never unmounts when switching tabs, so the world never
          "resets" (art, camera position, atmosphere persist). */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <WorldRenderer mode="production" />
      </div>
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        {prevScreen && renderScreen(prevScreen, true)}
        {renderScreen(currentScreen, false)}
      </div>
      <BottomNav currentTab={currentScreen as 'world' | 'playbook' | 'notes' | 'share'} onTabChange={handleTabChange} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}
