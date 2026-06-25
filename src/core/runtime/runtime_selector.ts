import type { UnifiedRuntimeState } from './unified_runtime_state';

export function getCurrentNode(state: UnifiedRuntimeState): string {
  return state.currentNodeId;
}

export function getNextNode(state: UnifiedRuntimeState): string | null {
  const nodes = Object.keys(state.skillState);
  const currentIndex = nodes.indexOf(state.currentNodeId);
  return nodes[currentIndex + 1] ?? null;
}

export function getProgressSnapshot(state: UnifiedRuntimeState): {
  totalNodes: number;
  completedNodes: number;
  lockedNodes: number;
  readiness: number;
  confidence: number;
} {
  return {
    totalNodes: Object.keys(state.skillState).length,
    completedNodes: state.completedNodes.length,
    lockedNodes: state.lockedNodes.length,
    readiness: state.readinessScore,
    confidence: state.confidenceScore,
  };
}

export function getUnlockedNodes(state: UnifiedRuntimeState): string[] {
  const allNodes = Object.keys(state.skillState);
  return allNodes.filter(id => !state.lockedNodes.includes(id));
}

export function getActiveChapter(state: UnifiedRuntimeState): string | null {
  const active = Object.entries(state.chapterState).find(([, c]) => c.active);
  return active?.[0] ?? null;
}

export function getCompletedChapters(state: UnifiedRuntimeState): string[] {
  return Object.entries(state.chapterState)
    .filter(([, c]) => c.completed)
    .map(([id]) => id);
}
