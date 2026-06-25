export type LayoutMode = 'compact' | 'normal' | 'expanded';

export type ScreenSize = {
  width: number;
  height: number;
  pixelRatio: number;
};

export function detectScreenSize(): ScreenSize {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1,
  };
}

export function adaptLayout(screenSize: ScreenSize): LayoutMode {
  if (screenSize.width < 360) return 'compact';
  if (screenSize.width > 768) return 'expanded';
  return 'normal';
}

export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function getSafeAreaInsets(): { top: number; bottom: number; left: number; right: number } {
  return {
    top: 24,
    bottom: 16,
    left: 16,
    right: 16,
  };
}
