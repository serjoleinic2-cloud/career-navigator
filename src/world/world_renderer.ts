import type { WorldState } from './visual_world_contract';
import { calculateGlow, getGlowColor } from './effects/glow_system';
import { getCameraTransform, type CameraState } from './camera/world_camera_controller';

export type RenderFrame = {
  nodes: RenderedNode[];
  cameraTransform: string;
  fogIntensity: number;
  timeOfDay: string;
};

export type RenderedNode = {
  id: string;
  transform: string;
  glow: number;
  glowColor: string;
  size: number;
  opacity: number;
};

export function renderWorld(
  worldState: WorldState,
  camera: CameraState,
  time: number
): RenderFrame {
  const nodes: RenderedNode[] = worldState.nodes.map(node => {
    const glow = calculateGlow(node, time);
    const glowColor = getGlowColor(node);

    const isoX = node.position3D.x - node.position3D.z;
    const isoY = node.position3D.y + (node.position3D.x + node.position3D.z) * 0.5;

    return {
      id: node.id,
      transform: `translate(${isoX}px, ${isoY}px)`,
      glow,
      glowColor,
      size: node.isActive ? 24 : node.isCompleted ? 18 : 14,
      opacity: node.isLocked ? 0.4 : 1,
    };
  });

  return {
    nodes,
    cameraTransform: getCameraTransform(camera),
    fogIntensity: worldState.fogIntensity,
    timeOfDay: worldState.timeOfDay,
  };
}
