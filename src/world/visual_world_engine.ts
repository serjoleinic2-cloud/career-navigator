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
    cameraFocusId: terrainNodes.find(n => n.isActive)?.id ?? terrainNodes[0]?.id ?? '',
    fogIntensity: 1.0 - brightness,
    timeOfDay: brightness > 0.75 ? 'dawn' : 'night',
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
