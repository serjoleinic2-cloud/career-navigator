# SkillTrue — Structure

```
/
├── .gitignore
├── capacitor.config.ts
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
│
├── structura.md
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── App.css
    ├── index.css
    │
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    │
    ├── styles/
    │   ├── animations.css
    │   ├── core.css
    │   ├── layout.css
    │   └── theme.css
    │
    ├── components/
    │   ├── layout/
    │   │   ├── AppShell.tsx
    │   │   ├── BottomNavigation.tsx
    │   │   ├── BottomNavigation.css
    │   │   ├── GlassCard.tsx
    │   │   ├── GlassCard.css
    │   │   ├── IconButton.tsx
    │   │   ├── IconButton.css
    │   │   ├── PrimaryButton.tsx
    │   │   ├── PrimaryButton.css
    │   │   ├── ProgressRing.tsx
    │   │   ├── ProgressRing.css
    │   │   ├── TopBar.tsx
    │   │   └── TopBar.css
    │   │
    │   ├── BottomNav/
    │   │   └── BottomNav.tsx
    │   ├── ErrorBoundary/
    │   │   └── ErrorBoundary.tsx
    │   ├── FloatingOrb/
    │   │   ├── FloatingOrb.tsx
    │   │   ├── FloatingOrb.css
    │   │   └── index.ts
    │   ├── GoalCard/
    │   │   ├── GoalCard.tsx
    │   │   ├── GoalCard.css
    │   │   └── index.ts
    │   ├── Icon/
    │   │   └── Icon.tsx
    │   ├── JourneyBottomNav/
    │   │   ├── JourneyBottomNav.tsx
    │   │   └── JourneyBottomNav.css
    │   ├── JourneyFocusPanel/
    │   │   ├── JourneyFocusPanel.tsx
    │   │   └── JourneyFocusPanel.css
    │   ├── JourneyHeader/
    │   │   ├── JourneyHeader.tsx
    │   │   └── JourneyHeader.css
    │   ├── JourneyNodeView/
    │   │   ├── JourneyNodeView.tsx
    │   │   └── JourneyNodeView.css
    │   ├── JourneyPath/
    │   │   ├── JourneyPath.tsx
    │   │   ├── JourneyPath.css
    │   │   └── theme.ts
    │   ├── JourneyTimeline/
    │   │   ├── JourneyTimeline.tsx
    │   │   └── JourneyTimeline.css
    │   ├── JourneyVisualLayer/
    │   │   ├── JourneyVisualLayer.tsx
    │   │   └── JourneyVisualLayer.css
    │   ├── PathNode/
    │   │   ├── PathNode.tsx
    │   │   ├── PathNode.css
    │   │   └── index.ts
    │   └── ShareCard/
    │       ├── ShareCard.tsx
    │       └── ShareCard.css
    │
    ├── core/
    │   ├── index.ts
    │   │
    │   ├── runtime/
    │   │   ├── journey_runtime.ts
    │   │   ├── runtime_controller.ts
    │   │   ├── runtime_selector_final.ts
    │   │   ├── runtime_store.ts
    │   │   └── unified_runtime_state.ts
    │   │
    │   ├── events/
    │   │   └── system_event_bus.ts
    │   │
    │   ├── interaction/
    │   │   ├── interaction_engine.ts
    │   │   ├── interaction_types.ts
    │   │   ├── progression_loop.ts
    │   │   ├── state_transition_engine.ts
    │   │   ├── reward_system.ts
    │   │   ├── feedback_engine.ts
    │   │   ├── task_cycle.ts
    │   │   └── event_bus.ts
    │   │
    │   ├── learning/
    │   │   ├── learning_engine.ts
    │   │   ├── learning_pipeline.ts
    │   │   ├── loop_execution_engine.ts
    │   │   ├── loop_gap_connector.ts
    │   │   ├── reinforcement_engine.ts
    │   │   ├── difficulty_adapter.ts
    │   │   └── learning_loop_model.ts
    │   │
    │   ├── voice/
    │   │   ├── stt_engine.ts
    │   │   ├── tts_engine.ts
    │   │   ├── native_tts.ts
    │   │   ├── answer_analysis_engine.ts
    │   │   ├── confidence_impact_engine.ts
    │   │   ├── feedback_generator.ts
    │   │   ├── interview_loop.ts
    │   │   ├── interview_state_machine.ts
    │   │   ├── stress_simulation.ts
    │   │   └── voice_session_model.ts
    │   │
    │   ├── interview/
    │   │   ├── interview_persistence.ts
    │   │   ├── interview_question_loader.ts
    │   │   ├── interview_result.ts
    │   │   └── interview_store.ts
    │   │
    │   ├── onboarding/
    │   │   └── onboarding_state.ts
    │   │
    │   ├── persistence/
    │   │   ├── runtime_persistence.ts
    │   │   └── storage.ts
    │   │
    │   ├── ui_bridge/
    │   │   ├── ui_bridge.ts
    │   │   ├── ui_navigation.ts
    │   │   ├── ui_node_adapter.ts
    │   │   ├── ui_render_contract.ts
    │   │   └── ui_state_mapper.ts
    │   │
    │   ├── task/
    │   │   ├── task_content_engine.ts
    │   │   └── task_execution_engine.ts
    │   │
    │   ├── bootstrap/
    │   │   ├── init.ts
    │   │   ├── system_bootstrap.ts
    │   │   ├── system_context.ts
    │   │   └── system_entry.ts
    │   │
    │   ├── bridge/
    │   │   ├── ui_runtime_bridge.ts
    │   │   └── world_runtime_bridge.ts
    │   │
    │   ├── user_data/
    │   │   └── notes/
    │   │       ├── note.ts
    │   │       ├── notes_controller.ts
    │   │       ├── notes_persistence.ts
    │   │       └── notes_store.ts
    │   │
    │   ├── notifications/
    │   │   └── notification_service.ts
    │   │
    │   ├── playbook/
    │   │   ├── playbook_data.ts
    │   │   └── playbook_types.ts
    │   │
    │   ├── scoring/
    │   │   └── career_score.ts
    │   │
    │   ├── premium/
    │   │   ├── premium_engine.ts
    │   │   ├── premium_gate.ts
    │   │   ├── premium_state.ts
    │   │   ├── premium_profession_limits.ts
    │   │   ├── premium_unlock_flow.ts
    │   │   ├── premium_warning_engine.ts
    │   │   └── premium_telemetry.ts
    │   │
    │   ├── social/
    │   │   ├── export_engine.ts
    │   │   ├── import_engine.ts
    │   │   ├── share_card_engine.ts
    │   │   ├── share_formats.ts
    │   │   ├── share_gate.ts
    │   │   ├── share_state_builder.ts
    │   │   ├── share_text_generator.ts
    │   │   └── viral_metrics_engine.ts
    │   │
    │   ├── share/
    │   │   ├── share_mapper.ts
    │   │   ├── share_model.ts
    │   │   └── share_service.ts
    │   │
    │   ├── state_engine/
    │   │   ├── career_state.ts
    │   │   └── state_transition_rules.ts
    │   │
    │   ├── world/
    │   │   ├── world_theme.ts
    │   │   ├── world_layout.ts
    │   │   ├── world_art_contract.ts
    │   │   ├── world_composer.ts
    │   │   ├── useWorldCssStyle.ts
    │   │   └── useWorldConfettiColors.ts
    │   │
    │   ├── chapter_engine.ts
    │   ├── chapter_model.ts
    │   ├── chapters.ts
    │   ├── confidence_engine.ts
    │   ├── readiness_engine.ts
    │   ├── skill_engine.ts
    │   ├── skill_state.ts
    │   ├── task_content.ts
    │   ├── rules.ts
    │   ├── advice_engine.ts
    │   ├── depth_mapper.ts
    │   ├── flow_mapper.ts
    │   ├── focus_gravity.ts
    │   ├── focus_snap_controller.ts
    │   ├── gap_engine.ts
    │   ├── journey_adapter.ts
    │   ├── journey_orchestrator.ts
    │   ├── orchestrator.ts
    │   ├── visual_flow.ts
    │   ├── visual_node_renderer.ts
    │   ├── profession_bootstrap.ts
    │   ├── profession_contract.ts
    │   ├── profession_loader.ts
    │   ├── profession_metadata.ts
    │   └── profession_validation.ts
    │
    ├── professions/
    │   ├── index.ts
    │   ├── base_profession_module.ts
    │   ├── profession_auto_loader.ts
    │   ├── profession_registry.ts
    │   ├── profession_service.ts
    │   ├── loader/
    │   │   ├── profession_loader.ts
    │   │   └── profession_manifest.ts
    │   └── software_engineer/
    │       ├── index.ts
    │       ├── module.ts
    │       ├── profession.ts
    │       ├── skill_nodes.ts
    │       ├── chapters.ts
    │       ├── styles.css
    │       ├── world.ts
    │       └── tasks/
    │           ├── index.ts
    │           ├── applications.ts
    │           ├── interviews.ts
    │           ├── linkedin.ts
    │           ├── offer.ts
    │           └── resume.ts
    │
    ├── screens/
    │   ├── OnboardingScreen/
    │   │   ├── OnboardingScreen.tsx
    │   │   └── OnboardingScreen.css
    │   │
    │   ├── IntroJourneyScreen/
    │   │   ├── IntroJourneyScreen.tsx
    │   │   └── IntroJourneyScreen.css
    │   │
    │   ├── JourneyScreen/
    │   │   ├── index.ts
    │   │   ├── JourneyScreen.tsx
    │   │   ├── JourneyScreenDebug.tsx
    │   │   ├── JourneyScreen.css
    │   │   ├── components/
    │   │   │   ├── BackgroundLayer.tsx
    │   │   │   ├── ChapterHub.tsx
    │   │   │   ├── ChapterCompleteScreen.tsx
    │   │   │   ├── JourneyCompleteScreen.tsx
    │   │   │   ├── JourneyHeader.tsx
    │   │   │   ├── JourneyBottomNav.tsx
    │   │   │   ├── SkillNodeCard.tsx
    │   │   │   └── FloatingMissionCard.tsx
    │   │   └── hooks/
    │   │       ├── useCamera.ts
    │   │       └── useChapterHub.ts
    │   │
    │   ├── MissionScreen/
    │   │   ├── index.ts
    │   │   ├── MissionScreen.tsx
    │   │   ├── MissionScreen.css
    │   │   └── TaskCompleteScreen.tsx
    │   │
    │   ├── PlaybookScreen/
    │   │   ├── PlaybookScreen.tsx
    │   │   └── PlaybookScreen.css
    │   │
    │   ├── NotesScreen/
    │   │   ├── NotesScreen.tsx
    │   │   └── NotesScreen.css
    │   │
    │   ├── ShareScreen/
    │   │   ├── ShareScreen.tsx
    │   │   └── ShareScreen.css
    │   │
    │   ├── ProfileScreen/
    │   │   ├── ProfileScreen.tsx
    │   │   └── ProfileScreen.css
    │   │
    │   ├── WorldMapScreen/
    │   │   ├── WorldMapScreen.tsx
    │   │   └── WorldMapScreen.css
    │   │
    │   ├── SettingsScreen/
    │   │   ├── SettingsScreen.tsx
    │   │   └── SettingsScreen.css
    │   │
    │   ├── InterviewTrainerScreen/
    │   │   ├── index.tsx
    │   │   ├── InterviewTrainerScreen.css
    │   │   ├── InterviewResultsScreen.css
    │   │   ├── RecordPhase.tsx
    │   │   ├── ReviewPhase.tsx
    │   │   ├── ResultsScreen.tsx
    │   │   ├── components/
    │   │   └── hooks/
    │   │
    │   ├── InterviewTrainer/
    │   │   ├── InterviewTrainerScreen.tsx
    │   │   └── InterviewTrainer.css
    │   │
    │   ├── PrivacyPolicyScreen/
    │   │   ├── PrivacyPolicyScreen.tsx
    │   │   └── PrivacyPolicyScreen.css
    │   │
    │   ├── DashboardScreen/
    │   │   ├── DashboardScreen.tsx
    │   │   └── DashboardScreen.css
    │   │
    │   └── GapAnalysisScreen/
    │       ├── GapAnalysisScreen.tsx
    │       └── GapAnalysisScreen.css
    │
    ├── hooks/
    │   ├── useJourneyCamera.ts
    │   └── useScrollToCurrent.ts
    │
    ├── voice/
    │   └── tts.ts
    │
    └── world/
        ├── index.ts
        ├── types.ts
        ├── visual_world_contract.ts
        ├── visual_world_engine.ts
        ├── world_builder.ts
        ├── world_renderer.tsx
        ├── world_scene.ts
        ├── world_zone_mapper.ts
        ├── journey_node.ts
        ├── careerToWorld.ts
        ├── WorldState.ts
        ├── WorldFlowConnector.ts
        ├── EnvironmentGenerator.tsx
        ├── LevelRenderer.tsx
        ├── useWorldProgression.ts
        ├── camera/
        │   └── world_camera_controller.ts
        ├── effects/
        │   ├── fog_system.ts
        │   └── glow_system.ts
        └── gap/
            └── gap_visual_layer.ts
```
