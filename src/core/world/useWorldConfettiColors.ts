import { useMemo } from 'react';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getWorldThemeOrDefault } from '@/core/world/world_theme';

export function useWorldConfettiColors(): string[] {
  return useMemo(() => {
    const professionId = getRuntimeState()?.professionId ?? 'default';
    return getWorldThemeOrDefault(professionId).celebration.confettiColors;
  }, []);
}
