export type WorldTimeOfDay = 'dawn' | 'night';

export type WorldNodeVisual = {
  id: string;
  level: number;
  position3D: {
    x: number;
    y: number;
    z: number;
  };
  glowIntensity: number;
  isActive: boolean;
  isCompleted: boolean;
  isLocked: boolean;
};

export type WorldState = {
  nodes: WorldNodeVisual[];
  cameraFocusId: string;
  fogIntensity: number;
  timeOfDay: WorldTimeOfDay;
};
