import type { UI_State } from '@/core/ui_bridge/ui_render_contract';
import { buildWorldFromUI, getCameraFocusId, getFogIntensity } from './world_builder';
import { createCamera, focusOnNode, updateCamera } from './camera/world_camera_controller';
import { createFogLayers, animateFogLayers } from './effects/fog_system';
import { renderWorld, type RenderFrame } from './world_renderer';
import type { WorldState } from './visual_world_contract';
import { buildGapVisualState, applyGapOverlay } from './gap/gap_visual_layer';
import type { GapState } from './gap/gap_visual_layer';

export type SceneState = {
  world: WorldState;
  camera: ReturnType<typeof createCamera>;
  fogLayers: ReturnType<typeof createFogLayers>;
  time: number;
  effects: { blur: number };
};

export function createScene(uiState: UI_State, gapState?: GapState): SceneState {
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

  const scene = {
    world,
    camera,
    fogLayers: createFogLayers(fogIntensity),
    time: 0,
    effects: { blur: 0 },
  };

  if (gapState) {
    const gapVisual = buildGapVisualState(world, gapState);
    return applyGapOverlay(scene as any, gapVisual) as unknown as SceneState;
  }

  return scene;
}

export function updateScene(
  scene: SceneState,
  uiState: UI_State,
  deltaTime: number,
  gapState?: GapState
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

  const updatedScene = {
    world: {
      nodes: worldNodes,
      cameraFocusId: focusId,
      fogIntensity,
      timeOfDay: scene.world.timeOfDay,
    },
    camera,
    fogLayers: animateFogLayers(scene.fogLayers, deltaTime),
    time: scene.time + deltaTime,
    effects: scene.effects,
  };

  if (gapState) {
    const gapVisual = buildGapVisualState(updatedScene.world, gapState);
    return applyGapOverlay(updatedScene as any, gapVisual) as unknown as SceneState;
  }

  return updatedScene;
}

export function renderScene(scene: SceneState): RenderFrame {
  return renderWorld(scene.world, scene.camera, scene.time);
}
