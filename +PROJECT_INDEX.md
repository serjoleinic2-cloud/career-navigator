# PROJECT_INDEX — Career Navigator

## A. CORE ENGINE (src/core/)
### A.1 State Management
runtime_controller.ts, journey_runtime.ts, unified_runtime_state.ts (dead), runtime_store.ts (dead), skill_state.ts, career_state.ts, state_transition_rules.ts

### A.2 Task System
task_execution_engine.ts, task_content_engine.ts (23 tasks, 6 chapters), task_validator.ts, task_content.ts (dead)

### A.3 UI Bridge
ui_bridge.ts, ui_state_mapper.ts (FIXED), ui_node_adapter.ts, ui_navigation.ts, ui_render_contract.ts

### A.4 Events
system_event_bus.ts

### A.5 Scoring & Analytics
career_score.ts, readiness_engine.ts, confidence_engine.ts, gap_engine.ts

### A.6 Learning Loop
learning_loop_model.ts, loop_execution_engine.ts, difficulty_adapter.ts, reinforcement_engine.ts, learning_pipeline.ts

### A.7 Voice / Interview
voice_session_model.ts, tts_engine.ts, stt_engine.ts, interview_state_machine.ts, answer_analysis_engine.ts, feedback_generator.ts, confidence_impact_engine.ts, stress_simulation.ts, interview_loop.ts

### A.8 Visual & Flow
journey_adapter.ts, visual_node_renderer.ts, visual_flow.ts, flow_mapper.ts, depth_mapper.ts, focus_gravity.ts, focus_snap_controller.ts

### A.9 Profession System
profession_contract.ts, profession_loader.ts, profession_metadata.ts, profession_validation.ts, profession_bootstrap.ts, bootstrap/init.ts (legacy)

### A.10 Other Core
chapter_engine.ts, chapter_model.ts, orchestrator.ts, rules.ts, index.ts

## B. SCREENS (src/screens/)
JourneyScreen.tsx (21722 bytes), NotesScreen.tsx, OnboardingScreen.tsx, InterviewTrainerScreen.tsx, DashboardScreen.tsx, PlaybookScreen.tsx, ShareScreen.tsx

## C. COMPONENTS (src/components/)
JourneyPath.tsx, JourneyNodeView.tsx, JourneyVisualLayer.tsx, FloatingOrb.tsx, GoalCard.tsx, ShareCard.tsx, BottomNav.tsx, JourneyBottomNav.tsx, JourneyFocusPanel.tsx

## D. WORLD (src/world/)
world_builder.ts, world_renderer.ts, world_scene.ts, visual_world_engine.ts, visual_world_contract.ts, world_zone_mapper.ts, VerticalPath.tsx, EnvironmentGenerator.ts, LevelRenderer.ts, WorldFlowConnector.ts, WorldState.ts, progressStore.ts, useWorldProgression.ts, journey_node.ts, careerToWorld.ts, camera/, effects/, gap/

## E. HOOKS (src/hooks/)
useJourneyCamera.ts (2676 bytes), useScrollToCurrent.ts (77 bytes, stub)

## F. STYLES (src/styles/)
core.css

## G. PROFESSIONS (src/professions/)
software_engineer/module.ts, skill_graph.ts, chapters.ts, tasks.ts

## H. PERSISTENCE (src/core/persistence/)
runtime_persistence.ts, notes_persistence.ts

## I. USER DATA (src/core/user_data/)
notes/notes_controller.ts

## J. PLAYBOOK (src/core/playbook/)
playbook_data.ts

Total: 80+ modules, 75+ active, 5 dead/legacy