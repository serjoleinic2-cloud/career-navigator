import type { SkillNode } from './skill_state';
import { STATE_FLOW } from './skill_state';

export type UserAction = 'tap_primary' | 'tap_secondary';

export function transition(node: SkillNode, action: UserAction): SkillNode {
  if (action !== 'tap_primary') return node;
  if (!node.nextState) return node;

  return {
    ...node,
    state: node.nextState,
    nextState: STATE_FLOW[node.nextState] ?? null,
  };
}

export function canTransition(node: SkillNode): boolean {
  return node.nextState !== null;
}

export function getCurrentAdvice(node: SkillNode): string | undefined {
  return node.advice[node.state];
}

export function getNextAdvice(node: SkillNode): string | null | undefined {
  if (!node.nextState) return null;
  return node.advice[node.nextState];
}
