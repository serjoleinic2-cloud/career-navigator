import type { SkillNode, SkillState } from './skill_state';

export type GapSeverity = 'critical' | 'important' | 'minor';

export type Gap = {
  nodeId: string;
  skill: string;
  currentState: string;
  targetState: string;
  severity: GapSeverity;
  recommendation: string;
};

const STATE_PRIORITY: Record<SkillState, number> = {
  locked: 0,
  awareness: 1,
  understanding: 2,
  application: 3,
  readiness: 4,
  execution: 5,
  confidence: 7,
};

const SEVERITY_MAP: Record<number, GapSeverity> = {
  1: 'critical',
  2: 'critical',
  3: 'important',
  4: 'important',
  5: 'minor',
  6: 'minor',
  7: 'minor',
};

export function analyzeGaps(nodes: SkillNode[]): Gap[] {
  const gaps: Gap[] = [];

  for (const node of nodes) {
    const priority = STATE_PRIORITY[node.state];

    // Ignore mastery and confidence
    if (priority >= 5) continue;

    const severity = SEVERITY_MAP[priority] ?? 'minor';

    gaps.push({
      nodeId: node.id,
      skill: node.skill,
      currentState: node.state,
      targetState: 'confidence',
      severity,
      recommendation: node.advice[node.state] ?? '',
    });
  }

  // Sort: critical → important → minor
  const severityOrder = { critical: 0, important: 1, minor: 2 };
  return gaps.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

export function getTopGap(nodes: SkillNode[]): Gap | null {
  const gaps = analyzeGaps(nodes);
  return gaps[0] ?? null;
}

export function getGapSummary(nodes: SkillNode[]): {
  critical: number;
  important: number;
  minor: number;
} {
  const gaps = analyzeGaps(nodes);
  return {
    critical: gaps.filter(g => g.severity === 'critical').length,
    important: gaps.filter(g => g.severity === 'important').length,
    minor: gaps.filter(g => g.severity === 'minor').length,
  };
}
