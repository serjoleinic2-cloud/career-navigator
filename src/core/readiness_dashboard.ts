import type { SkillNode } from './skill_state';
import { calculateReadiness } from './readiness_engine';
import { getTopGap, getGapSummary } from './gap_engine';
import type { Gap } from './gap_engine';
import { SOFTWARE_ENGINEER_CHAPTERS } from '@/professions/software_engineer';
import { getCurrentChapter } from './chapter_engine';
import type { Chapter } from './chapter_model';

export type ReadinessDashboard = {
  readinessScore: number;
  confidenceScore: number;
  completedSkills: number;
  totalSkills: number;
  topGap: Gap | null;
  gapSummary: {
    critical: number;
    important: number;
    minor: number;
  };
  currentChapter: Chapter | undefined;
};

export function buildReadinessDashboard(
  nodes: Record<string, SkillNode>
): ReadinessDashboard {
  const nodeList = Object.values(nodes);
  const readiness = calculateReadiness(nodeList);

  return {
    readinessScore: readiness.readinessScore,
    confidenceScore: readiness.confidenceScore,
    completedSkills: readiness.completedSkills,
    totalSkills: readiness.totalSkills,
    topGap: getTopGap(nodeList),
    gapSummary: getGapSummary(nodeList),
    currentChapter: getCurrentChapter(SOFTWARE_ENGINEER_CHAPTERS, nodes),
  };
}

export function getReadinessSummary(
  dashboard: ReadinessDashboard
): string {
  if (dashboard.readinessScore >= 90) {
    return 'Ready for offer negotiation';
  }
  if (dashboard.readinessScore >= 70) {
    return 'Interview-ready, close to offer';
  }
  if (dashboard.readinessScore >= 50) {
    return 'Application-ready, needs interview prep';
  }
  if (dashboard.readinessScore >= 30) {
    return 'Profile-ready, needs application strategy';
  }
  return 'Foundation building, focus on resume and positioning';
}

export function getNextAction(
  dashboard: ReadinessDashboard
): string {
  if (dashboard.topGap) {
    return `Focus on: ${dashboard.topGap.skill} — ${dashboard.topGap.recommendation}`;
  }
  return 'All skills at confidence. Review and maintain.';
}
