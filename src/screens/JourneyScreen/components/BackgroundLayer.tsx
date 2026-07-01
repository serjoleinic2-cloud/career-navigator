import { useMemo } from 'react';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getWorldThemeOrDefault, getChapterBackground } from '@/core/world/world_theme';

interface BackgroundLayerProps {
  chapterDomain?: string;
}

export function BackgroundLayer({ chapterDomain }: BackgroundLayerProps) {
  const bgColor = useMemo(() => {
    const professionId = getRuntimeState()?.professionId ?? 'default';
    const theme = getWorldThemeOrDefault(professionId);
    if (!chapterDomain) return theme.palette.backgroundTo;
    return getChapterBackground(theme, chapterDomain);
  }, [chapterDomain]);

  return (
    <div
      className="background-layer"
      style={{ backgroundColor: bgColor }}
    />
  );
}
