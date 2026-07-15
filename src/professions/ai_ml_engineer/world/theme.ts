import { registerWorldTheme } from '@/core/world/world_theme';

registerWorldTheme({
  professionId: 'ai_ml_engineer',
  worldName: 'The Neural Frontier',
  startLabel: 'Data Gate',
  endLabel: 'Model Summit',
  palette: {
    backgroundFrom: '#0d1321', 
    backgroundTo: '#1b2a4a',
    primary: '#7c5cff',
    secondary: '#2a3f6b',
    accent: '#00e5c7',
    glowRGB: '124, 92, 255',
    nodeCompleted: '#7c5cff',
    nodeCurrent: '#00e5c7',
    nodeLocked: '#3d4566',
    success: '#00e5c7',
    danger: '#ff5c7c',
  },
  geometry: {
    islandShape: 'crystalline',
    platformStyle: 'circuit',
    pathStyle: 'bridge',
  },
  chapterAccents: {
    resume: '#7c5cff',
    linkedin: '#2a3f6b',
    applications: '#7c5cff',
    interview: '#00e5c7',
    offer: '#00e5c7',
  },
  chapterBackgrounds: {
    resume: '#140f1e',
    linkedin: '#0e1526',
    applications: '#140f1e',
    interview: '#0a1e1c',
    offer: '#0e1e1c',
  },
  celebration: {
    glowColor: 'rgba(124, 92, 255, 0.18)',
    gradientFrom: '#7c5cff',
    gradientTo: '#00e5c7',
    confettiColors: ['#7c5cff', '#00e5c7', '#2a3f6b', '#ff5c7c'],
  },
});
