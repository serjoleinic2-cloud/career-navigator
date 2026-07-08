import { useState, useEffect } from 'react';
import { loadRuntime } from './core/persistence/runtime_persistence';
import { startJourney, initializeRuntime, getRuntimeState, resetJourney } from './core/runtime/runtime_controller';
import { loadNotes } from './core/user_data/notes/notes_persistence';
import { setNotes } from './core/user_data/notes/notes_store';
import { WorldRenderer } from './core';
import { OnboardingScreen } from './screens/OnboardingScreen/OnboardingScreen';
import { IntroJourneyScreen } from './screens/IntroJourneyScreen/IntroJourneyScreen';
import { PlaybookScreen } from './screens/PlaybookScreen/PlaybookScreen';
import { NotesScreen } from './screens/NotesScreen/NotesScreen';
import { WorldMapScreen } from './screens/WorldMapScreen/WorldMapScreen';
import { ProfileScreen } from './screens/ProfileScreen/ProfileScreen';
import { JourneyHUD } from './screens/JourneyScreen';
import { InterviewTrainerScreen } from './screens/InterviewTrainerScreen/InterviewTrainerScreen';
import { BottomNav } from './components/BottomNav/BottomNav';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { subscribe } from './core/events/system_event_bus';
import type { PlaybookCategory } from './core/playbook/playbook_types';
import './App.css';

// Bottom nav restructured per +Window_functional.md (Serj/ChatGPT design
// doc): 5 tabs instead of 4. The old 'world' tab (WorldRenderer +
// JourneyHUD — the actual working screen with missions) is renamed
// 'journey' here, since a *different*, new 'world' tab now exists: an
// illustrated travel map (WorldMapScreen — intentionally left empty for
// now, see that file). 'share' is no longer a tab; it moved into
// ProfileScreen as an action button ("Share Progress"), per the doc's
// "Share — это кнопка. Не экран." decision.
type Screen = 'journey' | 'playbook' | 'notes' | 'world' | 'profile' | 'interview';

function AppInner() {
  const [isReady, setIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('journey');
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  // Deep-link target set by a mission's "Learn more" button (see
  // MissionScreen.tsx) via the OPEN_PLAYBOOK event — lets a task jump
  // straight to its matching Playbook category instead of the user
  // having to navigate there manually and guess which one it was.
  const [playbookDeepLink, setPlaybookDeepLink] = useState<PlaybookCategory | null>(null);

  useEffect(() => {
    // BUGFIX (2026-07-05): notes_store initialises to [] on every cold start.
    // loadNotes() was defined but never called, so persisted notes were never
    // restored — the store stayed empty until the user manually created a new
    // note in the current session, at which point old notes were overwritten.
    const savedNotes = loadNotes();
    if (savedNotes) setNotes(savedNotes);

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
    return subscribe('OPEN_PLAYBOOK', (event) => {
      const category = event.payload.category as PlaybookCategory | undefined;
      if (category) setPlaybookDeepLink(category);
      setCurrentScreen('playbook');
    });
  }, []);

  useEffect(() => {
    return subscribe('START_INTERVIEW_TRAINER', () => {
      setCurrentScreen('interview');
    });
  }, []);

  useEffect(() => {
    return subscribe('RESET_JOURNEY', () => {
<<<<<<< HEAD
      resetJourney();
=======
      clearRuntime();
      // BUGFIX (2026-07-08): clearAll() used to wipe every event-bus
      // subscriber here, including the useEffect-based subscriptions in
      // this very component (OPEN_PLAYBOOK, START_INTERVIEW_TRAINER,
      // this RESET_JOURNEY handler itself, etc.) since App never
      // remounts, plus module-singleton listeners like skill_engine.ts's
      // MISSION_SUBMIT handler. That's what caused "New Journey" ->
      // first mission to hang on "Saving progress..." forever (the
      // MISSION_SUBMIT event had no listener left to answer it). Resetting
      // the journey only needs to clear persisted runtime state, not
      // tear down the whole app-wide event bus.
>>>>>>> 7575280765b653cb75cdb321217bd0a49cf0d2f3
      setCurrentScreen('journey');
      setShowOnboarding(true);
    });
  }, []);

  useEffect(() => {
    return subscribe('INTERVIEW_SESSION_COMPLETE', () => {
      setCurrentScreen('journey');
    });
  }, []);

  useEffect(() => {
    return subscribe('CLOSE_INTERVIEW_TRAINER', () => {
      setCurrentScreen('journey');
    });
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
    if (tabId === 'journey' || tabId === 'playbook' || tabId === 'notes' || tabId === 'world' || tabId === 'profile' || tabId === 'interview') {
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
        return (
          <PlaybookScreen
            key={common.key}
            style={common.style}
            onClose={closeToJourney}
            initialCategory={playbookDeepLink}
            onConsumeInitialCategory={() => setPlaybookDeepLink(null)}
          />
        );
      case 'notes':
        return <NotesScreen key={common.key} style={common.style} onClose={closeToJourney} professionId={getRuntimeState()?.professionId || 'software_engineer'} />;
      case 'world':
        return <WorldMapScreen key={common.key} style={common.style} />;
      case 'profile':
        return <ProfileScreen key={common.key} style={common.style} onClose={closeToJourney} />;
      case 'interview':
        return (
          <InterviewTrainerScreen
            key={common.key}
            onClose={() => navigateTo('journey')}
          />
        );
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
