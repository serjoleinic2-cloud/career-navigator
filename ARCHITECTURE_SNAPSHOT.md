# Architecture Snapshot

> Generated: 2026-06-29
>
> No analysis, no recommendations. Only facts.

---

## SECTION 1 — Project tree (depth 4)

```
src/
├── App.css
├── App.tsx
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components/
│   ├── BottomNav/
│   │   └── BottomNav.tsx
│   ├── FloatingOrb/
│   │   ├── FloatingOrb.css
│   │   ├── FloatingOrb.tsx
│   │   └── index.ts
│   ├── GoalCard/
│   │   ├── GoalCard.css
│   │   ├── GoalCard.tsx
│   │   └── index.ts
│   ├── JourneyBottomNav/
│   │   ├── JourneyBottomNav.css
│   │   └── JourneyBottomNav.tsx
│   ├── JourneyFocusPanel/
│   │   ├── JourneyFocusPanel.css
│   │   └── JourneyFocusPanel.tsx
│   ├── JourneyHeader/
│   │   ├── JourneyHeader.css
│   │   └── JourneyHeader.tsx
│   ├── JourneyNodeView/
│   │   ├── JourneyNodeView.css
│   │   └── JourneyNodeView.tsx
│   ├── JourneyPath/
│   │   ├── JourneyPath.css
│   │   ├── JourneyPath.tsx
│   │   └── theme.ts
│   ├── JourneyTimeline/
│   │   ├── JourneyTimeline.css
│   │   └── JourneyTimeline.tsx
│   ├── JourneyVisualLayer/
│   │   ├── JourneyVisualLayer.css
│   │   └── JourneyVisualLayer.tsx
│   ├── PathNode/
│   │   ├── PathNode.css
│   │   ├── PathNode.tsx
│   │   └── index.ts
│   ├── ShareCard/
│   │   ├── ShareCard.css
│   │   └── ShareCard.tsx
│   └── layout/
│       ├── AppShell.tsx
│       ├── BottomNavigation.css
│       ├── BottomNavigation.tsx
│       ├── GlassCard.css
│       ├── GlassCard.tsx
│       ├── IconButton.css
│       ├── IconButton.tsx
│       ├── PrimaryButton.css
│       ├── PrimaryButton.tsx
│       ├── ProgressRing.css
│       ├── ProgressRing.tsx
│       ├── TopBar.css
│       └── TopBar.tsx
├── core/
│   ├── index.ts
│   ├── advice_engine.ts
│   ├── chapter_engine.ts
│   ├── chapter_model.ts
│   ├── chapter_view_model.ts
│   ├── chapters.ts
│   ├── confidence_engine.ts
│   ├── depth_mapper.ts
│   ├── flow_mapper.ts
│   ├── focus_gravity.ts
│   ├── focus_snap_controller.ts
│   ├── gap_engine.ts
│   ├── journey_adapter.ts
│   ├── journey_orchestrator.ts
│   ├── orchestrator.ts
│   ├── profession_bootstrap.ts
│   ├── profession_contract.ts
│   ├── profession_loader.ts
│   ├── profession_metadata.ts
│   ├── profession_validation.ts
│   ├── readiness_dashboard.ts
│   ├── readiness_engine.ts
│   ├── rules.ts
│   ├── skill_state.ts
│   ├── task_content.ts
│   ├── visual_flow.ts
│   ├── visual_node_renderer.ts
│   ├── attempt/
│   ├── bootstrap/
│   ├── bridge/
│   ├── events/
│   ├── export/
│   ├── gap/
│   ├── interaction/
│   ├── learning/
│   ├── memory/
│   ├── mobile/
│   ├── onboarding/
│   ├── performance/
│   ├── persistence/
│   ├── playbook/
│   ├── premium/
│   ├── runtime/
│   ├── task/
│   ├── ui_bridge/
│   ├── user_data/
│   └── voice/
├── hooks/
│   ├── useJourneyCamera.ts
│   └── useScrollToCurrent.ts
├── index.css
├── main.tsx
├── professions/
│   ├── index.ts
│   ├── base_profession_module.ts
│   ├── profession_auto_loader.ts
│   ├── profession_registry.ts
│   ├── profession_service.ts
│   └── loader/
│       ├── profession_loader.ts
│       └── profession_manifest.ts
│   └── software_engineer/
│       ├── index.ts
│       ├── module.ts
│       ├── profession.ts
│       ├── skill_nodes.ts
│       ├── chapters.ts
│       ├── styles.css
│       └── tasks/
│           ├── index.ts
│           ├── applications.ts
│           ├── interviews.ts
│           ├── linkedin.ts
│           ├── offer.ts
│           └── resume.ts
├── screens/
│   ├── DashboardScreen/
│   ├── GapAnalysisScreen/
│   ├── InterviewTrainer/
│   ├── IntroJourneyScreen/
│   ├── JourneyScreen/
│   ├── MissionScreen/
│   ├── NotesScreen/
│   ├── OnboardingScreen/
│   ├── PlaybookScreen/
│   └── ShareScreen/
├── styles/
│   ├── animations.css
│   ├── core.css
│   ├── layout.css
│   └── theme.css
├── voice/
│   └── tts.ts
└── world/
    ├── index.ts
    ├── EnvironmentGenerator.tsx
    ├── LevelRenderer.tsx
    ├── VerticalPath.tsx
    ├── WorldFlowConnector.ts
    ├── WorldState.ts
    ├── camera/
    ├── careerToWorld.ts
    ├── effects/
    ├── gap/
    ├── journey_node.ts
    ├── progressStore.ts
    ├── types.ts
    ├── useWorldProgression.ts
    ├── visual_world_contract.ts
    ├── visual_world_engine.ts
    ├── world_builder.ts
    ├── world_renderer.ts
    ├── world_scene.ts
    └── world_zone_mapper.ts
```

---

## SECTION 2 — App.tsx (full)

```tsx
import { useEffect, useState } from 'react';
import { loadRuntime } from './core/persistence/runtime_persistence';
import { initializeRuntime, startJourney } from './core/runtime/runtime_controller';
import { OnboardingScreen } from './screens/OnboardingScreen/OnboardingScreen';
import type { OnboardingState } from './screens/OnboardingScreen/OnboardingScreen';
import { IntroJourneyScreen } from './screens/IntroJourneyScreen/IntroJourneyScreen';
import { JourneyScreen } from './screens/JourneyScreen/JourneyScreen';
import { PlaybookScreen } from './screens/PlaybookScreen/PlaybookScreen';
import { NotesScreen } from './screens/NotesScreen/NotesScreen';
import { ShareScreen } from './screens/ShareScreen/ShareScreen';
import { AppShell } from './components/layout/AppShell';
import './styles/layout.css';
import './styles/theme.css';
import './styles/animations.css';

type Screen = 'journey' | 'playbook' | 'notes' | 'share';

const SCREEN_TITLES: Record<Screen, string> = {
  journey: 'Journey',
  playbook: 'Playbook',
  notes: 'My Journal',
  share: 'Share Progress',
};

function App() {
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
    if (tabId === 'journey' || tabId === 'playbook' || tabId === 'notes') {
      navigateTo(tabId);
    }
  };

  if (!isReady) return <div style={{ background: '#071320', minHeight: '100vh' }} />;

  if (showOnboarding) {
    return (
      <OnboardingScreen
        onComplete={(localState: OnboardingState) => {
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
          startJourney(coreState);
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
        return <div {...common}><JourneyScreen /></div>;
      case 'playbook':
        return <div {...common}><PlaybookScreen /></div>;
      case 'notes':
        return <div {...common}><NotesScreen /></div>;
      case 'share':
        return <div {...common}><ShareScreen /></div>;
    }
  };

  return (
    <AppShell
      title={SCREEN_TITLES[currentScreen]}
      activeTab={currentScreen}
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
```

---

## SECTION 3 — JourneyScreen.tsx (full)

```tsx
// File: src/screens/JourneyScreen/JourneyScreen.tsx
// Lines: 248
// Export: JourneyScreen (named function)

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getUIState, getNavigation } from '@/core/ui_bridge/ui_bridge';
import { setActiveNode, getActiveNode, getRuntimeState } from '@/core/runtime/runtime_controller';
import { subscribe } from '@/core/events/system_event_bus';
import { MissionScreen } from '@/screens/MissionScreen/MissionScreen';
import type { SkillNode } from '@/core/skill_state';
import type { TaskContent } from '@/core/task_content';
import { BackgroundLayer } from './components/BackgroundLayer';
import { JourneyHeader } from './components/JourneyHeader';
import { ChapterHub } from './components/ChapterHub';
import type { ChapterData } from './components/ChapterHub';
import { ChapterCompleteScreen } from './components/ChapterCompleteScreen';
import { JourneyCompleteScreen } from './components/JourneyCompleteScreen';
import { FloatingMissionCard } from './components/FloatingMissionCard';
import { JourneyBottomNav } from './components/JourneyBottomNav';
import { useCamera } from './hooks/useCamera';
import { useChapterHub } from './hooks/useChapterHub';
import './JourneyScreen.css';

// Full component body: 248 lines
// State: missionTask, completedTaskIds, lockedToast, missionCardOpen
// Hooks: useChapterHub → view, selectedChapter, selectChapter, dismissComplete
//        useCamera → cameraStyle, zoomOut
// Subscribes to: NODE_CHANGED, STATE_UPDATED, CHAPTER_CHANGED, SCORE_UPDATED, UI_REFRESH, TASK_COMPLETED
// Renders conditionally:
//   1. MissionScreen (if missionTask && node)
//   2. "No active node" (if !node)
//   3. JourneyCompleteScreen (if allNodesCompleted)
//   4. Main layout: BackgroundLayer + JourneyHeader + ChapterHub + (optional) ChapterCompleteScreen + FloatingMissionCard + JourneyBottomNav
```

See full content in `src/screens/JourneyScreen/JourneyScreen.tsx`.

---

## SECTION 4 — AppShell.tsx (full)

```tsx
import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { BottomNavigation } from './BottomNavigation';

interface AppShellProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  rightAction?: ReactNode;
}

export function AppShell({
  children,
  title,
  showBack,
  onBack,
  activeTab,
  onTabChange,
  rightAction,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <TopBar title={title} showBack={showBack} onBack={onBack} rightAction={rightAction} />
      <main className="app-shell-content">{children}</main>
      {onTabChange && activeTab && (
        <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
      )}
    </div>
  );
}
```

---

## SECTION 5 — Runtime

All files in `src/core/runtime/` (13 files), with exports, public functions, interfaces, and types. No implementation code shown.

### `runtime_controller.ts`
- **Exports**: `startJourney`, `getRuntimeState`, `getActiveTask`, `getActiveNode`, `getActiveTaskDefinition`, `setActiveNode`, `loadTaskForNode`, `createTaskFromDefinition`, `createTask`, `submitTask`, `abortActiveTask`, `advanceNode`, `advanceChapter`, `resetRuntime`, `initializeRuntime`
- **Interfaces**: none (uses JourneyRuntimeState, Task, TaskResult, TaskDefinition from other modules)
- **Types**: none
- **State**: `runtimeState: JourneyRuntimeState | null`, `activeTask: Task | null`, `activeTaskDefinition: TaskDefinition | null`

### `journey_runtime.ts`
- **Exports**: `createEmptyRuntime`, `buildNodeMap`, `initializeJourneyRuntime`
- **Interfaces**: none
- **Types**: `JourneyRuntimeState` (professionId, activeNodeId, onboardingSnapshot, createdAt, chapterProgress, activeChapterId, readinessScore, confidenceScore, nodeStates)

### `runtime_store.ts`
- **Exports**: `getState`, `setState`, `updateState`, `resetState`, `replaceState`
- **Interfaces**: none
- **Types**: none (operates on UnifiedRuntimeState)
- **State**: `state: UnifiedRuntimeState`

### `runtime_engine.ts`
- **Exports**: `processRuntimeEvent`, `dispatchEvent`, `getCurrentState`
- **Interfaces**: none
- **Types**: `RuntimeEvent` (union of event types: TASK_COMPLETED, TASK_FAILED, CHAPTER_ADVANCED, SKILL_UPDATED, READINESS_UPDATED, PROFESSION_UNLOCKED, PROFESSION_CHANGED, NODE_SELECTED, MEMORY_ADDED, CAREER_STATE_CHANGED, CAREER_SCORE_UPDATED, READINESS_VECTOR_UPDATED, TASK_CYCLE_RECORDED, CONFIDENCE_UPDATED)

### `runtime_reducer.ts`
- **Exports**: `reduce`
- **Interfaces**: none
- **Types**: none (takes UnifiedRuntimeState + RuntimeEvent → UnifiedRuntimeState)

### `runtime_selector.ts`
- **Exports**: `getCurrentNode`, `getNextNode`, `getProgressSnapshot`, `getUnlockedNodes`, `getActiveChapter`, `getCompletedChapters`
- **Interfaces**: none
- **Types**: none

### `runtime_selector_final.ts`
- **Exports**: `getCurrentView`, `getProgressState`, `getActiveNode`, `getNextNode`, `getUnlockedContent`, `getCompletedContent`
- **Interfaces**: `CurrentView`, `ProgressState`
- **Types**: none

### `runtime_sync.ts`
- **Exports**: `syncRuntimeWithEngine`
- **Interfaces**: none
- **Types**: `SyncResult`

### `runtime_resolver.ts`
- **Exports**: `resolveCurrentContext`
- **Interfaces**: none
- **Types**: `ResolvedContext`

### `runtime_initializer.ts`
- **Exports**: `validateRuntimeConsistency`, `bootstrapRuntime`
- **Interfaces**: none
- **Types**: none

### `runtime_events.ts`
- **Exports**: `subscribeToEvent`, `emitEvent`, `clearAllListeners`
- **Interfaces**: none
- **Types**: `RuntimeEventType`, `RuntimeEvent`, `RuntimeEventPayloads`

### `unified_runtime_state.ts`
- **Exports**: `createEmptyUnifiedState`
- **Interfaces**: none
- **Types**: `ChapterState`, `UnifiedRuntimeState`

### `index.ts`
- **Re-exports**: all public APIs from the runtime module

---

## SECTION 6 — Navigation

### Existing screens
| Screen | File | Notes |
|---|---|---|
| OnboardingScreen | `src/screens/OnboardingScreen/` | Shown before journey starts |
| IntroJourneyScreen | `src/screens/IntroJourneyScreen/` | Cinematic intro after onboarding |
| JourneyScreen | `src/screens/JourneyScreen/` | Main journey view |
| PlaybookScreen | `src/screens/PlaybookScreen/` | Knowledge base |
| NotesScreen | `src/screens/NotesScreen/` | My Journal |
| ShareScreen | `src/screens/ShareScreen/` | Share progress card |
| DashboardScreen | `src/screens/DashboardScreen/` | Legacy, no tab in current nav |
| GapAnalysisScreen | `src/screens/GapAnalysisScreen/` | Legacy, no tab in current nav |
| InterviewTrainer | `src/screens/InterviewTrainer/` | Legacy, no tab in current nav |
| MissionScreen | `src/screens/MissionScreen/` | Rendered inside JourneyScreen |

### Navigation flow

```
App start
  ├─ Saved runtime found → initializeRuntime() → IntroJourneyScreen → JourneyScreen
  └─ No saved runtime  → OnboardingScreen → IntroJourneyScreen → JourneyScreen

Inside AppShell (post-onboarding):
  Bottom nav tabs: Journey | Playbook | Notes
  Tab change → fade+slide transition (250ms)
  No hash routing — all state-managed via React useState
```

### Transition mechanism
- `navigateTo()` in App.tsx: sets `prevScreen` + `currentScreen`, renders both with absolute positioning
- CSS transition: `opacity 250ms ease, transform 250ms ease`
- No React Router — manual screen switching

---

## SECTION 7 — Event Bus

### Definition
**File**: `src/core/events/system_event_bus.ts`

### Event types (26 total)
`SYSTEM_BOOTED`, `PROFESSION_LOADED`, `STATE_UPDATED`, `NODE_CHANGED`, `CHAPTER_CHANGED`, `WORLD_UPDATED`, `UI_REFRESH`, `TASK_COMPLETED`, `TASK_FAILED`, `STATE_CHANGED`, `SCORE_UPDATED`, `CONFIDENCE_CHANGED`, `CHAPTER_UNLOCKED`, `GAP_UPDATED`, `LEARNING_FEEDBACK`, `ATTEMPT_STARTED`, `ATTEMPT_COMPLETED`, `SKILL_PROGRESS`, `TASK_STARTED`, `TASK_ABORTED`, `READINESS_CHANGED`, `JOURNEY_COMPLETED`, `NOTE_CREATED`, `NOTE_UPDATED`, `NOTE_DELETED`

### Who emits
- **runtime_controller.ts**: `SYSTEM_BOOTED`, `NODE_CHANGED`, `UI_REFRESH`, `TASK_STARTED`, `CONFIDENCE_CHANGED`, `READINESS_CHANGED`, `CHAPTER_CHANGED`, `CHAPTER_UNLOCKED`, `JOURNEY_COMPLETED`, `TASK_ABORTED`
- **system_bootstrap.ts**: `SYSTEM_BOOTED`, `PROFESSION_LOADED`, `STATE_CHANGED`, `UI_REFRESH`
- **progression_loop.ts**: `TASK_COMPLETED`, `SKILL_PROGRESS`, `CHAPTER_CHANGED`, `READINESS_CHANGED`
- **notes_controller.ts**: `NOTE_CREATED`, `NOTE_UPDATED`, `NOTE_DELETED`
- **event_bus.ts** (interaction): Separate bus with `InteractionEventType`

### Who subscribes
- **JourneyScreen**: `NODE_CHANGED`, `STATE_UPDATED`, `CHAPTER_CHANGED`, `SCORE_UPDATED`, `UI_REFRESH`, `TASK_COMPLETED`
- (Other subscribers via `subscribe()` — no additional files found via `subscribe(` pattern)

---

## SECTION 8 — Persistence

### Files using localStorage
Only one file: `src/core/persistence/storage.ts`

### How it works
- `storage.ts`: Generic key-value store with versioned JSON snapshots
  - `load<T>({key, version})` → reads and parses `localStorage`
  - `save<T>({key, version}, data)` → writes versioned JSON to `localStorage`
  - `remove(key)` → removes key from `localStorage`
  - `exists(key)` → checks key existence in `localStorage`
- `runtime_persistence.ts`: Uses storage.ts with key `career-navigator.runtime.v1`, version 1
  - `loadRuntime()` → validates data shape (checks professionId, activeNodeId, confidenceScore, readinessScore, nodeStates, chapterProgress)
  - `saveRuntime(runtime)`, `clearRuntime()`, `hasRuntime()`

### Data persisted
- `JourneyRuntimeState` (professionId, activeNodeId, onboardingSnapshot, createdAt, chapterProgress, activeChapterId, readinessScore, confidenceScore, nodeStates)

---

## SECTION 9 — Onboarding

### Screens (7 pages)
| Page | Name | Selection type | Options |
|---|---|---|---|
| 0 | Welcome | — | Illustration, "Career Navigator", "Begin Journey" button |
| 1 | Choose your profession | Single | Software Engineer (Available), Data Scientist (Coming Soon), Product Manager (Coming Soon) |
| 2 | Experience | Single | Junior, Middle, Senior (selected scales 1.03) |
| 3 | Your Mission | Multi | Get my first job, Career switch, Interview prep, Skill growth |
| 4 | Timeline | Single | 1 Month, 3 Months, 6 Months, 1 Year |
| 5 | Preferences | Multi | Remote, Hybrid, On-site, US, EU |
| 6 | Review | — | Grid with icons, "Start Journey" |

### Functions (from `OnboardingScreen.tsx`)
- `goNext()` — advance to next screen
- `goBack()` — go to previous screen
- `updateState(key, value)` — updates a single field
- `toggleGoal(goalId)` — toggles a goal in the array
- `togglePreference(prefId)` — toggles a preference in the array
- `handleComplete()` — calls `onComplete(state)` prop

### Integration
- Component: `export const OnboardingScreen: React.FC<OnboardingScreenProps>`
- Props: `{ onComplete: (state: OnboardingState) => void }`
- App.tsx maps local `OnboardingState` → core `OnboardingState` and calls `startJourney()`

---

## SECTION 10 — Journey — child components

Components used by `JourneyScreen` (from `src/screens/JourneyScreen/components/`):

| Component | File | Purpose |
|---|---|---|
| BackgroundLayer | `BackgroundLayer.tsx` | Animated background |
| JourneyHeader | `JourneyHeader.tsx` | Chapter title + readiness score |
| ChapterHub | `ChapterHub.tsx` | 5 islands (chapters) with nodes |
| ChapterCompleteScreen | `ChapterCompleteScreen.tsx` | "Chapter complete" overlay |
| JourneyCompleteScreen | `JourneyCompleteScreen.tsx` | "All chapters complete" overlay |
| FloatingMissionCard | `FloatingMissionCard.tsx` | "Start mission" card |
| JourneyBottomNav | `JourneyBottomNav.tsx` | Bottom navigation inside journey |
| CollapsibleSidebar | `CollapsibleSidebar.tsx` | (not imported in main render) |
| HelpBar | `HelpBar.tsx` | (not imported in main render) |
| HeroCard | `HeroCard.tsx` | (not imported in main render) |
| JourneyPath | `JourneyPath.tsx` | (replaced by ChapterHub in current main render) |
| MissionCard | `MissionCard.tsx` | (not imported — legacy) |
| MissionFlow | `MissionFlow.tsx` | (not imported — legacy) |
| MissionReview | `MissionReview.tsx` | (not imported — legacy) |
| PathNode | `PathNode.tsx` | (replaced by SkillNodeCard in ChapterHub) |
| ResultCard | `ResultCard.tsx` | (not imported — legacy) |
| SkillNodeCard | `SkillNodeCard.tsx` | Used inside ChapterHub |

### Hooks used
- `useCamera` (`src/screens/JourneyScreen/hooks/useCamera.ts`)
- `useChapterHub` (`src/screens/JourneyScreen/hooks/useChapterHub.ts`)

### External screen rendered inside
- `MissionScreen` (`src/screens/MissionScreen/`) — replaces JourneyScreen when a mission is active

---

## SECTION 11 — World components

### Actual file locations
| Component | Path | Exists |
|---|---|---|
| LevelRenderer | `src/world/LevelRenderer.tsx` | Yes |
| EnvironmentGenerator | `src/world/EnvironmentGenerator.tsx` | Yes |
| VerticalPath | `src/world/VerticalPath.tsx` | Yes |
| JourneyPath | `src/components/JourneyPath/JourneyPath.tsx` | Yes (different from VerticalPath) |
| JourneyVisualLayer | `src/components/JourneyVisualLayer/JourneyVisualLayer.tsx` | Yes |

### Which are actually connected
- **LevelRenderer** (`src/world/`): Exists but NOT imported in JourneyScreen or App
- **EnvironmentGenerator** (`src/world/`): Exists but NOT imported in JourneyScreen or App
- **VerticalPath** (`src/world/`): Exists but NOT imported in JourneyScreen or App
- **JourneyPath** (`src/components/JourneyPath/`): Exists in component tree but NOT currently imported in JourneyScreen (replaced by ChapterHub)
- **JourneyVisualLayer** (`src/components/JourneyVisualLayer/`): Exists but NOT imported in JourneyScreen

Current JourneyScreen uses `ChapterHub` from its own `components/` directory as the main world content.

---

## SECTION 12 — UI Components

All components in `src/components/`:

| Component | Files |
|---|---|
| AppShell | `layout/AppShell.tsx` |
| BottomNavigation | `layout/BottomNavigation.tsx`, `.css` |
| GlassCard | `layout/GlassCard.tsx`, `.css` |
| IconButton | `layout/IconButton.tsx`, `.css` |
| PrimaryButton | `layout/PrimaryButton.tsx`, `.css` |
| ProgressRing | `layout/ProgressRing.tsx`, `.css` |
| TopBar | `layout/TopBar.tsx`, `.css` |
| BottomNav | `BottomNav/BottomNav.tsx` |
| FloatingOrb | `FloatingOrb/FloatingOrb.tsx`, `.css`, `index.ts` |
| GoalCard | `GoalCard/GoalCard.tsx`, `.css`, `index.ts` |
| JourneyBottomNav | `JourneyBottomNav/JourneyBottomNav.tsx`, `.css` |
| JourneyFocusPanel | `JourneyFocusPanel/JourneyFocusPanel.tsx`, `.css` |
| JourneyHeader | `JourneyHeader/JourneyHeader.tsx`, `.css` |
| JourneyNodeView | `JourneyNodeView/JourneyNodeView.tsx`, `.css` |
| JourneyPath | `JourneyPath/JourneyPath.tsx`, `.css`, `theme.ts` |
| JourneyTimeline | `JourneyTimeline/JourneyTimeline.tsx`, `.css` |
| JourneyVisualLayer | `JourneyVisualLayer/JourneyVisualLayer.tsx`, `.css` |
| PathNode | `PathNode/PathNode.tsx`, `.css`, `index.ts` |
| ShareCard | `ShareCard/ShareCard.tsx`, `.css` |

---

## SECTION 13 — TODO / FIXME

No `TODO` or `FIXME` comments found in any `.ts`, `.tsx`, or `.css` file in the project.
