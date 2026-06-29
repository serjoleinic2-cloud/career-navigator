# ARCHITECTURE_SNAPSHOT — Career Navigator v0.6 (Event-Driven)

## 1. DATA LAYER
skill_engine — единственный источник правды
- getCareerState(), getActiveNodeId(), getActiveTask(), getRuntimeState()
- applyMissionResult() — только через event

## 2. EVENT SYSTEM
- MISSION_SUBMIT (UI → skill_engine)
- MISSION_RESULT (skill_engine → UI)
- Guards: isProcessingMission предотвращает double submit

## 3. TASK PIPELINE
MissionScreen → emit('MISSION_SUBMIT') → skill_engine → submitTask() → emit('MISSION_RESULT') → MissionScreen → setTaskView('completed')

## 4. SCREENS
- WorldRendererScreen — default entry
- MissionScreen — inline task execution
- OnboardingScreen — 7 steps
- IntroJourneyScreen — 8-12s cinematic
- JourneyScreen — deprecated, debug only

## 5. ARCHITECTURE
skill_engine (CORE) → events → UI (VIEW)
No direct calls from UI to core
No cached local state in UI
No optimistic completion

## 6. TECH STACK
React 18 + TypeScript + Vite + Tailwind + CSS modules
Offline-first, no external UI libs