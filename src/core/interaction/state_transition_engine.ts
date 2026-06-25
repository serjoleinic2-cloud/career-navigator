import type { SkillNode } from '../skill_state';
import { transition, canTransition } from '../skill_engine';
import type { UserAction } from '../skill_engine';
import type { InteractionAction } from './interaction_types';

function mapToEngineAction(action: InteractionAction): UserAction | null {
  switch (action) {
    case 'complete_task':
    case 'mark_practice_done':
    case 'submit_answer':
      return 'tap_primary';
    case 'fail_task':
    case 'skip_task':
    case 'start_interview_practice':
      return null;
  }
}

export function applyStateTransition(
  node: SkillNode,
  action: InteractionAction
): SkillNode {
  const engineAction = mapToEngineAction(action);
  if (!engineAction) return node;
  if (!canTransition(node)) return node;
  return transition(node, engineAction);
}
