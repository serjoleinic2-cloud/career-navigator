import { CareerState } from '../core/state_engine/career_state';
import { mapCareerStateToZone, applyConfidenceToBrightness, applyReadinessToTerrain } from './world_zone_mapper';
import type { WorldNodeVisual, WorldState } from './visual_world_contract';

export type VisualWorldConfig = {
  careerState: CareerState;
  confidenceScore: number;
  readinessScore: number;
  nodes: WorldNodeVisual[];
};

export function buildVisualWorld(config: VisualWorldConfig): WorldState {
  const zoneMapping = mapCareerStateToZone(config.careerState);

  const brightness = applyConfidenceToBrightness(
    zoneMapping.brightness,
    config.confidenceScore
  );

  const terrainNodes = applyReadinessToTerrain(config.nodes, config.readinessScore);

  return {
    nodes: terrainNodes,
    connections: [],
    camera: { x: 0, y: 0, zoom: 1 },
    atmosphere: {
      timeOfDay: brightness > 0.75 ? 'day' : 'night',
      fogDensity: 1.0 - brightness,
    },
  };
}

export function getWorldZoneLabel(zone: string): string {
  const labels: Record<string, string> = {
    plains: 'Exploration Plains',
    foothills: 'Preparation Foothills',
    peaks: 'Career Peaks',
    summit: 'Readiness Summit',
  };
  return labels[zone] ?? 'Unknown Zone';
}

export function getZoneColor(zone: string): string {
  const colors: Record<string, string> = {
    plains: '#4a9eff',
    foothills: '#7cbd4a',
    peaks: '#ff9f4a',
    summit: '#ffd700',
  };
  return colors[zone] ?? '#888888';
}
