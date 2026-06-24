import type { SkillNode, SkillState } from './skill_state';

export function getAdvice(node: SkillNode): string {
  return node.advice[node.state];
}

export function getStateDescription(state: SkillState): string {
  const descriptions: Record<SkillState, string> = {
    awareness: 'You recognize what is required.',
    understanding: 'You understand the concept, but cannot yet produce output.',
    application: 'You are now expected to apply knowledge independently.',
    readiness: 'You can perform under guidance.',
    execution: 'You can perform under real conditions.',
    confidence: 'This skill is stable under pressure.',
  };
  return descriptions[state];
}
