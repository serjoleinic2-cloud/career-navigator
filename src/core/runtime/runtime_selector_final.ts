import type { UnifiedRuntimeState } from './unified_runtime_state';

export type CurrentView = {
  professionId: string;
  currentNodeId: string;
  activeChapterId: string;
  readinessScore: number;
  confidenceScore: number;
  completedNodes: number;
  totalNodes: number;
  lockedNodes: number;
  memoryCount: number;
  isPremium: boolean;
};

export type ProgressState = {
  readiness: number;
  confidence: number;
  completedChapters: string[];
  activeChapter: string;
  nextMilestone: string | null;
};

export function getCurrentView(state: UnifiedRuntimeState): CurrentView {
  const totalNodes = Object.keys(state.skillState).length;
  const completedNodes = state.completedNodes.length;
  const lockedNodes = state.lockedNodes.length;

  return {
    professionId: state.activeProfessionId,
    currentNodeId: state.currentNodeId,
    activeChapterId: Object.entries(state.chapterState).find(([, c]) => c.active)?.[0] ?? '',
    readinessScore: state.readinessScore,
    confidenceScore: state.confidenceScore,
    completedNodes,
    totalNodes,
    lockedNodes,
    memoryCount: state.memoryIndex.length,
    isPremium: false,
  };
}

export function getProgressState(state: UnifiedRuntimeState): ProgressState {
  const completedChapters = Object.entries(state.chapterState)
    .filter(([, c]) => c.completed)
    .map(([id]) => id);

  const activeEntry = Object.entries(state.chapterState).find(([, c]) => c.active);
  const activeChapter = activeEntry?.[0] ?? '';

  const nextNode = getNextNode(state);

  return {
    readiness: state.readinessScore,
    confidence: state.confidenceScore,
    completedChapters,
    activeChapter,
    nextMilestone: nextNode,
  };
}

export function getActiveNode(state: UnifiedRuntimeState): string {
  return state.currentNodeId;
}

export function getNextNode(state: UnifiedRuntimeState): string | null {
  const nodes = Object.keys(state.skillState);
  const currentIndex = nodes.indexOf(state.currentNodeId);
  return nodes[currentIndex + 1] ?? null;
}

export function getUnlockedContent(state: UnifiedRuntimeState): string[] {
  return Object.keys(state.skillState).filter(id => !state.lockedNodes.includes(id));
}

export function getCompletedContent(state: UnifiedRuntimeState): string[] {
  return state.completedNodes;
}
