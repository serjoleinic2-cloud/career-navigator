import { registerWorldTheme } from '@/core/world/world_theme';

registerWorldTheme({
  professionId: 'software_engineer',
  worldName: 'The Code Archipelago',
  startLabel: 'Hello, World! Island',
  endLabel: 'Offer City',
  palette: {
    // светлое, воздушное небо мира (не UI!)
    backgroundFrom: '#dbe7f5', // мягкий утренний голубой
    backgroundTo: '#f3ead8',   // тёплый песочно-кремовый горизонт
    primary: '#4f8cff',        // основной акцент островов — мягкий синий
    secondary: '#f5b25c',      // тёплый янтарный — солнце/акценты
    accent: '#ff8a5c',         // коралловый — текущий узел, самый заметный
    glowRGB: '79, 140, 255',
    nodeCompleted: '#4f8cff',
    nodeCurrent: '#ff8a5c',
    nodeLocked: '#c9d3e0',
  },
  geometry: {
    islandShape: 'geometric',
    platformStyle: 'circuit',
    pathStyle: 'bridge',
  },
});
