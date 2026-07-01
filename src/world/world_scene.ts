import { buildWorldStateFromRuntime } from './world_builder';
import { createCamera, focusOnNode, updateCamera } from './camera/world_camera_controller';
import { createFogLayers, animateFogLayers } from './effects/fog_system';
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

export function createScene(runtimeState: Parameters<typeof buildWorldStateFromRuntime>[0], gapState?: GapState): SceneState {
  const world = buildWorldStateFromRuntime(runtimeState);
  const activeNode = world.nodes.find(n => n.status === 'active');
  let camera = createCamera(world.camera);
  if (activeNode) {
    camera = focusOnNode(camera, activeNode.x, activeNode.y);
  }

  const scene = {
    world,
    camera,
    fogLayers: createFogLayers(world.atmosphere.fogDensity),
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
  runtimeState: Parameters<typeof buildWorldStateFromRuntime>[0],
  deltaTime: number,
  gapState?: GapState
): SceneState {
  const world = buildWorldStateFromRuntime(runtimeState);
  const activeNode = world.nodes.find(n => n.status === 'active');
  let camera = scene.camera;
  if (activeNode) {
    camera = focusOnNode(camera, activeNode.x, activeNode.y);
  }
  camera = updateCamera(camera);

  const updatedScene = {
    world,
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

export function renderScene(scene: SceneState): { nodes: any[]; cameraTransform: string } {
  return {
    nodes: scene.world.nodes,
    cameraTransform: `translate(${-scene.camera.x}px, ${-scene.camera.y}px)`,
  };
}
