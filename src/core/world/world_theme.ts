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
  success: string;
  danger: string;
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
  celebration: {
    glowColor: string;
    gradientFrom: string;
    gradientTo: string;
    confettiColors: string[];
  };
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
    success: '#48BB78',
    danger: '#FF6B6B',
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
  celebration: {
    glowColor: 'rgba(0, 229, 224, 0.15)',
    gradientFrom: '#00e5e0',
    gradientTo: '#a855f7',
    confettiColors: ['#00e5e0', '#a855f7', '#f59e0b', '#48BB78'],
  },
};

export function getChapterAccent(theme: WorldTheme, chapterId: string): string {
  return theme.chapterAccents[chapterId.toLowerCase()] ?? Object.values(theme.chapterAccents)[0];
}

export function getChapterBackground(theme: WorldTheme, chapterId: string): string {
  return theme.chapterBackgrounds[chapterId.toLowerCase()] ?? Object.values(theme.chapterBackgrounds)[0];
}

export function getWorldCssVars(theme: WorldTheme, chapterId?: string): Record<string, string> {
  const chapterAccent = chapterId
    ? (theme.chapterAccents[chapterId.toLowerCase()] ?? theme.palette.primary)
    : theme.palette.primary;
  const chapterBg = chapterId
    ? (theme.chapterBackgrounds[chapterId.toLowerCase()] ?? theme.palette.backgroundTo)
    : theme.palette.backgroundTo;

  return {
    '--w-bg-from': theme.palette.backgroundFrom,
    '--w-bg-to': theme.palette.backgroundTo,
    '--w-primary': theme.palette.primary,
    '--w-secondary': theme.palette.secondary,
    '--w-accent': theme.palette.accent,
    '--w-success': theme.palette.success,
    '--w-danger': theme.palette.danger,
    '--w-glow-rgb': theme.palette.glowRGB,
    '--w-chapter-accent': chapterAccent,
    '--w-chapter-bg': chapterBg,
    '--w-cel-glow': theme.celebration.glowColor,
    '--w-cel-from': theme.celebration.gradientFrom,
    '--w-cel-to': theme.celebration.gradientTo,
  };
}
