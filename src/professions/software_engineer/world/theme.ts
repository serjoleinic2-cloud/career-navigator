import { registerWorldTheme } from '@/core/world/world_theme';

registerWorldTheme({
  professionId: 'software_engineer',
  worldName: 'The Code Archipelago',
  startLabel: 'Hello, World! Island',
  endLabel: 'Offer City',
  palette: {
    backgroundFrom: '#dbe7f5',
    backgroundTo: '#f3ead8',
    primary: '#4f8cff',
    secondary: '#f5b25c',
    accent: '#ff8a5c',
    glowRGB: '79, 140, 255',
    nodeCompleted: '#4f8cff',
    nodeCurrent: '#ff8a5c',
    nodeLocked: '#c9d3e0',
    success: '#3ecf8e',
    danger: '#ff6b6b',
  },
  geometry: {
    islandShape: 'geometric',
    platformStyle: 'circuit',
    pathStyle: 'bridge',
  },
  chapterAccents: {
    resume: '#4f8cff',
    linkedin: '#7b68ee',
    applications: '#f5b25c',
    interviews: '#5b6b82',
    offer_preparation: '#e07a5f',
    offer: '#3ecf8e',
  },
  chapterBackgrounds: {
    resume: '#101a2c',
    linkedin: '#1a1430',
    applications: '#2a2013',
    interviews: '#12161d',
    offer_preparation: '#241610',
    offer: '#0f1f18',
  },
  celebration: {
    glowColor: 'rgba(255, 138, 92, 0.18)',
    gradientFrom: '#4f8cff',
    gradientTo: '#ff8a5c',
    confettiColors: ['#4f8cff', '#f5b25c', '#ff8a5c', '#3ecf8e'],
  },
});
