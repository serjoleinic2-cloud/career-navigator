# CORE_MAP.md — карта `src/core`

Перегенерировано после чистки мёртвого кода (сессия Claude, 2026-07-03).
Метод: реальный граф импортов от `src/main.tsx` (инструмент `madge`, транзитивно, включая barrel-реэкспорты через `index.ts`) — а не грубый grep по прямым путям, как в предыдущей версии файла. Все файлы ниже подтверждённо достижимы из точки входа приложения; всё остальное, что было в `src/core`, физически удалено из репозитория в этой сессии (см. `PROJECT_STATUS.md`).

---

## `src/core/`

| Файл | Назначение |
|---|---|
| `advice_engine.ts` | exports function `getAdvice` |
| `chapter_engine.ts` | exports function `getChapterProgress` |
| `chapter_model.ts` | exports type `ChapterId` |
| `chapters.ts` | exports const `CHAPTER_ORDER` |
| `confidence_engine.ts` | exports type `ConfidenceInput` |
| `depth_mapper.ts` | exports function `getNodeDepth` |
| `flow_mapper.ts` | exports type `FlowMapEntry` |
| `focus_gravity.ts` | exports function `getFocusWeight` |
| `focus_snap_controller.ts` | exports function `snapToActiveNode` |
| `gap_engine.ts` | exports type `GapSeverity` |
| `index.ts` | (no export signature found) |
| `journey_adapter.ts` | exports type `VisualNode` |
| `journey_orchestrator.ts` | exports function `buildJourneyUI` |
| `orchestrator.ts` | exports type `OrchestratorState` |
| `profession_bootstrap.ts` | exports type `BootstrapResult` |
| `profession_contract.ts` | exports type `ProfessionModule` |
| `profession_loader.ts` | exports type `ActiveProfessionState` |
| `profession_metadata.ts` | exports type `ProfessionMeta` |
| `profession_validation.ts` | exports type `ValidationSeverity` |
| `readiness_engine.ts` | exports type `ReadinessResult` |
| `rules.ts` | exports const `CORE_RULES` |
| `skill_engine.ts` | exports type `UserAction` |
| `skill_state.ts` | exports type `SkillState` |
| `task_content.ts` | exports interface `TaskContent` |
| `visual_flow.ts` | exports type `FlowPosition` |
| `visual_node_renderer.ts` | exports type `RenderNode` |

## `src/core/bootstrap/`

| Файл | Назначение |
|---|---|
| `init.ts` | exports function `initCareerNavigator` |
| `system_bootstrap.ts` | exports type `UserProfile` |
| `system_context.ts` | exports type `SystemContext` |
| `system_entry.ts` | exports function `startCareerNavigator` |

## `src/core/bridge/`

| Файл | Назначение |
|---|---|
| `ui_runtime_bridge.ts` | exports function `syncUI` |
| `world_runtime_bridge.ts` | exports function `syncWorldWithRuntime` |

## `src/core/events/`

| Файл | Назначение |
|---|---|
| `system_event_bus.ts` | exports type `SystemEventType` |

## `src/core/export/`

| Файл | Назначение |
|---|---|
| `export_service.ts` | exports function `exportJSON` |

## `src/core/interaction/`

| Файл | Назначение |
|---|---|
| `task_cycle.ts` | exports type `TaskResult` |

## `src/core/learning/`

| Файл | Назначение |
|---|---|
| `difficulty_adapter.ts` | exports function `adaptDifficulty` |
| `learning_loop_model.ts` | exports type `TaskResult` |
| `learning_pipeline.ts` | exports type `PipelineResult` |
| `loop_execution_engine.ts` | exports type `TaskInput` |
| `loop_gap_connector.ts` | exports function `loopToGapUpdate` |
| `reinforcement_engine.ts` | exports type `UserConfidenceState` |

## `src/core/onboarding/`

| Файл | Назначение |
|---|---|
| `onboarding_state.ts` | exports type `CurrentSituation` |

## `src/core/persistence/`

| Файл | Назначение |
|---|---|
| `runtime_persistence.ts` | exports function `loadRuntime` |
| `storage.ts` | exports function `load` |

## `src/core/playbook/`

| Файл | Назначение |
|---|---|
| `playbook_data.ts` | exports const `PLAYBOOK` |
| `playbook_types.ts` | exports type `PlaybookCategory` |

## `src/core/premium/`

| Файл | Назначение |
|---|---|
| `premium_engine.ts` | exports type `AccessLevel` |
| `premium_gate.ts` | exports type `AccessCheckResult` |
| `premium_state.ts` | exports type `UnlockType` |

## `src/core/runtime/`

| Файл | Назначение |
|---|---|
| `journey_runtime.ts` | exports type `JourneyRuntimeState` |
| `runtime_controller.ts` | exports function `startJourney` |
| `runtime_selector_final.ts` | exports type `CurrentView` |
| `runtime_store.ts` | exports function `getState` |
| `unified_runtime_state.ts` | exports type `ChapterState` |

## `src/core/scoring/`

| Файл | Назначение |
|---|---|
| `career_score.ts` | exports type `WeightedScoreInput` |

## `src/core/share/`

| Файл | Назначение |
|---|---|
| `share_mapper.ts` | exports function `mapToShareModel` |
| `share_model.ts` | exports interface `ShareModel` |
| `share_service.ts` | exports function `shareText` |

## `src/core/social/`

| Файл | Назначение |
|---|---|
| `share_formats.ts` | exports type `ShareFormat` |
| `share_gate.ts` | exports type `SharePrompt` |
| `share_state_builder.ts` | exports type `ShareState` |
| `share_text_generator.ts` | exports type `ShareTextTemplate` |

## `src/core/state_engine/`

| Файл | Назначение |
|---|---|
| `career_state.ts` | exports enum `CareerState` |
| `state_transition_rules.ts` | exports type `StateTrigger` |

## `src/core/task/`

| Файл | Назначение |
|---|---|
| `task_content_engine.ts` | exports type `ValidationRule` |
| `task_execution_engine.ts` | exports type `TaskType` |

## `src/core/ui_bridge/`

| Файл | Назначение |
|---|---|
| `ui_bridge.ts` | exports function `getUIState` |
| `ui_navigation.ts` | exports function `getNavigationState` |
| `ui_node_adapter.ts` | exports function `toUINode` |
| `ui_render_contract.ts` | exports type `UI_NodeState` |
| `ui_state_mapper.ts` | exports function `mapRuntimeToUI` |

## `src/core/user_data/notes/`

| Файл | Назначение |
|---|---|
| `note.ts` | exports interface `Note` |
| `notes_controller.ts` | exports function `addNote` |
| `notes_persistence.ts` | exports function `loadNotes` |
| `notes_store.ts` | exports function `getNotes` |

## `src/core/voice/`

| Файл | Назначение |
|---|---|
| `answer_analysis_engine.ts` | exports function `analyzeAnswer` |
| `confidence_impact_engine.ts` | exports type `UserConfidence` |
| `feedback_generator.ts` | exports function `generateFeedback` |
| `interview_loop.ts` | exports type `InterviewResult` |
| `interview_state_machine.ts` | exports type `InterviewState` |
| `stress_simulation.ts` | exports type `StressConfig` |
| `stt_engine.ts` | exports interface `STTResult` |
| `tts_engine.ts` | exports type `TTSVoice` |
| `voice_session_model.ts` | exports type `VoiceSessionType` |

## `src/core/world/`

| Файл | Назначение |
|---|---|
| `useWorldConfettiColors.ts` | exports function `useWorldConfettiColors` |
| `useWorldCssStyle.ts` | exports function `useWorldCssStyle` |
| `world_art_contract.ts` | exports type `WorldArtConfig` |
| `world_layout.ts` | exports type `LandmarkType` |
| `world_theme.ts` | exports type `WorldPalette` |
