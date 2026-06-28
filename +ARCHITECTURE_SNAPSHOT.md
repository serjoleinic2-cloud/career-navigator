# ARCHITECTURE_SNAPSHOT — Career Navigator v0.6

## 1. DATA LAYER (Source of Truth)

### 1.1 JourneyRuntimeState — ЖИВОЙ стейт
type JourneyRuntimeState = {
  professionId: string;
  activeNodeId: string;
  onboardingSnapshot: OnboardingState;
  createdAt: number;
  chapterProgress: Record&lt;string, number&gt;;
  activeChapterId: string;
  readinessScore: number;
  confidenceScore: number;
  nodeStates: Record&lt;string, SkillNode&gt;;
};
- Создаётся: initializeJourneyRuntime(onboardingState)
- Пишется: submitTask() → applyTaskResultToRuntime()
- Читается: getUIState() → mapRuntimeToUI()
- Сохраняется: saveRuntime() → localStorage

### 1.2 UnifiedRuntimeState — МЁРТВЫЙ стейт (legacy)
- Создаётся: initCareerNavigator() при bootstrap
- НЕ обновляется после bootstrap
- ⚠️ МЁРТВЫЙ КОД. Удалить после миграции.

## 2. EVENT SYSTEM
23 типа событий: SYSTEM_BOOTED, UI_REFRESH, TASK_COMPLETED, CHAPTER_CHANGED, etc.
Паттерн: subscribe(type, callback) / emit(type, payload)
Синхронный, без очереди.

## 3. TASK PIPELINE
beginTask() → submitTask() → validateTask() → completeTask() → runTaskPipeline()
→ applyTaskResultToRuntime() → emit(UI_REFRESH + CONFIDENCE_CHANGED + READINESS_CHANGED)

Validation: CHECKBOX_TASK, TEXT_TASK, SELF_ASSESSMENT, MULTIPLE_CHOICE — все auto-pass

## 4. UI DATA FLOW
JourneyRuntimeState.nodeStates → ui_state_mapper.ts → ui_node_adapter.ts → UI_State → JourneyScreen.tsx

## 5. STATE MAPPING
SkillState → UI_NodeState:
  confidence, execution → completed
  readiness, application → active
  understanding, awareness, locked → locked

## 6. NAVIGATION
getNavigationState() по profession.skillGraph (статичный)
⚠️ Должен быть по runtimeState.nodeStates

## 7. PROFESSION MODULE
5 глав + Offer Preparation (6 chapters, 23 tasks)
Software Engineer — единственная профессия

## 8. PERSISTENCE
localStorage: career-navigator-runtime, career-navigator-notes, career-navigator-onboarding, career-navigator-voice-sessions

## 9. SCREEN ARCHITECTURE
JourneyScreen (21722 bytes) — главный
NotesScreen, OnboardingScreen, InterviewTrainerScreen, DashboardScreen — полные

## 10. WORLD LAYER
world_builder, world_renderer, world_scene, visual_world_engine, world_zone_mapper
Zone mapping: exploring→plains, learning→forest, practicing→mountains, interviewing→city, negotiating→castle

## 11. KNOWN ISSUES
Critical:
1. Путь сверху вниз (должен снизу вверх)
2. Прогресс статичен (должен у активной платформы)
3. Нет свайп-скролла
4. UnifiedRuntimeState мёртв

High:
5. Навигация по skillGraph (статичный)
6. Нет анимации прыжка персонажа

## 12. TECH STACK
React 18 + TypeScript + Vite
State: In-memory + localStorage
Events: Custom pub/sub
Styling: CSS modules
Offline-first