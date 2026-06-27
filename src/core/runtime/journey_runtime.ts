import type { OnboardingState } from '../onboarding/onboarding_state';
import type { SkillNode } from '../skill_state';
import { getActiveProfession, getActiveNodes, getActiveChapters } from '../profession_loader';
import { getChapterProgress, getCurrentChapter } from '../chapter_engine';
import { calculateReadiness } from '../readiness_engine';

export type JourneyRuntimeState = {
  professionId: string;
  activeNodeId: string;
  onboardingSnapshot: OnboardingState;
  createdAt: number;
  chapterProgress: Record<string, number>;
  activeChapterId: string;
  readinessScore: number;
  confidenceScore: number;
  nodeStates: Record<string, SkillNode>;
};

export function createEmptyRuntime(): JourneyRuntimeState {
  return {
    professionId: '',
    activeNodeId: '',
    onboardingSnapshot: {
      situation: null,
      emotion: null,
      applicationsCount: null,
      interviewsCount: null,
      professionId: null,
      confidenceLevel: null,
      fears: [],
      step: 0,
      experienceLevel: null,
      goals: [],
      timeline: null,
      preferences: [],
      isComplete: false,
    },
    createdAt: 0,
    chapterProgress: {},
    activeChapterId: '',
    readinessScore: 0,
    confidenceScore: 0,
    nodeStates: {},
  };
}

export function buildNodeMap(nodes: SkillNode[]): Record<string, SkillNode> {
  const map: Record<string, SkillNode> = {};
  for (const n of nodes) {
    map[n.id] = n;
  }
  return map;
}

export function initializeJourneyRuntime(onboardingState: OnboardingState): JourneyRuntimeState {
  const profession = getActiveProfession();
  const nodes = getActiveNodes();
  const chapters = getActiveChapters();

  let activeNodeId = '';
  if (nodes.length > 0) {
    activeNodeId = nodes[0].id;
  }

  const nodeMap = buildNodeMap(nodes);

  const chapterProgress: Record<string, number> = {};
  for (const ch of chapters) {
    const progress = getChapterProgress(ch, nodeMap);
    chapterProgress[ch.id] = progress.percent;
  }

  const currentChapter = getCurrentChapter(chapters, nodeMap);
  const readiness = calculateReadiness(nodes);

  return {
    professionId: profession.id,
    activeNodeId,
    onboardingSnapshot: { ...onboardingState },
    createdAt: Date.now(),
    chapterProgress,
    activeChapterId: currentChapter?.id ?? '',
    readinessScore: readiness.readinessScore,
    confidenceScore: readiness.confidenceScore,
    nodeStates: nodeMap,
  };
}
