/**
 * WORLD LAYOUT SYSTEM v1.0
 *
 * Defines the spatial language that artist-created worlds are navigated
 * through. This module is metadata only — it draws nothing. See
 * WORLD_LAYOUT_GUIDE.md for how artists, programmers, and the camera
 * each use this contract.
 *
 * Terminology follows the WORLD ART PIPELINE map (see
 * core/world/world_art_contract.ts): Node -> Island, Edge -> Bridge,
 * Chapter -> Landmark grouping, Mission -> Place.
 */

// ---------------------------------------------------------------------
// TASK 3 — Landmark Types (semantic, not generic "node")
// ---------------------------------------------------------------------
export type LandmarkType =
  | 'START'
  | 'ISLAND'
  | 'GATE'
  | 'TEMPLE'
  | 'TOWER'
  | 'LIBRARY'
  | 'PORTAL'
  | 'SUMMIT';

// ---------------------------------------------------------------------
// TASK 1 — Islands
// ---------------------------------------------------------------------
export type IslandLayout = {
  id: string;
  x: number;
  y: number;
  /** Paint/stacking order when multiple islands overlap in the art. */
  zIndex: number;
  /** Radius used for the debug-mode visual placeholder. */
  visualRadius: number;
  /** Radius used for tap/click hit-detection — independent of visualRadius
   *  so a small painted island can still have a comfortable tap target. */
  interactionRadius: number;
  chapterId: string;
  landmarkType: LandmarkType;
  /** TASK 5 — every landmark names its preferred camera anchor. The
   *  camera is never told raw coordinates for an island directly. */
  cameraAnchorId: string;
};

// ---------------------------------------------------------------------
// TASK 1 — Bridges
// ---------------------------------------------------------------------
export type BridgeType = 'stone' | 'rope' | 'light' | 'crystal';

export type BridgeAnimationProfile =
  /** Bridge grows into place as the previous landmark is restored. */
  | 'growIn'
  /** Bridge is already physically present but dark until restored. */
  | 'illuminate'
  /** Static, no animation (e.g. permanently open starting bridge). */
  | 'none';

export type BridgeLayout = {
  from: string; // IslandLayout id
  to: string; // IslandLayout id
  bridgeType: BridgeType;
  animationProfile: BridgeAnimationProfile;
};

// ---------------------------------------------------------------------
// TASK 2 + 5 — Camera Anchors & Safe Zones
// ---------------------------------------------------------------------
export type CameraEasing = 'linear' | 'easeInOut' | 'easeOutCubic' | 'cinematic';

export type CameraAnchor = {
  id: string;
  x: number;
  y: number;
  zoom: number;
  easing: CameraEasing;
  /** TASK 5 — optional one-time offset applied only the first time the
   *  camera arrives at this anchor (e.g. a slow cinematic pan-in before
   *  settling at x/y/zoom). Not applied on repeat visits. */
  cinematicOffset?: { x: number; y: number };
};

// ---------------------------------------------------------------------
// TASK 4 — World Bounds
// ---------------------------------------------------------------------
export type WorldBounds = {
  minX: number;
  maxX: number;
  /** minY / maxY support worlds much taller than the screen — the
   *  camera clamps to these so it can never expose empty space beyond
   *  the painted art. */
  minY: number;
  maxY: number;
};

// ---------------------------------------------------------------------
// Full world layout, one per profession
// ---------------------------------------------------------------------
export type WorldLayout = {
  professionId: string;
  bounds: WorldBounds;
  islands: IslandLayout[];
  bridges: BridgeLayout[];
  anchors: CameraAnchor[];
};

const registry = new Map<string, WorldLayout>();

export function registerWorldLayout(layout: WorldLayout): void {
  registry.set(layout.professionId, layout);
}

export function getWorldLayout(professionId: string): WorldLayout | undefined {
  return registry.get(professionId);
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

/** Resolve an island's preferred camera anchor. This is the ONLY way
 *  the camera should be told where to go for a given island — never
 *  its raw x/y (TASK 2: camera moves between predefined anchors only). */
export function getAnchorForIsland(
  layout: WorldLayout,
  islandId: string
): CameraAnchor | undefined {
  const island = layout.islands.find(i => i.id === islandId);
  if (!island) return undefined;
  return layout.anchors.find(a => a.id === island.cameraAnchorId);
}

export function getIslandsForChapter(layout: WorldLayout, chapterId: string): IslandLayout[] {
  return layout.islands.filter(i => i.chapterId === chapterId);
}

export function getBridgesForIsland(layout: WorldLayout, islandId: string): BridgeLayout[] {
  return layout.bridges.filter(b => b.from === islandId || b.to === islandId);
}

/** Clamps a target camera position to the world's bounds (TASK 4). */
export function clampToWorldBounds(
  x: number,
  y: number,
  bounds: WorldBounds
): { x: number; y: number } {
  return {
    x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
    y: Math.max(bounds.minY, Math.min(bounds.maxY, y)),
  };
}
