import { registerWorldTheme } from '@/core/world/world_theme';

registerWorldTheme({
  professionId: 'data_analyst',
  worldName: 'The Insight Archipelago',
  startLabel: 'Raw Data Shore',
  endLabel: 'Dashboard Summit',
  palette: {
    backgroundFrom: '#dcebe8',
    backgroundTo: '#f2ecd8',
    primary: '#2fb8a6',
    secondary: '#f0b429',
    accent: '#7c5cff',
    glowRGB: '47, 184, 166',
    nodeCompleted: '#2fb8a6',
    nodeCurrent: '#f0b429',
    nodeLocked: '#c7d3d0',
    success: '#3ecf8e',
    danger: '#ff6b6b',
  },
  geometry: {
    islandShape: 'geometric',
    platformStyle: 'circuit',
    pathStyle: 'bridge',
  },
  chapterAccents: {
    resume: '#2fb8a6',
    linkedin: '#7c5cff',
    applications: '#f0b429',
    interview: '#5b6b82',
    offer: '#3ecf8e',
  },
  chapterBackgrounds: {
    resume: '#0f1f1c',
    linkedin: '#181430',
    applications: '#2a2410',
    interview: '#12161d',
    offer: '#0f1f18',
  },
  celebration: {
    glowColor: 'rgba(124, 92, 255, 0.18)',
    gradientFrom: '#2fb8a6',
    gradientTo: '#7c5cff',
    confettiColors: ['#2fb8a6', '#f0b429', '#7c5cff', '#3ecf8e'],
  },
});
