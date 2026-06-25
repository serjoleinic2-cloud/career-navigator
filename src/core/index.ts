export type { SkillState, SkillNode } from './skill_state';
export { STATE_FLOW } from './skill_state';

export type { ProfessionModule } from './profession_contract';
export {
  registerProfession,
  getProfession,
  getAllProfessions,
  getDefaultProfession,
  hasProfession,
  unregisterProfession,
} from '@/professions/profession_registry';

export { transition, canTransition, getCurrentAdvice, getNextAdvice } from './skill_engine';
export type { UserAction } from './skill_engine';

export { getAdvice, getStateDescription } from './advice_engine';

export type { VisualNode } from './journey_adapter';
export {
  mapSkillStateToUI,
  getFocusIntensity,
  extractChapter,
  buildJourneyViewModel,
  getVisibleNodes,
} from './journey_adapter';

export type { RenderNode } from './visual_node_renderer';
export {
  mapVisualNodesToRender,
  calculateDepth,
  calculateScale,
  calculateOpacity,
} from './visual_node_renderer';

export { snapToActiveNode, snapToActiveNodeImmediate } from './focus_snap_controller';

export { buildJourneyUI } from './journey_orchestrator';

export type { OrchestratorState } from './orchestrator';
export {
  getActiveNode,
  moveToNextState,
  setActiveNode,
  canAdvance,
  getNodeById,
  getAllNodes,
} from './orchestrator';

export { initCareerNavigator } from './bootstrap/init';

export { CORE_RULES, enforceRule } from './rules';
export type { CoreRule } from './rules';

export type { ActiveProfessionState } from './profession_loader';
export {
  setActiveProfession,
  getActiveProfession,
  getActiveNodes,
  getActiveChapters,
  getActiveProfessionId,
} from './profession_loader';

export type { ProfessionMeta } from './profession_metadata';
export { getProfessionCatalog } from './profession_metadata';

export type { ValidationResult, ValidationIssue, ValidationSeverity } from './profession_validation';
export { validateProfession } from './profession_validation';

export type { BootstrapResult } from './profession_bootstrap';
export { bootstrapProfessions } from './profession_bootstrap';

export type { FlowPosition } from './visual_flow';

export type { FlowMapEntry } from './flow_mapper';
export { buildFlowMap } from './flow_mapper';

export { getNodeDepth } from './depth_mapper';

export { getFocusWeight } from './focus_gravity';

export { CareerState, CAREER_STATE_ORDER } from './state_engine/career_state';
export type { StateTrigger, StateTransitionRule } from './state_engine/state_transition_rules';
export { STATE_TRANSITIONS, canTransition as canTransitionCareerState, applyTransition as applyCareerStateTransition } from './state_engine/state_transition_rules';

export type { WeightedScoreInput } from './scoring/career_score';
export { calculateCareerScore, calculateSystemScore } from './scoring/career_score';

export type { ReadinessVector } from './readiness_engine';
export { createDefaultReadinessVector, updateReadinessVector } from './readiness_engine';

export type { ConfidenceInput } from './confidence_engine';
export { calculateConfidence, buildConfidenceInput, getConfidenceLevel } from './confidence_engine';

export type { AwarenessEvent, UserPerception, SystemReadiness, GapState } from './gap_engine';
export { calculateSystemGap, calculateGap, checkGapThreshold } from './gap_engine';

export type { TaskResult, LearningLoop, TaskState } from './learning/learning_loop_model';
export { createTaskState } from './learning/learning_loop_model';
export type { TaskInput } from './learning/loop_execution_engine';
export { processTaskAttempt, calculateDelta } from './learning/loop_execution_engine';
export { adaptDifficulty, shouldRetry } from './learning/difficulty_adapter';
export type { UserConfidenceState } from './learning/reinforcement_engine';
export { applyReinforcement, createConfidenceState } from './learning/reinforcement_engine';
export { loopToGapUpdate, shouldUpdateGap } from './learning/loop_gap_connector';
export type { PipelineResult } from './learning/learning_pipeline';
export { runLearningPipeline } from './learning/learning_pipeline';
