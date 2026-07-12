import { registerWorldTheme } from '@/core/world/world_theme';

registerWorldTheme({
  professionId: 'data_analyst',
  worldName: 'The Insight Isles',
  startLabel: 'Resume Reef',
  endLabel: 'Offer Observatory',
  palette: {
    backgroundFrom: '#d4f1f4',
    backgroundTo: '#e8f5e9',
    primary: '#00e5e0',
    secondary: '#7c4dff',
    accent: '#ff6f00',
    glowRGB: '0, 229, 224',
    nodeCompleted: '#00e5e0',
    nodeCurrent: '#ff6f00',
    nodeLocked: '#b0bec5',
    success: '#3ecf8e',
    danger: '#ff6b6b',
  },
  geometry: {
    islandShape: 'organic',
    platformStyle: 'glass',
    pathStyle: 'cable',
  },
  chapterAccents: {
    resume: '#00e5e0',
    linkedin: '#7c4dff',
    applications: '#ff6f00',
    interviews: '#4fc3f7',
    offer_preparation: '#3ecf8e',
    offer: '#ff8a5c',
  },
  chapterBackgrounds: {
    resume: '#0d1f2d',
    linkedin: '#1a0f30',
    applications: '#2d1a0a',
    interviews: '#0f1a2d',
    offer_preparation: '#0f1f18',
    offer: '#1f1510',
  },
  celebration: {
    glowColor: 'rgba(0, 229, 224, 0.18)',
    gradientFrom: '#00e5e0',
    gradientTo: '#7c4dff',
    confettiColors: ['#00e5e0', '#7c4dff', '#ff6f00', '#3ecf8e'],
  },
});
