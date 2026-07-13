import { registerWorldTheme } from '@/core/world/world_theme';

registerWorldTheme({
  professionId: 'cybersecurity',
  worldName: 'The Security Fortress',
  startLabel: 'Guardian Gate',
  endLabel: 'Defender Citadel',
  palette: {
    backgroundFrom: '#1a1a2e',
    backgroundTo: '#16213e',
    primary: '#e94560',
    secondary: '#0f3460',
    accent: '#e94560',
    glowRGB: '233, 69, 96',
    nodeCompleted: '#e94560',
    nodeCurrent: '#ff6b6b',
    nodeLocked: '#4a4a6a',
    success: '#00d9ff',
    danger: '#e94560',
  },
  geometry: {
    islandShape: 'fortress',
    platformStyle: 'circuit',
    pathStyle: 'bridge',
  },
  chapterAccents: {
    resume: '#e94560',
    linkedin: '#0f3460',
    applications: '#e94560',
    interview: '#00d9ff',
    offer: '#00d9ff',
  },
  chapterBackgrounds: {
    resume: '#1a0a0e',
    linkedin: '#0a0f1a',
    applications: '#1a0a0e',
    interview: '#0a1a1e',
    offer: '#0a1e1a',
  },
  celebration: {
    glowColor: 'rgba(233, 69, 96, 0.18)',
    gradientFrom: '#e94560',
    gradientTo: '#00d9ff',
    confettiColors: ['#e94560', '#00d9ff', '#0f3460', '#ff6b6b'],
  },
});