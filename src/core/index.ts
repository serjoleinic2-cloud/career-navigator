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
