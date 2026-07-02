import { useState, useEffect } from 'react';
import { loadRuntime } from './core/persistence/runtime_persistence';
import { initializeRuntime, startJourney } from './core/runtime/runtime_controller';
import { WorldRenderer } from './world/world_renderer';
import { OnboardingScreen } from './screens/OnboardingScreen/OnboardingScreen';
import { IntroJourneyScreen } from './screens/IntroJourneyScreen/IntroJourneyScreen';
import { PlaybookScreen } from './screens/PlaybookScreen/PlaybookScreen';
import { NotesScreen } from './screens/NotesScreen/NotesScreen';
import { ShareScreen } from './screens/ShareScreen/ShareScreen';
import { JourneyHUD } from './screens/JourneyScreen';
import { AppShell } from './components/layout/AppShell';
import './App.css';

type Screen = 'world' | 'playbook' | 'notes' | 'share';

const SCREEN_TITLES: Record<string, string> = {
  world: 'Career Navigator',
  playbook: 'Playbook',
  notes: 'My Journal',
  share: 'Share Progress',
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
    if (tabId === 'world' || tabId === 'playbook' || tabId === 'notes' || tabId === 'share') {
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
        // JourneyHUD is UI-only (mission cards, header, nav) — the world
        // itself is the persistent <WorldRenderer/> mounted below, once,
        // outside this switch. See задание.txt ARCHITECTURE DECISION.
        return <div key={key} style={style}><JourneyHUD /></div>;
      case 'playbook':
        return <div key={key} style={style}><PlaybookScreen /></div>;
      case 'notes':
        return <div key={key} style={style}><NotesScreen /></div>;
      case 'share':
        return <div key={key} style={style}><ShareScreen /></div>;
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Permanent rendering engine — world, camera, atmosphere, islands,
          particles, lighting. Mounted once for both Intro and Journey;
          never unmounted between them, so the player never "leaves" the
          world (Feature Milestone #2, TASK 2/3). */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <WorldRenderer />
      </div>

      {showIntro ? (
        <div style={{ position: 'relative', zIndex: 1 }}>
          <IntroJourneyScreen
            onComplete={() => {
              setShowIntro(false);
            }}
          />
        </div>
      ) : (
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AppShell
            title={SCREEN_TITLES[currentScreen] || 'Career Navigator'}
            activeTab={currentScreen}
            onTabChange={handleTabChange}
          >
            <div style={{ position: 'relative', minHeight: '100%' }}>
              {prevScreen && renderScreen(prevScreen, true)}
              {renderScreen(currentScreen, false)}
            </div>
          </AppShell>
        </div>
      )}
    </div>
  );
}

export default App;
