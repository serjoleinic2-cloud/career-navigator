import type { WorldState } from '../visual_world_contract';
import type { CameraAnchor } from '../../core/world/world_layout';

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
  targetX: number;
  targetY: number;
  targetZoom: number;
}

const CAMERA_OFFSET_Y = 280; // Active node in lower 35% of screen (assuming ~800px height)
const SMOOTHING = 0.08;


export function createCamera(initialState: WorldState['camera']): CameraState {
  return {
    x: initialState.x,
    y: initialState.y,
    zoom: initialState.zoom,
    targetX: initialState.x,
    targetY: initialState.y,
    targetZoom: initialState.zoom,
  };
}

export function focusOnNode(camera: CameraState, nodeX: number, nodeY: number): CameraState {
  return {
    ...camera,
    targetX: nodeX,
    targetY: nodeY - CAMERA_OFFSET_Y,
  };
}

/**
 * TASK 2 — the preferred way to move the camera going forward: to a
 * predefined CameraAnchor, never to raw island coordinates. Artists can
 * compose a scene knowing exactly which anchor(s) will frame it.
 *
 * cinematicOffset (if present) is intentionally not auto-applied here —
 * callers decide whether this is a first-visit (cinematic) or repeat
 * (direct) arrival. See WORLD_LAYOUT_GUIDE.md.
 */
export function focusOnAnchor(camera: CameraState, anchor: CameraAnchor): CameraState {
  return {
    ...camera,
    targetX: anchor.x,
    targetY: anchor.y,
    targetZoom: anchor.zoom,
  };
}

export function updateCamera(camera: CameraState): CameraState {
  const dx = camera.targetX - camera.x;
  const dy = camera.targetY - camera.y;
  const dz = camera.targetZoom - camera.zoom;

  if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(dz) < 0.001) {
    return { ...camera, x: camera.targetX, y: camera.targetY, zoom: camera.targetZoom };
  }

  // easeOutCubic approximation
  const t = SMOOTHING;
  const ease = 1 - Math.pow(1 - t, 3);

  return {
    ...camera,
    x: camera.x + dx * ease,
    y: camera.y + dy * ease,
    zoom: camera.zoom + dz * ease,
  };
}

export function moveCameraUp(camera: CameraState, distance: number): CameraState {
  return {
    ...camera,
    targetY: camera.targetY - distance,
  };
}

export function clampCameraBounds(
  camera: CameraState,
  minY: number,
  maxY: number
): CameraState {
  return {
    ...camera,
    targetY: Math.max(minY, Math.min(maxY, camera.targetY)),
  };
}
