export type FogLayer = {
  opacity: number;
  color: string;
  offsetY: number;
  speed: number;
};

export function createFogLayers(intensity: number): FogLayer[] {
  return [
    {
      opacity: 0.08 * intensity,
      color: 'rgba(180, 200, 255, 0.3)',
      offsetY: 0,
      speed: 0.2,
    },
    {
      opacity: 0.05 * intensity,
      color: 'rgba(140, 160, 220, 0.2)',
      offsetY: 100,
      speed: 0.15,
    },
    {
      opacity: 0.03 * intensity,
      color: 'rgba(100, 120, 180, 0.15)',
      offsetY: 250,
      speed: 0.1,
    },
  ];
}

export function animateFogLayers(
  layers: FogLayer[],
  deltaTime: number
): FogLayer[] {
  return layers.map(layer => ({
    ...layer,
    offsetY: (layer.offsetY + layer.speed * deltaTime) % 500,
  }));
}
