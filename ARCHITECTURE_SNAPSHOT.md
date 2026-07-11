# Architecture Snapshot

> Generated: 2026-07-11
>
> No analysis, no recommendations. Only facts.

---

## SECTION 1 — Project tree (depth 3)

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
│   ├── ErrorBoundary/
│   │   └── ErrorBoundary.tsx
│   ├── FloatingOrb/
│   │   ├── FloatingOrb.css
│   │   ├── FloatingOrb.tsx
│   │   └── index.ts
│   ├── GoalCard/
│   │   ├── GoalCard.css
│   │   ├── GoalCard.tsx
│   │   └── index.ts
│   ├── Icon/
│   │   └── Icon.tsx
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
│   ├── advice_engine.ts
│   ├── bootstrap/
│   ├── bridge/
│   ├── chapter_engine.ts
│   ├── chapter_model.ts
│   ├── chapters.ts
│   ├── confidence_engine.ts
│   ├── depth_mapper.ts
│   ├── events/
│   ├── export/
│   ├── flow_mapper.ts
│   ├── focus_gravity.ts
│   ├── focus_snap_controller.ts
│   ├── gap_engine.ts
│   ├── index.ts
│   ├── interaction/
│   ├── interview/
│   ├── journey_adapter.ts
│   ├── journey_orchestrator.ts
│   ├── learning/
│   ├── notifications/
│   ├── onboarding/
│   ├── orchestrator.ts
│   ├── persistence/
│   ├── playbook/
│   ├── premium/
│   ├── profession_bootstrap.ts
│   ├── profession_contract.ts
│   ├── profession_loader.ts
│   ├── profession_metadata.ts
│   ├── profession_validation.ts
│   ├── readiness_engine.ts
│   ├── rules.ts
│   ├── runtime/
│   ├── scoring/
│   ├── share/
│   ├── skill_engine.ts
│   ├── skill_state.ts
│   ├── social/
│   ├── state_engine/
│   ├── task/
│   ├── task_content.ts
│   ├── ui_bridge/
│   ├── user_data/
│   ├── visual_flow.ts
│   ├── visual_node_renderer.ts
│   ├── voice/
│   └── world/
├── hooks/
│   ├── useJourneyCamera.ts
│   └── useScrollToCurrent.ts
├── index.css
├── main.tsx
├── professions/
│   ├── base_profession_module.ts
│   ├── index.ts
│   ├── loader/
│   ├── profession_auto_loader.ts
│   ├── profession_registry.ts
│   ├── profession_service.ts
│   └── software_engineer/
├── screens/
│   ├── DashboardScreen/
│   ├── GapAnalysisScreen/
│   ├── InterviewTrainer/
│   ├── InterviewTrainerScreen/
│   ├── IntroJourneyScreen/
│   ├── JourneyScreen/
│   ├── MissionScreen/
│   ├── NotesScreen/
│   ├── OnboardingScreen/
│   ├── PlaybookScreen/
│   ├── PrivacyPolicyScreen/
│   ├── ProfileScreen/
│   ├── SettingsScreen/
│   ├── ShareScreen/
│   └── WorldMapScreen/
├── styles/
│   ├── animations.css
│   ├── core.css
│   ├── layout.css
│   └── theme.css
├── voice/
│   └── tts.ts
└── world/
    ├── camera/
    ├── careerToWorld.ts
    ├── effects/
    ├── EnvironmentGenerator.tsx
    ├── gap/
    ├── index.ts
    ├── journey_node.ts
    ├── LevelRenderer.tsx
    ├── types.ts
    ├── useWorldProgression.ts
    ├── visual_world_contract.ts
    ├── visual_world_engine.ts
    ├── world_builder.ts
    ├── world_renderer.tsx
    ├── world_scene.ts
    ├── world_zone_mapper.ts
    ├── WorldFlowConnector.ts
    └── WorldState.ts
```

---

## SECTION 2 — Screens

| Screen | File | Notes |
|---|---|---|
| OnboardingScreen | `src/screens/OnboardingScreen/` | 3 pages: Welcome → Profession → Fear+Privacy |
| IntroJourneyScreen | `src/screens/IntroJourneyScreen/` | Cinematic intro after onboarding |
| JourneyScreen (JourneyHUD) | `src/screens/JourneyScreen/` | Main journey view with ChapterHub |
| MissionScreen | `src/screens/MissionScreen/` | Rendered inside JourneyScreen |
| PlaybookScreen | `src/screens/PlaybookScreen/` | Knowledge base |
| NotesScreen | `src/screens/NotesScreen/` | My Journal |
| ShareScreen | `src/screens/ShareScreen/` | Share progress card (inside Profile) |
| ProfileScreen | `src/screens/ProfileScreen/` | Traveler passport + metrics |
| WorldMapScreen | `src/screens/WorldMapScreen/` | Future illustrated map (empty stub) |
| SettingsScreen | `src/screens/SettingsScreen/` | Settings overlay |
| InterviewTrainerScreen | `src/screens/InterviewTrainerScreen/` | 3 phases: Prepare → Record → Review |
| InterviewResultsScreen | `src/screens/InterviewTrainerScreen/` | Session results with scores |
| PrivacyPolicyScreen | `src/screens/PrivacyPolicyScreen/` | Privacy policy modal |
| DashboardScreen | `src/screens/DashboardScreen/` | Legacy, no tab |
| GapAnalysisScreen | `src/screens/GapAnalysisScreen/` | Legacy, no tab |

---

## SECTION 3 — Core modules

| Module | Path | Purpose |
|---|---|---|
| runtime | `src/core/runtime/` | JourneyRuntimeState, controller, store, selectors |
| events | `src/core/events/` | system_event_bus (26+ event types) |
| interaction | `src/core/interaction/` | Task cycle, progression, rewards, feedback |
| learning | `src/core/learning/` | Learning engine, difficulty adapter, reinforcement |
| voice | `src/core/voice/` | TTS/STT engines, interview loop, answer analysis |
| interview | `src/core/interview/` | Interview persistence, questions, results, store |
| onboarding | `src/core/onboarding/` | OnboardingState, flow, engine |
| persistence | `src/core/persistence/` | localStorage storage, runtime persistence |
| ui_bridge | `src/core/ui_bridge/` | Runtime → UI state mapping |
| playbook | `src/core/playbook/` | Static content: resume, interview, salary |
| task | `src/core/task/` | Task content engine, execution engine |
| bootstrap | `src/core/bootstrap/` | System init, context, entry points |
| bridge | `src/core/bridge/` | UI/runtime bridge, world/runtime bridge |
| user_data | `src/core/user_data/` | Notes CRUD, persistence, store |
| notifications | `src/core/notifications/` | Notification service |
| scoring | `src/core/scoring/` | Career score calculation |
| premium | `src/core/premium/` | Premium access, gates, limits |
| social | `src/core/social/` | Export, import, share card, viral metrics |
| share | `src/core/share/` | Share mapper, model, service |
| state_engine | `src/core/state_engine/` | Career state transitions |
| world | `src/core/world/` | World layout, theme, art contract |

---

## SECTION 4 — Navigation

### Bottom nav tabs (5)
| Tab | ID | Icon | Screen |
|---|---|---|---|
| Journey | journey | map | JourneyHUD (WorldRenderer + ChapterHub) |
| Playbook | playbook | book | PlaybookScreen |
| Notes | notes | resume | NotesScreen |
| World | world | map | WorldMapScreen (empty stub) |
| Profile | profile | person | ProfileScreen |

### Flow
```
App start
  ├─ Saved runtime → initializeRuntime() → JourneyScreen
  └─ No saved runtime → OnboardingScreen → IntroJourneyScreen → JourneyScreen

Interview Trainer:
  Journey → START_INTERVIEW_TRAINER → InterviewTrainerScreen → INTERVIEW_SESSION_COMPLETE → Journey
```

---

## SECTION 5 — Event Bus

**File**: `src/core/events/system_event_bus.ts`

### Event types (26+)
`SYSTEM_BOOTED`, `PROFESSION_LOADED`, `STATE_UPDATED`, `NODE_CHANGED`, `CHAPTER_CHANGED`, `WORLD_UPDATED`, `UI_REFRESH`, `TASK_COMPLETED`, `TASK_FAILED`, `STATE_CHANGED`, `SCORE_UPDATED`, `CONFIDENCE_CHANGED`, `CHAPTER_UNLOCKED`, `GAP_UPDATED`, `LEARNING_FEEDBACK`, `ATTEMPT_STARTED`, `ATTEMPT_COMPLETED`, `SKILL_PROGRESS`, `TASK_STARTED`, `TASK_ABORTED`, `READINESS_CHANGED`, `JOURNEY_COMPLETED`, `NOTE_CREATED`, `NOTE_UPDATED`, `NOTE_DELETED`, `MISSION_SUBMIT`, `START_INTERVIEW_TRAINER`, `INTERVIEW_SESSION_COMPLETE`, `CLOSE_INTERVIEW_TRAINER`, `OPEN_PLAYBOOK`

---

## SECTION 6 — Onboarding

### Current: 3 pages
| Page | Name | Selection type |
|---|---|---|
| 0 | Welcome | — |
| 1 | Choose your profession | Single |
| 2 | Biggest Challenge + Privacy | Multi (fears) + checkbox |

### OnboardingState
```typescript
interface OnboardingState {
  profession: string;
  biggestFear: string[];
  privacyAgreed: boolean;
}
```
