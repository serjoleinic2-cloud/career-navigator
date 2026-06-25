export type { WorldNodeVisual, WorldState, WorldTimeOfDay } from './visual_world_contract';

export { buildWorldFromUI, getCameraFocusId, getFogIntensity } from './world_builder';

export type { JourneyNode, JourneyNodeType, JourneyNodeState } from './journey_node';
export { createJourneyNode } from './journey_node';

export type { WorldZone, ZoneMapping } from './world_zone_mapper';
export { mapCareerStateToZone, mapChapterToRegion, applyConfidenceToBrightness, applyReadinessToTerrain } from './world_zone_mapper';

export type { VisualWorldConfig } from './visual_world_engine';
export { buildVisualWorld, getWorldZoneLabel, getZoneColor } from './visual_world_engine';

export { createFogLayers, animateFogLayers } from './effects/fog_system';
export type { FogLayer } from './effects/fog_system';

export { calculateGlow, getGlowColor } from './effects/glow_system';
export type { GlowState } from './effects/glow_system';

export {
  createCamera,
  focusOnNode,
  updateCamera,
  getCameraTransform,
} from './camera/world_camera_controller';
export type { CameraState } from './camera/world_camera_controller';

export { renderWorld } from './world_renderer';
export type { RenderFrame, RenderedNode } from './world_renderer';

export { createScene, updateScene, renderScene } from './world_scene';
export type { SceneState } from './world_scene';

export type { GapVisualState, GapState } from './gap/gap_visual_layer';
export { buildGapVisualState, applyGapOverlay } from './gap/gap_visual_layer';
