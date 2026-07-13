// src/professions/data_analyst/world/art.ts
//
// BACKGROUND IMAGE — where to place the file:
//   public/art/data_analyst/journey.jpg
//
// WorldRenderer loads it as the full-bleed background of the Journey tab.
// Recommended size: 1080x2340px (full-screen portrait), JPEG at quality
// ~80 (see PROJECT_STATUS.md 2026-07-12 entry on why: keeps file size
// under ~250KB without visible quality loss).
// Until the file is placed, WorldRenderer falls back to the theme
// gradient defined in ./theme.ts.
import { registerWorldArt } from '@/core/world/world_art_contract';

registerWorldArt({
  professionId: 'data_analyst',
  worldImageUrl: '/art/data_analyst/journey.jpg',
  worldImageSize: { width: 1080, height: 2340 },
});
