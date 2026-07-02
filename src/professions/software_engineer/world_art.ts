// src/professions/software_engineer/world_art.ts
//
// Registers this profession's WORLD ART PIPELINE config.
// No worldImageUrl yet — art has not been produced. WorldRenderer falls
// back to the WorldTheme gradient until this is filled in:
//
//   registerWorldArt({
//     professionId: 'software_engineer',
//     worldImageUrl: '/worlds/software_engineer/world.png',
//     worldImageSize: { width: 2048, height: 4096 },
//   });
//
import { registerWorldArt } from '@/core/world/world_art_contract';

registerWorldArt({
  professionId: 'software_engineer',
});
