import { useMemo } from 'react';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getActiveProfessionId } from '@/core/profession_loader';
import { getWorldThemeOrDefault, getChapterBackground } from '@/core/world/world_theme';

interface BackgroundLayerProps {
  chapterDomain?: string;
}

/**
 * Atmospheric fog layer, NOT an opaque background fill.
 * The light WorldBackdrop must always remain visible through this layer —
 * per product decision: "Journey is a HUD floating over a bright world,
 * not a dark screen." (see WORLD_COMPOSITION_REPORT.md / задание.txt decision #3)
 */
export function BackgroundLayer({ chapterDomain }: BackgroundLayerProps) {
  const fogColor = useMemo(() => {
    const professionId = getRuntimeState()?.professionId ?? getActiveProfessionId() ?? 'default';
    const theme = getWorldThemeOrDefault(professionId);
    if (!chapterDomain) return theme.palette.backgroundTo;
    return getChapterBackground(theme, chapterDomain);
  }, [chapterDomain]);

  return (
    <div
      className="background-layer"
      style={{
        background: `linear-gradient(180deg, transparent 0%, ${fogColor} 100%)`,
      }}
    />
  );
}
