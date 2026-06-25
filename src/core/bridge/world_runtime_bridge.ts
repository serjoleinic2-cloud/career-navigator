import type { UnifiedRuntimeState } from '../runtime/unified_runtime_state';
import type { WorldState } from '../../world/visual_world_contract';
import type { UI_Node, UI_NodeState } from '../ui_bridge/ui_render_contract';
import { buildWorldFromUI, getCameraFocusId, getFogIntensity } from '../../world/world_builder';
import { createCamera, focusOnNode } from '../../world/camera/world_camera_controller';
import { buildVisualWorld } from '../../world/visual_world_engine';

export function syncWorldWithRuntime(runtimeState: UnifiedRuntimeState): WorldState {
  const uiNodes: UI_Node[] = Object.entries(runtimeState.skillState).map(([id, state]) => ({
    id,
    title: id,
    state: mapState(state),
    visualLevel: getLevel(state),
    glow: state === 'readiness' || state === 'application',
  }));

  const worldNodes = buildWorldFromUI(uiNodes);
  const focusId = getCameraFocusId(uiNodes);
  getFogIntensity(uiNodes);

  const focusNode = worldNodes.find(n => n.id === focusId);
  let camera = createCamera();
  if (focusNode) {
    camera = focusOnNode(camera, focusNode);
  }

  const careerVisual = buildVisualWorld({
    careerState: runtimeState.careerState,
    confidenceScore: runtimeState.confidenceScore,
    readinessScore: runtimeState.readinessScore,
    nodes: worldNodes,
  });

  return {
    nodes: worldNodes,
    cameraFocusId: focusId,
    fogIntensity: careerVisual.fogIntensity,
    timeOfDay: careerVisual.timeOfDay,
  };
}

function mapState(state: string): UI_NodeState {
  if (state === 'confidence' || state === 'execution') return 'completed';
  if (state === 'readiness' || state === 'application') return 'active';
  return 'locked';
}

function getLevel(state: string): number {
  const map: Record<string, number> = {
    locked: 0, awareness: 1, understanding: 2,
    application: 3, readiness: 4, execution: 5, confidence: 6,
  };
  return map[state] ?? 0;
}
