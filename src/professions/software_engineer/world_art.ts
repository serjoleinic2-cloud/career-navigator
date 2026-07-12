// src/professions/software_engineer/world_art.ts
//
// BACKGROUND IMAGE — where to place the file:
//   public/art/software_engineer/journey.jpg
//
// WorldRenderer loads it as the full-bleed background of the Journey tab.
// Recommended size: 1080×2340px (full-screen portrait, any aspect works).
// Until the file is placed, WorldRenderer falls back to the theme gradient
// (light sky blue → warm cream, defined in world.ts — your art replaces it).
//
import { registerWorldArt } from '@/core/world/world_art_contract';

registerWorldArt({
  professionId: 'software_engineer',
  worldImageUrl: '/art/software_engineer/journey.jpg',
});
