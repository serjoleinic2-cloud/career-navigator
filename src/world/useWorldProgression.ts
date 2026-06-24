import { useState, useCallback } from 'react';
import type { WorldState, WorldMode } from './WorldState';
import { initialWorldState } from './WorldState';

export function useWorldProgression() {
  const [state, setState] = useState<WorldState>(initialWorldState);

  const moveToNextLevel = useCallback(() => {
    setState((prev) => {
      const nextIndex = Math.min(prev.currentLevelIndex + 1, 4);
      return {
        ...prev,
        currentLevelIndex: nextIndex,
        completedLevels: [...prev.completedLevels, prev.currentLevelIndex],
        activePathPosition: 0,
        mode: 'moving' as WorldMode,
      };
    });
  }, []);

  const setMode = useCallback((mode: WorldMode) => {
    setState((prev) => ({ ...prev, mode }));
  }, []);

  const setPathPosition = useCallback((pos: number) => {
    setState((prev) => ({ ...prev, activePathPosition: pos }));
  }, []);

  const reset = useCallback(() => {
    setState(initialWorldState);
  }, []);

  return { state, moveToNextLevel, setMode, setPathPosition, reset };
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
