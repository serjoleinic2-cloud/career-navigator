// src/professions/software_engineer/world_layout.ts
//
// Concrete WorldLayout for "The Code Archipelago" — one island per chapter,
// stacked vertically (matches the existing world_builder.ts spacing),
// with a camera anchor per island. This is placeholder positioning for
// the layout SYSTEM to have something real to run against; the actual
// composition (exact x/y, bridge shapes, cinematic offsets) is expected
// to change once concept art exists — see WORLD_LAYOUT_GUIDE.md.
import { registerWorldLayout } from '@/core/world/world_layout';
import type { IslandLayout, BridgeLayout, CameraAnchor } from '@/core/world/world_layout';

const CHAPTER_SPACING = 180;

const CHAPTER_ORDER: Array<{ id: string; landmarkType: IslandLayout['landmarkType'] }> = [
  { id: 'resume', landmarkType: 'START' },
  { id: 'linkedin', landmarkType: 'ISLAND' },
  { id: 'applications', landmarkType: 'GATE' },
  { id: 'interviews', landmarkType: 'TEMPLE' },
  { id: 'offer_preparation', landmarkType: 'LIBRARY' },
  { id: 'offer', landmarkType: 'SUMMIT' },
];

const islands: IslandLayout[] = CHAPTER_ORDER.map((chapter, i) => ({
  id: `${chapter.id}-island`,
  x: 0,
  y: i * CHAPTER_SPACING,
  zIndex: i,
  visualRadius: chapter.landmarkType === 'SUMMIT' ? 40 : 30,
  interactionRadius: 48, // comfortable tap target regardless of visual size
  chapterId: chapter.id,
  landmarkType: chapter.landmarkType,
  cameraAnchorId: `${chapter.id}-anchor`,
}));

const bridges: BridgeLayout[] = CHAPTER_ORDER.slice(1).map((chapter, i) => ({
  from: `${CHAPTER_ORDER[i].id}-island`,
  to: `${chapter.id}-island`,
  bridgeType: 'stone',
  animationProfile: 'growIn',
}));

const anchors: CameraAnchor[] = CHAPTER_ORDER.map((chapter, i) => ({
  id: `${chapter.id}-anchor`,
  x: 0,
  y: i * CHAPTER_SPACING,
  // Pull back slightly at the final landmark to reveal the summit's scale.
  zoom: chapter.landmarkType === 'SUMMIT' ? 0.85 : 1,
  easing: chapter.landmarkType === 'SUMMIT' ? 'cinematic' : 'easeOutCubic',
  ...(chapter.landmarkType === 'START'
    ? { cinematicOffset: { x: 0, y: -120 } } // slow pan down into the world on first arrival
    : {}),
}));

registerWorldLayout({
  professionId: 'software_engineer',
  bounds: {
    minX: -300,
    maxX: 300,
    minY: -150,
    maxY: (CHAPTER_ORDER.length - 1) * CHAPTER_SPACING + 200,
  },
  islands,
  bridges,
  anchors,
});
