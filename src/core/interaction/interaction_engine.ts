import type { SkillNode } from '../skill_state';
import type { InteractionAction, InteractionResult } from './interaction_types';
import { runProgressionCycle } from './progression_loop';

export function processUserAction(
  action: InteractionAction,
  nodeStates: Record<string, SkillNode>,
  activeNodeId: string
): InteractionResult {
  return runProgressionCycle(action, nodeStates, activeNodeId);
}
