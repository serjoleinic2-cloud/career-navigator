import { registerWorldTheme } from '@/core/world/world_theme';

registerWorldTheme({
  professionId: 'ai_ml_engineer',
  worldName: 'The Neural Nexus',
  startLabel: 'Resume Ridge',
  endLabel: 'Offer Observatory',
  palette: {
    backgroundFrom: '#1a0a2e',
    backgroundTo: '#16213e',
    primary: '#00d4ff',
    secondary: '#7b2cbf',
    accent: '#ff006e',
    glowRGB: '0, 212, 255',
    nodeCompleted: '#00d4ff',
    nodeCurrent: '#ff006e',
    nodeLocked: '#4a5568',
    success: '#00f5d4',
    danger: '#ef233c',
  },
  geometry: {
    islandShape: 'hexagonal',
    platformStyle: 'hologram',
    pathStyle: 'dataFlow',
  },
  chapterAccents: {
    resume: '#00d4ff',
    linkedin: '#7b2cbf',
    applications: '#ff006e',
    interviews: '#3a86ff',
    offer_preparation: '#00f5d4',
    offer: '#ff9f1c',
  },
  chapterBackgrounds: {
    resume: '#0d1b2a',
    linkedin: '#1a0b2e',
    applications: '#2d0a1a',
    interviews: '#0a1a2d',
    offer_preparation: '#0a2d1a',
    offer: '#2d1a0a',
  },
});