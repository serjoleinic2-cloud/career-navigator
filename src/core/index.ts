/* ── Single source of truth: skill_engine ── */
export type { SkillState, SkillNode } from './skill_state';
export { STATE_FLOW } from './skill_state';
export {
  transition,
  canTransition,
  getCurrentAdvice,
  getNextAdvice,
  getCareerState,
  getConfidenceScore,
  getReadiness,
  getNodeStates,
  getActiveNodeId,
} from './skill_engine';
export type { UserAction, MissionResult } from './skill_engine';

/* ── Main screen ── */
export { WorldRenderer } from '@/world/world_renderer';

/* ── Profession system ── */
export type { ProfessionModule } from './profession_contract';
export {
  registerProfession,
  getProfession,
  getAllProfessions,
  getDefaultProfession,
  hasProfession,
  unregisterProfession,
} from '@/professions/profession_registry';
export {
  setActiveProfession,
  getActiveProfession,
  getActiveNodes,
  getActiveChapters,
  getActiveProfessionId,
} from './profession_loader';
export type { ActiveProfessionState } from './profession_loader';
export type { ProfessionMeta } from './profession_metadata';
export { getProfessionCatalog } from './profession_metadata';
export { validateProfession } from './profession_validation';
export type { ValidationResult, ValidationIssue, ValidationSeverity } from './profession_validation';
export { bootstrapProfessions } from './profession_bootstrap';
export type { BootstrapResult } from './profession_bootstrap';

/* ── Core rules ── */
export { CORE_RULES, enforceRule } from './rules';
export type { CoreRule } from './rules';

/* ── Advice engine ── */
export { getAdvice, getStateDescription } from './advice_engine';

/* ── Journey adapters & render ── */
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

/* ── Flow & depth ── */
export type { FlowPosition } from './visual_flow';
export type { FlowMapEntry } from './flow_mapper';
export { buildFlowMap } from './flow_mapper';
export { getNodeDepth } from './depth_mapper';
export { getFocusWeight } from './focus_gravity';

/* ── State engine ── */
export { CareerState, CAREER_STATE_ORDER } from './state_engine/career_state';
export type { StateTrigger, StateTransitionRule } from './state_engine/state_transition_rules';
export { STATE_TRANSITIONS, canTransition as canTransitionCareerState, applyTransition as applyCareerStateTransition } from './state_engine/state_transition_rules';

/* ── Chapters ── */
export { getChapterProgress, isChapterCompleted, isChapterActive, getCurrentChapter, getChapterById, getNextChapter } from './chapter_engine';
export type { Chapter, ChapterId } from './chapter_model';
export { CHAPTER_ORDER } from './chapters';

/* ── Scoring & readiness ── */
export type { WeightedScoreInput } from './scoring/career_score';
export { calculateCareerScore, calculateSystemScore } from './scoring/career_score';
export type { ReadinessVector } from './readiness_engine';
export { createDefaultReadinessVector, updateReadinessVector } from './readiness_engine';
export type { ConfidenceInput } from './confidence_engine';
export { calculateConfidence, buildConfidenceInput, getConfidenceLevel } from './confidence_engine';

/* ── Gap analysis ── */
export type { AwarenessEvent, UserPerception, SystemReadiness, GapState } from './gap_engine';
export { calculateSystemGap, calculateGap, checkGapThreshold } from './gap_engine';

/* ── Learning pipeline ── */
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

/* ── Voice / Interview ── */
export type { VoiceSessionType, VoiceSessionStatus, VoiceSession } from './voice/voice_session_model';
export { createVoiceSession } from './voice/voice_session_model';
export type { TTSVoice, TTSRequest, TTSResult } from './voice/tts_engine';
export { speak, estimateSpeechDuration } from './voice/tts_engine';
export type { STTResult } from './voice/stt_engine';
export { listen, parseTranscript } from './voice/stt_engine';
export type { InterviewState, InterviewMode, InterviewSession, AnswerAnalysis } from './voice/interview_state_machine';
export { createInterviewSession, advanceInterviewState, nextQuestion } from './voice/interview_state_machine';
export { analyzeAnswer } from './voice/answer_analysis_engine';
export { generateFeedback, generateScoreBreakdown } from './voice/feedback_generator';
export type { UserConfidence } from './voice/confidence_impact_engine';
export { updateConfidenceFromVoice } from './voice/confidence_impact_engine';
export type { StressConfig } from './voice/stress_simulation';
export { applyStressMode, getStressConfig } from './voice/stress_simulation';
export type { InterviewResult } from './voice/interview_loop';
export { runInterviewQuestion } from './voice/interview_loop';

/* ── Bootstrap ── */
export { initCareerNavigator } from './bootstrap/init';
export { startCareerNavigator, restartCareerNavigator } from './bootstrap/system_entry';

/* ── Social / Share ── */
export { generateShareText } from './social/share_text_generator';
export { buildShareState } from './social/share_state_builder';
export type { ShareState } from './social/share_state_builder';
export { shouldPromptShare } from './social/share_gate';
export type { ShareFormat } from './social/share_formats';
export { SHARE_FORMATS, isValidShareFormat } from './social/share_formats';

/* ── Orchestrator (debug only) ── */
export type { OrchestratorState } from './orchestrator';
export {
  getActiveNode,
  moveToNextState,
  setActiveNode,
  canAdvance,
  getNodeById,
  getAllNodes,
} from './orchestrator';
