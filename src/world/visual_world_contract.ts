export type WorldNodeVisual = {
  id: string;
  x: number;
  y: number;
  chapterId: string;
  status: 'completed' | 'active' | 'locked';
  glowIntensity: number;
  scale: number;
  opacity: number;
  label: string;
};

export type WorldState = {
  nodes: WorldNodeVisual[];
  connections: Array<{ from: string; to: string }>;
  camera: {
    x: number;
    y: number;
    zoom: number;
  };
  atmosphere: {
    timeOfDay: string;
    fogDensity: number;
  };
};
