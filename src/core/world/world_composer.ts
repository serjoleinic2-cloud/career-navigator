import type { WorldPalette, WorldGeometry } from './world_theme';
import { getWorldThemeOrDefault } from './world_theme';
import type { JourneyRuntimeState } from '../runtime/journey_runtime';

export type WorldRenderConfig = {
  palette: WorldPalette;
  geometry: WorldGeometry;
  atmosphere: {
    timeOfDay: 'dawn' | 'day' | 'dusk' | 'night' | 'eternal';
    fogDensity: number;
    fogColor: string;
    particleType: 'dust' | 'firefly' | 'snow' | 'ash' | 'sparkle' | 'none';
    ambientLight: number;
  };
  lighting: {
    primaryDirection: 'top' | 'bottom' | 'left' | 'right';
    primaryIntensity: number;
    glowColor: string;
    shadowOpacity: number;
  };
  camera: {
    offsetY: number;
    smoothing: number;
    minDuration: number;
    maxDuration: number;
    focusMode: 'node' | 'journey';
  };
  backdrop: {
    type: 'gradient' | 'sky' | 'void' | 'nebula';
    colors: string[];
    stars: boolean;
    clouds: boolean;
  };
  particles: {
    enabled: boolean;
    count: number;
    speed: number;
    size: number;
  } | null;
  animation: {
    nodeAppear: number;
    nodeActivate: number;
    pathIlluminate: number;
    cameraMove: number;
    easing: 'easeOutCubic' | 'easeInOutCubic';
  };
};

export function composeWorldRenderConfig(
  professionId: string,
  runtimeState: JourneyRuntimeState | null
): WorldRenderConfig {
  const theme = getWorldThemeOrDefault(professionId);
  const completedCount = runtimeState
    ? Object.values(runtimeState.nodeStates).filter(n => n.state === 'confidence' || n.state === 'execution').length
    : 0;
  const totalCount = runtimeState
    ? Object.keys(runtimeState.nodeStates).length
    : 0;
  const progressRatio = totalCount > 0 ? completedCount / totalCount : 0;

  return {
    palette: theme.palette,
    geometry: theme.geometry,
    atmosphere: {
      timeOfDay: 'dusk',
      fogDensity: 0.2 + (progressRatio * 0.3),
      fogColor: theme.palette.backgroundFrom,
      particleType: 'dust',
      ambientLight: 0.4 + (progressRatio * 0.4),
    },
    lighting: {
      primaryDirection: 'top',
      primaryIntensity: 0.6 + (progressRatio * 0.3),
      glowColor: theme.palette.glowRGB,
      shadowOpacity: 0.3,
    },
    camera: {
      offsetY: 280,
      smoothing: 0.08,
      minDuration: 700,
      maxDuration: 900,
      focusMode: 'node',
    },
    backdrop: {
      type: 'gradient',
      colors: [theme.palette.backgroundFrom, theme.palette.backgroundTo],
      stars: progressRatio > 0.3,
      clouds: false,
    },
    particles: {
      enabled: true,
      count: 20 + Math.floor(progressRatio * 30),
      speed: 0.5 + (progressRatio * 0.5),
      size: 2,
    },
    animation: {
      nodeAppear: 400,
      nodeActivate: 600,
      pathIlluminate: 500,
      cameraMove: 800,
      easing: 'easeOutCubic',
    },
  };
}
