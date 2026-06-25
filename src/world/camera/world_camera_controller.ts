import type { WorldNodeVisual } from '../visual_world_contract';

export type CameraState = {
  targetX: number;
  targetY: number;
  targetZ: number;
  currentX: number;
  currentY: number;
  currentZ: number;
  zoom: number;
};

export function createCamera(): CameraState {
  return {
    targetX: 0,
    targetY: 0,
    targetZ: 100,
    currentX: 0,
    currentY: -200,
    currentZ: 100,
    zoom: 1,
  };
}

export function focusOnNode(
  camera: CameraState,
  node: WorldNodeVisual
): CameraState {
  return {
    ...camera,
    targetX: node.position3D.x,
    targetY: node.position3D.y - 50,
    targetZ: node.position3D.z + 150,
  };
}

export function updateCamera(
  camera: CameraState,
  _deltaTime: number,
  smoothness: number = 0.05,
  noiseLevel: number = 0
): CameraState {
  let updated = {
    ...camera,
    currentX: camera.currentX + (camera.targetX - camera.currentX) * smoothness,
    currentY: camera.currentY + (camera.targetY - camera.currentY) * smoothness,
    currentZ: camera.currentZ + (camera.targetZ - camera.currentZ) * smoothness,
  };

  if (noiseLevel > 0) {
    updated = applyCameraNoise(updated, noiseLevel);
  }

  return updated;
}

export function applyCameraNoise(
  camera: CameraState,
  noiseLevel: number
): CameraState {
  if (noiseLevel <= 0) return camera;

  const jitterX = (Math.random() - 0.5) * 2 * noiseLevel;
  const jitterY = (Math.random() - 0.5) * 2 * noiseLevel;

  return {
    ...camera,
    currentX: camera.currentX + jitterX,
    currentY: camera.currentY + jitterY,
  };
}

export function getCameraTransform(camera: CameraState): string {
  return `translate3d(${-camera.currentX}px, ${-camera.currentY}px, ${-camera.currentZ}px) scale(${camera.zoom})`;
}
