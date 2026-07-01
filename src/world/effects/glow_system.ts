import type { WorldNodeVisual } from '../visual_world_contract';

export type GlowState = {
  baseIntensity: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
};

const GLOW_CONFIG: Record<string, GlowState> = {
  active: {
    baseIntensity: 1.0,
    pulsePhase: 0,
    pulseSpeed: 2.0,
    color: '#7c5cff',
  },
  completed: {
    baseIntensity: 0.6,
    pulsePhase: 0,
    pulseSpeed: 0,
    color: '#4ade80',
  },
  locked: {
    baseIntensity: 0.15,
    pulsePhase: 0,
    pulseSpeed: 0,
    color: '#94a3b8',
  },
};

export function calculateGlow(
  node: WorldNodeVisual,
  time: number
): number {
  const config = node.status === 'active' ? GLOW_CONFIG.active
    : node.status === 'completed' ? GLOW_CONFIG.completed
    : GLOW_CONFIG.locked;

  if (config.pulseSpeed === 0) return config.baseIntensity;

  const pulse = Math.sin(time * config.pulseSpeed + config.pulsePhase);
  return config.baseIntensity + pulse * 0.15;
}

export function getGlowColor(node: WorldNodeVisual): string {
  return node.status === 'active' ? GLOW_CONFIG.active.color
    : node.status === 'completed' ? GLOW_CONFIG.completed.color
    : GLOW_CONFIG.locked.color;
}
