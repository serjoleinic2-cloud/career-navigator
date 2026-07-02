/**
 * WORLD ART PIPELINE v1.0
 *
 * Terminology (use these going forward, not the old graph vocabulary):
 *   Node      -> Island
 *   Edge      -> Bridge
 *   Chapter   -> Landmark
 *   Mission   -> Place
 *   Completed -> Restored
 *   Locked    -> Hidden
 *
 * WorldRenderer is a composition engine, not a drawing engine. It composites:
 *   1. WorldImage layer  — the artist-created world (Monument Valley style).
 *      Single image today; a tiled/multi-image world later. Falls back to
 *      the WorldTheme gradient when no art exists yet for a profession.
 *   2. Island overlay     — interactive hit-areas placed on top of the art,
 *      positioned by metadata only (x, y, radius). Never draws architecture.
 *   3. Bridge overlay      — connections between islands, positioned by
 *      metadata only.
 *   4. Camera layer        — pans/zooms through the art's coordinate space.
 *      It explores the world, it does not create it.
 *   5. Particle layer       — ambient atmosphere (always on, not debug-only).
 *   6. HUD layer            — JourneyHUD, entirely separate, mounted above.
 *
 * Debug vs Production:
 *   'debug'      — circles/lines/coordinates visible, for development.
 *   'production' — only the art + particles are visible; islands/bridges
 *                  render as invisible hit-areas only.
 */

export type WorldArtConfig = {
  professionId: string;
  /** Artist-created background art. Undefined = no art yet, renderer falls
   *  back to the WorldTheme gradient (current placeholder state). */
  worldImageUrl?: string;
  /** Natural size of worldImageUrl, used to map island (x, y) metadata
   *  onto the image's own coordinate space. Required once worldImageUrl
   *  is set. */
  worldImageSize?: { width: number; height: number };
};

const registry = new Map<string, WorldArtConfig>();

export function registerWorldArt(config: WorldArtConfig): void {
  registry.set(config.professionId, config);
}

export function getWorldArt(professionId: string): WorldArtConfig | undefined {
  return registry.get(professionId);
}

export function getWorldArtOrDefault(professionId: string): WorldArtConfig {
  return registry.get(professionId) ?? { professionId };
}
