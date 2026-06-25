import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';

export type StateDiff = {
  changedNodes: string[];
  changedSkills: string[];
  changedChapter: boolean;
  changedReadiness: boolean;
  changedConfidence: boolean;
  changedMemory: boolean;
  hasChanges: boolean;
};

export function diffState(
  prevState: UnifiedRuntimeState,
  nextState: UnifiedRuntimeState
): StateDiff {
  const changedNodes: string[] = [];
  const changedSkills: string[] = [];

  const nextSkills = Object.keys(nextState.skillState);

  for (const id of nextSkills) {
    if (prevState.skillState[id] !== nextState.skillState[id]) {
      changedSkills.push(id);
    }
  }

  for (const id of nextState.completedNodes) {
    if (!prevState.completedNodes.includes(id)) {
      changedNodes.push(id);
    }
  }

  for (const id of nextState.lockedNodes) {
    if (!prevState.lockedNodes.includes(id)) {
      changedNodes.push(id);
    }
  }

  const changedChapter = JSON.stringify(prevState.chapterState) !== JSON.stringify(nextState.chapterState);
  const changedReadiness = prevState.readinessScore !== nextState.readinessScore;
  const changedConfidence = prevState.confidenceScore !== nextState.confidenceScore;
  const changedMemory = prevState.memoryIndex.length !== nextState.memoryIndex.length;

  const hasChanges =
    changedNodes.length > 0 ||
    changedSkills.length > 0 ||
    changedChapter ||
    changedReadiness ||
    changedConfidence ||
    changedMemory;

  return {
    changedNodes,
    changedSkills,
    changedChapter,
    changedReadiness,
    changedConfidence,
    changedMemory,
    hasChanges,
  };
}
