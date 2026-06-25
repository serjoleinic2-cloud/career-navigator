import type { SkillNode } from '../skill_state';
import type { UI_Node, UI_NodeState } from './ui_render_contract';

function mapStateToUI(state: string): UI_NodeState {
  switch (state) {
    case 'confidence':
    case 'execution':
      return 'completed';
    case 'readiness':
    case 'application':
      return 'active';
    case 'understanding':
    case 'awareness':
    case 'locked':
    default:
      return 'locked';
  }
}

function getVisualLevel(state: string): number {
  switch (state) {
    case 'locked': return 0;
    case 'awareness': return 1;
    case 'understanding': return 2;
    case 'application': return 3;
    case 'readiness': return 4;
    case 'execution': return 5;
    case 'confidence': return 6;
    default: return 0;
  }
}

export function toUINode(
  skillNode: SkillNode,
  index: number,
  total: number
): UI_Node {
  const uiState = mapStateToUI(skillNode.state);

  let positionHint: 'top' | 'middle' | 'bottom' | undefined;
  if (index === 0) positionHint = 'top';
  else if (index === total - 1) positionHint = 'bottom';
  else positionHint = 'middle';

  return {
    id: skillNode.id,
    title: skillNode.skill,
    state: uiState,
    visualLevel: getVisualLevel(skillNode.state),
    glow: uiState === 'active',
    positionHint,
  };
}
