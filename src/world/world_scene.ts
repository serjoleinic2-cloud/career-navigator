import type { UI_State } from '@/core/ui_bridge/ui_render_contract';
import { buildWorldFromUI, getCameraFocusId, getFogIntensity } from './world_builder';
import { createCamera, focusOnNode, updateCamera } from './camera/world_camera_controller';
import { createFogLayers, animateFogLayers } from './effects/fog_system';
import { renderWorld, type RenderFrame } from './world_renderer';
import type { WorldState } from './visual_world_contract';

export type SceneState = {
  world: WorldState;
  camera: ReturnType<typeof createCamera>;
  fogLayers: ReturnType<typeof createFogLayers>;
  time: number;
};

export function createScene(uiState: UI_State): SceneState {
  const worldNodes = buildWorldFromUI(uiState.nodes);
  const focusId = getCameraFocusId(uiState.nodes);
  const fogIntensity = getFogIntensity(uiState.nodes);

  const world: WorldState = {
    nodes: worldNodes,
    cameraFocusId: focusId,
    fogIntensity,
    timeOfDay: 'dawn',
  };

  let camera = createCamera();
  const focusNode = worldNodes.find(n => n.id === focusId);
  if (focusNode) {
    camera = focusOnNode(camera, focusNode);
  }

  return {
    world,
    camera,
    fogLayers: createFogLayers(fogIntensity),
    time: 0,
  };
}

export function updateScene(
  scene: SceneState,
  uiState: UI_State,
  deltaTime: number
): SceneState {
  const worldNodes = buildWorldFromUI(uiState.nodes);
  const focusId = getCameraFocusId(uiState.nodes);
  const fogIntensity = getFogIntensity(uiState.nodes);

  const focusNode = worldNodes.find(n => n.id === focusId);
  let camera = scene.camera;
  if (focusNode) {
    camera = focusOnNode(camera, focusNode);
  }
  camera = updateCamera(camera, deltaTime);

  return {
    world: {
      nodes: worldNodes,
      cameraFocusId: focusId,
      fogIntensity,
      timeOfDay: scene.world.timeOfDay,
    },
    camera,
    fogLayers: animateFogLayers(scene.fogLayers, deltaTime),
    time: scene.time + deltaTime,
  };
}

export function renderScene(scene: SceneState): RenderFrame {
  return renderWorld(scene.world, scene.camera, scene.time);
}
