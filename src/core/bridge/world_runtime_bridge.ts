import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';
import type { WorldState } from '../../world/visual_world_contract';
import { buildWorldStateFromRuntime } from '../../world/world_builder';
import { buildVisualWorld } from '../../world/visual_world_engine';

export function syncWorldWithRuntime(unifiedState: UnifiedRuntimeState): WorldState {
  const runtimeState = {
    nodeStates: Object.fromEntries(
      Object.entries(unifiedState.skillState).map(([id, state]) => [id, { state }])
    ),
    activeNodeId: unifiedState.currentNodeId,
    activeChapterId: Object.entries(unifiedState.chapterState).find(([, cs]) => cs.active)?.[0] ?? '',
    chapterProgress: Object.fromEntries(
      Object.entries(unifiedState.chapterState).map(([id, cs]) => [id, cs.progress])
    ),
  };

  const world = buildWorldStateFromRuntime(runtimeState);

  const careerVisual = buildVisualWorld({
    careerState: unifiedState.careerState,
    confidenceScore: unifiedState.confidenceScore,
    readinessScore: unifiedState.readinessScore,
    nodes: world.nodes,
  });

  return careerVisual;
}
