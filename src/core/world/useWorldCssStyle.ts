import { useMemo } from 'react';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getWorldThemeOrDefault, getWorldCssVars } from '@/core/world/world_theme';

export function useWorldCssStyle(chapterId?: string): React.CSSProperties {
  return useMemo(() => {
    const professionId = getRuntimeState()?.professionId ?? 'default';
    const theme = getWorldThemeOrDefault(professionId);
    return getWorldCssVars(theme, chapterId) as React.CSSProperties;
  }, [chapterId]);
}
