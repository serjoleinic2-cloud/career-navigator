import type { WorldState } from '../visual_world_contract';

export type GapVisualState = {
  blurIntensity: number;
  nodeFlickerMap: Record<string, number>;
  pathDimmingMap: Record<string, number>;
  cameraNoise: number;
  zoneStability: number;
};

export type GapState = {
  delta: number;
  userPerception: number;
  systemReadiness: number;
};

export function buildGapVisualState(
  world: WorldState,
  gap: GapState
): GapVisualState {
  const intensity = Math.min(Math.abs(gap.delta) * 0.1, 1);

  const nodeFlickerMap: Record<string, number> = {};
  for (const node of world.nodes) {
    nodeFlickerMap[node.id] = node.status === 'locked' ? intensity : intensity * 0.5;
  }

  return {
    blurIntensity: intensity,
    cameraNoise: intensity * 0.3,
    zoneStability: 1 - intensity,
    nodeFlickerMap,
    pathDimmingMap: {},
  };
}

export function applyGapOverlay(
  scene: {
    nodes: Array<{
      id: string;
      opacity: number;
      glow: number;
      [key: string]: unknown;
    }>;
    paths: Array<{
      id?: string;
      from?: string;
      to?: string;
      opacity: number;
      [key: string]: unknown;
    }>;
    camera: {
      noise: number;
      [key: string]: unknown;
    };
    effects: {
      blur: number;
      [key: string]: unknown;
    };
  },
  gap: GapVisualState
): typeof scene {
  return {
    ...scene,
    nodes: scene.nodes.map(n => ({
      ...n,
      opacity: Math.max(0, n.opacity - (gap.nodeFlickerMap[n.id] ?? 0)),
      glow: n.glow * (1 - (gap.nodeFlickerMap[n.id] ?? 0)),
    })),
    paths: scene.paths.map(p => {
      const pathKey = p.id ?? `${p.from}->${p.to}`;
      return {
        ...p,
        opacity: Math.max(0, p.opacity - (gap.pathDimmingMap[pathKey] ?? 0)),
      };
    }),
    camera: {
      ...scene.camera,
      noise: gap.cameraNoise,
    },
    effects: {
      ...scene.effects,
      blur: gap.blurIntensity,
    },
  };
}
