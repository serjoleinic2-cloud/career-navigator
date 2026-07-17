import { registerWorldTheme } from '@/core/world/world_theme';

registerWorldTheme({
  professionId: 'product_manager',
  worldName: 'The Product Archipelago',
  startLabel: 'Resume Reef',
  endLabel: 'Offer Summit',
  palette: {
    backgroundFrom: '#1a0f2e',
    backgroundTo: '#0d1f3c',
    primary: '#7c3aed',
    secondary: '#f59e0b',
    accent: '#10b981',
    glowRGB: '124, 58, 237',
    nodeCompleted: '#7c3aed',
    nodeCurrent: '#f59e0b',
    nodeLocked: '#374151',
    success: '#10b981',
    danger: '#ef4444',
  },
  geometry: {
    islandShape: 'crystalline',
    platformStyle: 'glass',
    pathStyle: 'bridge',
  },
  chapterAccents: {
    resume: '#7c3aed',
    linkedin: '#3b82f6',
    applications: '#f59e0b',
    interviews: '#10b981',
    offer_preparation: '#ec4899',
    offer: '#f97316',
  },
  chapterBackgrounds: {
    resume: '#0f0a1e',
    linkedin: '#0a1020',
    applications: '#1a1200',
    interviews: '#041a10',
    offer_preparation: '#1a0510',
    offer: '#1a0a00',
  },
  celebration: {
    glowColor: 'rgba(124, 58, 237, 0.2)',
    gradientFrom: '#7c3aed',
    gradientTo: '#f59e0b',
    confettiColors: ['#7c3aed', '#f59e0b', '#10b981', '#3b82f6'],
  },
});
