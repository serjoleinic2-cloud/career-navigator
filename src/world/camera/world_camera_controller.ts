import type { WorldState } from '../visual_world_contract';

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
  targetX: number;
  targetY: number;
}

const CAMERA_OFFSET_Y = 200; // Active node in lower third
const SMOOTHING = 0.1;

export function createCamera(initialState: WorldState['camera']): CameraState {
  return {
    x: initialState.x,
    y: initialState.y,
    zoom: initialState.zoom,
    targetX: initialState.x,
    targetY: initialState.y,
  };
}

export function focusOnNode(camera: CameraState, nodeX: number, nodeY: number): CameraState {
  return {
    ...camera,
    targetX: nodeX,
    targetY: nodeY - CAMERA_OFFSET_Y,
  };
}

export function updateCamera(camera: CameraState): CameraState {
  const dx = camera.targetX - camera.x;
  const dy = camera.targetY - camera.y;
  
  if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
    return { ...camera, x: camera.targetX, y: camera.targetY };
  }

  return {
    ...camera,
    x: camera.x + dx * SMOOTHING,
    y: camera.y + dy * SMOOTHING,
  };
}

export function moveCameraUp(camera: CameraState, distance: number): CameraState {
  return {
    ...camera,
    targetY: camera.targetY - distance,
  };
}
