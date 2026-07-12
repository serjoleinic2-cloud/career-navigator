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
  interactionRadius: 48,
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
  zoom: chapter.landmarkType === 'SUMMIT' ? 0.85 : 1,
  easing: chapter.landmarkType === 'SUMMIT' ? 'cinematic' : 'easeOutCubic',
  ...(chapter.landmarkType === 'START'
    ? { cinematicOffset: { x: 0, y: -120 } }
    : {}),
}));

registerWorldLayout({
  professionId: 'data_analyst',
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
