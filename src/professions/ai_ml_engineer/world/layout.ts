import { registerWorldLayout } from '@/core/world/world_layout';

registerWorldLayout({
  professionId: 'ai_ml_engineer',
  islandSpacing: 180,
  pathCurvature: 0.4,
  verticalDistribution: 'staggered',
  chapterClusters: {
    resume: { x: 0.1, y: 0.2, radius: 60 },
    linkedin: { x: 0.3, y: 0.15, radius: 65 },
    applications: { x: 0.5, y: 0.25, radius: 70 },
    interviews: { x: 0.7, y: 0.2, radius: 80 },
    offer_preparation: { x: 0.85, y: 0.3, radius: 55 },
    offer: { x: 0.95, y: 0.2, radius: 50 },
  },
});