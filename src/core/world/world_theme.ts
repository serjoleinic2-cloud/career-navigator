export type WorldPalette = {
  backgroundFrom: string;
  backgroundTo: string;
  primary: string;
  secondary: string;
  accent: string;
  glowRGB: string;
  nodeCompleted: string;
  nodeCurrent: string;
  nodeLocked: string;
};

export type WorldGeometry = {
  islandShape: 'organic' | 'geometric' | 'crystalline' | 'fortress';
  platformStyle: 'stone' | 'glass' | 'circuit' | 'metal';
  pathStyle: 'bridge' | 'stairs' | 'beam' | 'cable';
};

export type WorldTheme = {
  professionId: string;
  worldName: string;
  startLabel: string;
  endLabel: string;
  palette: WorldPalette;
  geometry: WorldGeometry;
  chapterAccents: Record<string, string>;
  chapterBackgrounds: Record<string, string>;
};

const registry = new Map<string, WorldTheme>();

export function registerWorldTheme(theme: WorldTheme): void {
  registry.set(theme.professionId, theme);
}

export function getWorldTheme(professionId: string): WorldTheme | undefined {
  return registry.get(professionId);
}

export function getWorldThemeOrDefault(professionId: string): WorldTheme {
  return registry.get(professionId) ?? DEFAULT_WORLD_THEME;
}

export const DEFAULT_WORLD_THEME: WorldTheme = {
  professionId: 'default',
  worldName: 'Unknown World',
  startLabel: 'Starting Point',
  endLabel: 'The Offer',
  palette: {
    backgroundFrom: '#0a0a0f',
    backgroundTo: '#161625',
    primary: '#00e5e0',
    secondary: '#a855f7',
    accent: '#f59e0b',
    glowRGB: '0, 229, 224',
    nodeCompleted: '#00e5e0',
    nodeCurrent: '#f59e0b',
    nodeLocked: '#2a2a4a',
  },
  geometry: {
    islandShape: 'organic',
    platformStyle: 'stone',
    pathStyle: 'bridge',
  },
  chapterAccents: {
    resume: '#4A90D9',
    linkedin: '#7B68EE',
    applications: '#F6AD55',
    interview: '#4A5568',
    offer: '#48BB78',
  },
  chapterBackgrounds: {
    resume: '#0a1628',
    linkedin: '#1a0a2e',
    applications: '#2a1408',
    interview: '#0d1117',
    offer: '#0a1f14',
  },
};

export type { WorldRenderConfig } from './world_composer';

export function getChapterAccent(theme: WorldTheme, chapterId: string): string {
  return theme.chapterAccents[chapterId.toLowerCase()] ?? Object.values(theme.chapterAccents)[0];
}

export function getChapterBackground(theme: WorldTheme, chapterId: string): string {
  return theme.chapterBackgrounds[chapterId.toLowerCase()] ?? Object.values(theme.chapterBackgrounds)[0];
}
