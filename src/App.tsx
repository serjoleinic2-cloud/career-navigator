import { useState, useEffect } from 'react';
import { loadRuntime } from './core/persistence/runtime_persistence';
import { startJourney, initializeRuntime } from './core/runtime/runtime_controller';
import { WorldRenderer } from './core';
import { OnboardingScreen } from './screens/OnboardingScreen/OnboardingScreen';
import { IntroJourneyScreen } from './screens/IntroJourneyScreen/IntroJourneyScreen';
import { PlaybookScreen } from './screens/PlaybookScreen/PlaybookScreen';
import { NotesScreen } from './screens/NotesScreen/NotesScreen';
import { WorldMapScreen } from './screens/WorldMapScreen/WorldMapScreen';
import { ProfileScreen } from './screens/ProfileScreen/ProfileScreen';
import { JourneyHUD } from './screens/JourneyScreen';
import { BottomNav } from './components/BottomNav/BottomNav';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

// Bottom nav restructured per +Window_functional.md (Serj/ChatGPT design
// doc): 5 tabs instead of 4. The old 'world' tab (WorldRenderer +
// JourneyHUD — the actual working screen with missions) is renamed
// 'journey' here, since a *different*, new 'world' tab now exists: an
// illustrated travel map (WorldMapScreen — intentionally left empty for
// now, see that file). 'share' is no longer a tab; it moved into
// ProfileScreen as an action button ("Share Progress"), per the doc's
// "Share — это кнопка. Не экран." decision.
type Screen = 'journey' | 'playbook' | 'notes' | 'world' | 'profile';

function AppInner() {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('journey');
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
    if (tabId === 'journey' || tabId === 'playbook' || tabId === 'notes' || tabId === 'world' || tabId === 'profile') {
      navigateTo(tabId as Screen);
    }
  };

  const closeToJourney = () => navigateTo('journey');

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
      case 'journey':
        // WorldRenderer is the permanent art/camera engine; JourneyHUD is
        // the UI layer (chapter cards, missions) mounted on top of it —
        // exactly one world, exactly one HUD, per project Constitution.
        // This is the tab formerly called 'world' (renamed, not rebuilt —
        // see +Window_functional.md).
        return (
          <div key={common.key} style={common.style}>
            <JourneyHUD />
          </div>
        );
      case 'playbook':
        return <PlaybookScreen key={common.key} style={common.style} onClose={closeToJourney} />;
      case 'notes':
        return <NotesScreen key={common.key} style={common.style} onClose={closeToJourney} />;
      case 'world':
        return <WorldMapScreen key={common.key} style={common.style} />;
      case 'profile':
        return <ProfileScreen key={common.key} style={common.style} onClose={closeToJourney} />;
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
      <BottomNav currentTab={currentScreen as 'journey' | 'playbook' | 'notes' | 'world' | 'profile'} onTabChange={handleTabChange} />
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
