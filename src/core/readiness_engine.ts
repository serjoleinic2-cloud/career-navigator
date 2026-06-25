import type { SkillNode, SkillState } from './skill_state';

export type ReadinessResult = {
  readinessScore: number;
  confidenceScore: number;
  completedSkills: number;
  totalSkills: number;
  gaps: string[];
};

const STATE_VALUES: Record<SkillState, number> = {
  locked: 0,
  awareness: 10,
  understanding: 25,
  application: 45,
  readiness: 65,
  execution: 80,
  confidence: 100,
};

export function calculateReadiness(nodes: SkillNode[]): ReadinessResult {
  if (nodes.length === 0) {
    return {
      readinessScore: 0,
      confidenceScore: 0,
      completedSkills: 0,
      totalSkills: 0,
      gaps: [],
    };
  }

  const totalSkills = nodes.length;
  const totalValue = nodes.reduce((sum, node) => sum + STATE_VALUES[node.state], 0);
  const readinessScore = Math.round(totalValue / totalSkills);

  const confidenceNodes = nodes.filter(n => n.state === 'confidence');
  const confidenceScore = Math.round((confidenceNodes.length / totalSkills) * 100);

  const completedSkills = nodes.filter(
    n => n.state === 'execution' || n.state === 'confidence'
  ).length;

  const gaps = nodes
    .filter(n => STATE_VALUES[n.state] < STATE_VALUES.application)
    .map(n => n.skill);

  return {
    readinessScore,
    confidenceScore,
    completedSkills,
    totalSkills,
    gaps,
  };
}

export function getSkillValue(state: SkillState): number {
  return STATE_VALUES[state];
}

export function isGap(node: SkillNode): boolean {
  return STATE_VALUES[node.state] < STATE_VALUES.application;
}

export function isCompleted(node: SkillNode): boolean {
  return node.state === 'execution' || node.state === 'confidence';
}

export function isConfident(node: SkillNode): boolean {
  return node.state === 'confidence';
}
