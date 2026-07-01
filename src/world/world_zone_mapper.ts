import { CareerState } from '../core/state_engine/career_state';
import type { WorldNodeVisual } from './visual_world_contract';

export type WorldZone = 'plains' | 'foothills' | 'peaks' | 'summit';

export type ZoneMapping = {
  zone: WorldZone;
  brightness: number;
  terrainUnlocked: boolean;
};

export function mapCareerStateToZone(state: CareerState): ZoneMapping {
  switch (state) {
    case CareerState.UNKNOWN:
    case CareerState.EXPLORING:
      return { zone: 'plains', brightness: 0.6, terrainUnlocked: true };
    case CareerState.PREPARING:
      return { zone: 'foothills', brightness: 0.7, terrainUnlocked: false };
    case CareerState.APPLYING:
      return { zone: 'foothills', brightness: 0.8, terrainUnlocked: true };
    case CareerState.INTERVIEWING:
      return { zone: 'peaks', brightness: 0.9, terrainUnlocked: false };
    case CareerState.NEGOTIATING:
      return { zone: 'peaks', brightness: 1.0, terrainUnlocked: true };
    case CareerState.READY:
      return { zone: 'summit', brightness: 1.0, terrainUnlocked: true };
  }
}

export function mapChapterToRegion(chapterTitle: string): string {
  const regionMap: Record<string, string> = {
    'Resume': 'skill-lab',
    'LinkedIn': 'training-ground',
    'Applications': 'startup-office',
    'Interview Prep': 'practice-field',
    'Interview Practice': 'dev-studio',
    'Offer Prep': 'milestone-gate',
  };
  return regionMap[chapterTitle] ?? 'unknown';
}

export function applyConfidenceToBrightness(
  baseBrightness: number,
  confidenceScore: number
): number {
  const shift = (confidenceScore - 50) / 100;
  return Math.max(0.3, Math.min(1.0, baseBrightness + shift * 0.3));
}

export function applyReadinessToTerrain(
  nodes: WorldNodeVisual[],
  readinessScore: number
): WorldNodeVisual[] {
  return nodes.map(node => ({
    ...node,
    status: readinessScore < 30 && node.status === 'active' ? 'locked' : node.status,
  }));
}
