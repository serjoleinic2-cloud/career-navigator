import { useState, useEffect } from 'react';
import { loadRuntime } from './core/persistence/runtime_persistence';
import { startJourney, initializeRuntime, getRuntimeState, resetJourney, setActiveChapter } from './core/runtime/runtime_controller';
import { loadNotes } from './core/user_data/notes/notes_persistence';
import { setNotes } from './core/user_data/notes/notes_store';
import { WorldRenderer } from './core';
import { OnboardingScreen } from './screens/OnboardingScreen/OnboardingScreen';
import { IntroJourneyScreen } from './screens/IntroJourneyScreen/IntroJourneyScreen';
import { PlaybookScreen } from './screens/PlaybookScreen';
import { NotesScreen } from './screens/NotesScreen/NotesScreen';
import { WorldMapScreen } from './screens/WorldMapScreen';
import { ProfileScreen } from './screens/ProfileScreen/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen/SettingsScreen';
import { JourneyHUD } from './screens/JourneyScreen';
import { InterviewTrainerScreen } from './screens/InterviewTrainerScreen';
import { BottomNav } from './components/BottomNav/BottomNav';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { subscribe } from './core/events/system_event_bus';
import { initNotifications } from './core/notifications/notification_service';
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
  const [showSettingsOverlay, setShowSettingsOverlay] = useState(false);
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
    void initNotifications();
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
      resetJourney();
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
            fears: localState.biggestFear,
            experienceLevel: null,
            goals: [],
            confidenceLevel: null,
            timeline: null,
            preferences: [],
            situation: null,
            emotion: null,
            applicationsCount: null,
            interviewsCount: null,
            step: 3,
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
        return (
          <WorldMapScreen
            key={common.key}
            style={common.style}
            onChapterSelect={(chapterId) => {
              // BUGFIX (2026-07-10): this used to mutate getRuntimeState()'s
              // result in place, which left JourneyHUD's memoized `chapters`
              // (keyed on referential equality of the runtime object) stale,
              // so the screen you landed on after tapping an island didn't
              // match the island you tapped. setActiveChapter() replaces the
              // runtime object (same immutable-update pattern as every other
              // mutator in runtime_controller.ts) and emits CHAPTER_CHANGED /
              // NODE_CHANGED / UI_REFRESH so the HUD actually re-derives.
              if (getRuntimeState()) {
                setActiveChapter(chapterId);
              }
              setCurrentScreen('journey');
            }}
          />
        );
      case 'profile':
        return <ProfileScreen key={common.key} style={common.style} onClose={closeToJourney} onOpenSettings={() => setShowSettingsOverlay(true)} />;
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
      {showSettingsOverlay && <SettingsScreen onClose={() => setShowSettingsOverlay(false)} />}
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
