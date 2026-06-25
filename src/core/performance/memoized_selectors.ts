import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';

type MemoCache<T> = {
  input: string;
  output: T;
};

function createMemo<T>(fn: (state: UnifiedRuntimeState) => T): (state: UnifiedRuntimeState) => T {
  let cache: MemoCache<T> | null = null;

  return (state: UnifiedRuntimeState): T => {
    const input = JSON.stringify({
      currentNodeId: state.currentNodeId,
      readinessScore: state.readinessScore,
      confidenceScore: state.confidenceScore,
      completedNodes: state.completedNodes,
      lockedNodes: state.lockedNodes,
    });

    if (cache && cache.input === input) {
      return cache.output;
    }

    const output = fn(state);
    cache = { input, output };
    return output;
  };
}

export const getCurrentNodeMemo = createMemo((state) => state.currentNodeId);

export const getProgressMemo = createMemo((state) => ({
  readiness: state.readinessScore,
  confidence: state.confidenceScore,
  completed: state.completedNodes.length,
  total: Object.keys(state.skillState).length,
}));

export const getWorldStateMemo = createMemo((state) => ({
  currentNodeId: state.currentNodeId,
  completedNodes: state.completedNodes,
  lockedNodes: state.lockedNodes,
  skillState: state.skillState,
}));
