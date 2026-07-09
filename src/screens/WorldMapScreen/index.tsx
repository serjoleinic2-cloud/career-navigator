import { useState, useCallback } from 'react';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getWorldThemeOrDefault, getChapterAccent } from '@/core/world/world_theme';
import { getActiveChapters } from '@/core/profession_loader';
import { useIslandPositions } from './hooks/useIslandPositions';
import { WorldMapIsland } from './components/Island';
import { IslandBridge } from './components/Bridge';
import type { IslandPosition } from './hooks/useIslandPositions';
import './WorldMapScreen.css';

export type { IslandPosition };

const CHAPTER_ART: Record<string, string> = {
  resume: 'island-resume.png',
  linkedin: 'island-linkedin.png',
  applications: 'island-applications.png',
  interviews: 'island-interview.png',
  offer_preparation: 'island-offer.png',
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
        src={`/art/${professionId}/world.png`}
        alt=""
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />

      <div className="world-islands">
        {islands.map((isl) => {
          const accent = getChapterAccent(theme, isl.chapterId);
          const art = CHAPTER_ART[isl.chapterId];
          const artSrc = art ? `/art/${professionId}/${art}` : '';
          return (
            <WorldMapIsland
              key={isl.chapterId}
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
          );
        })}

        {islands.length > 1 && islands.slice(0, -1).map((isl, i) => (
          <IslandBridge
            key={`bridge-${i}`}
            from={isl.position}
            to={islands[i + 1].position}
          />
        ))}

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
    </div>
  );
}
