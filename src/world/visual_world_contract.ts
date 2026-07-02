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

/** Preferred going forward — see WORLD ART PIPELINE terminology in
 *  core/world/world_art_contract.ts. Node -> Island. */
export type IslandVisual = WorldNodeVisual;

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

/** Preferred going forward — Edge -> Bridge. */
export type BridgeConnection = WorldState['connections'][number];
