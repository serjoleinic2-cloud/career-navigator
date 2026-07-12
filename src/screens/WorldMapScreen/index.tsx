import { useState, useCallback } from 'react';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getWorldThemeOrDefault, getChapterAccent } from '@/core/world/world_theme';
import { getActiveChapters } from '@/core/profession_loader';
import { useIslandPositions } from './hooks/useIslandPositions';
import { WorldMapIsland } from './components/Island';
import type { IslandPosition } from './hooks/useIslandPositions';
import './WorldMapScreen.css';

export type { IslandPosition };

const CHAPTER_ART: Record<string, string> = {
  resume: 'island-resume.png',
  linkedin: 'island-linkedin.png',
  applications: 'island-applications.png',
  interviews: 'island-interview.png',
  offer_preparation: 'island-offer-preparation.png',
  offer: 'island-offer.png',
};

interface WorldMapScreenProps {
  style?: any;
  onChapterSelect?: (chapterId: string) => void;
}

export function WorldMapScreen({ style, onChapterSelect }: WorldMapScreenProps) {
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const runtimeState = getRuntimeState();
  const professionId = runtimeState?.professionId || 'software_engineer';
  const theme = getWorldThemeOrDefault(professionId);
  const chapters = getActiveChapters();
  const { islands, city } = useIslandPositions(chapters, runtimeState);

  const handleIslandClick = useCallback((chapterId: string) => {
    onChapterSelect?.(chapterId);
  }, [onChapterSelect]);

  return (
    <div className="world-map-screen" style={style}>
      <img
        className="world-map-bg"
        src={`/art/${professionId}/world.jpg`}
        alt=""
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />

      {/* 7 grid cells: 1 hero cell on top (spans both columns), then two
          columns of 3 cells below it. Each cell centers its one island —
          no absolute-position math, so sizing/spacing scales proportionally
          with the grid itself (see WorldMapScreen.css) and nothing can
          clip off an edge or land under the bottom nav. */}
      <div className="world-grid">
        <div className="world-cell world-cell--hero">
          <WorldMapIsland
            chapterId="city"
            position={city.position}
            accent="#FFD700"
            artSrc={`/art/${professionId}/island_${professionId}.png`}
            unlocked={true}
            completed={0}
            total={0}
            isCity={true}
            imgError={false}
            onClick={() => {}}
            onImgError={() => {}}
          />
        </div>

        {islands.map((isl) => {
          const accent = getChapterAccent(theme, isl.chapterId);
          const art = CHAPTER_ART[isl.chapterId];
          const artSrc = art ? `/art/${professionId}/${art}` : '';
          return (
            <div
              key={isl.chapterId}
              className="world-cell"
              style={{
                gridRow: isl.position.row,
                gridColumn: isl.position.side === 'left' ? 1 : 2,
              }}
            >
              <WorldMapIsland
                chapterId={isl.chapterId}
                position={isl.position}
                accent={accent}
                artSrc={artSrc}
                unlocked={isl.unlocked}
                completed={isl.completed}
                total={isl.total}
                imgError={imgError[isl.chapterId]}
                onClick={handleIslandClick}
                onImgError={() => setImgError(prev => ({ ...prev, [isl.chapterId]: true }))}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
