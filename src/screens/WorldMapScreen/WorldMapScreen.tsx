import { useState, useCallback } from 'react';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getWorldThemeOrDefault, getChapterAccent } from '@/core/world/world_theme';
import { getActiveChapters } from '@/core/profession_loader';
import { Icon } from '@/components/Icon/Icon';
import './WorldMapScreen.css';

const CHAPTER_ORDER = ['resume', 'linkedin', 'applications', 'interviews', 'offer_preparation', 'offer'];

const ISLAND_POSITIONS = [
  { left: '50%', bottom: '5%' },    // resume - center
  { left: '20%', bottom: '18%' },   // linkedin - left
  { left: '80%', bottom: '31%' },   // applications - right
  { left: '20%', bottom: '44%' },   // interviews - left
  { left: '80%', bottom: '57%' },   // offer_preparation - right
  { left: '20%', bottom: '70%' },   // offer - left
  { left: '50%', bottom: '83%' },   // city - center top
];

const CHAPTER_ART: Record<string, string> = {
  resume: 'island-resume.png',
  linkedin: 'island-linkedin.png',
  applications: 'island-applications.png',
  interviews: 'island-interview.png',
  offer_preparation: 'island-offer.png',
  offer: 'island-offer.png',
};

interface WorldMapScreenProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
  onChapterSelect?: (chapterId: string) => void;
}

export function WorldMapScreen({ style, onChapterSelect }: WorldMapScreenProps) {
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const runtimeState = getRuntimeState();
  const professionId = runtimeState?.professionId || 'software_engineer';
  const theme = getWorldThemeOrDefault(professionId);

  const handleIslandClick = useCallback((chapterId: string) => {
    onChapterSelect?.(chapterId);
  }, [onChapterSelect]);

  const getProgress = (chapterId: string) => {
    const chapters = getActiveChapters();
    const chapter = chapters.find(c => c.id === chapterId);
    const nodeIds = chapter?.nodeIds || [];
    const nodes = nodeIds.map(id => runtimeState?.nodeStates?.[id]).filter(Boolean);
    const completed = nodes.filter(n => n!.state === 'confidence').length;
    return { completed, total: nodeIds.length || 1 };
  };

  const isUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevChapter = CHAPTER_ORDER[index - 1];
    return (runtimeState?.chapterProgress?.[prevChapter] || 0) >= 100;
  };

  return (
    <div className="world-map-screen" style={style}>
      <img
        className="world-map-bg"
        src={`/art/${professionId}/world.png`}
        alt=""
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />

      <div className="world-islands">
        {CHAPTER_ORDER.map((chapterId, i) => {
          const pos = ISLAND_POSITIONS[i];
          const accent = getChapterAccent(theme, chapterId);
          const artSrc = `/art/${professionId}/${CHAPTER_ART[chapterId]}`;
          const { completed, total } = getProgress(chapterId);
          const unlocked = isUnlocked(i);

          return (
            <div
              key={chapterId}
              className={`world-island ${unlocked ? 'world-island--unlocked' : 'world-island--locked'}`}
              style={{
                left: pos.left,
                bottom: pos.bottom,
                '--island-accent': accent,
              } as React.CSSProperties}
              onClick={() => unlocked && handleIslandClick(chapterId)}
            >
              <div className="world-island-float">
                {!imgError[chapterId] ? (
                  <img
                    src={artSrc}
                    alt={chapterId}
                    onError={() => setImgError(prev => ({ ...prev, [chapterId]: true }))}
                  />
                ) : (
                  <Icon name="island" size={48} color={accent} />
                )}
              </div>

              <div className="world-island-progress">
                <span>{completed}/{total}</span>
              </div>
            </div>
          );
        })}

        {/* City */}
        <div
          className="world-island world-island--city"
          style={{
            left: ISLAND_POSITIONS[6].left,
            bottom: ISLAND_POSITIONS[6].bottom,
          }}
        >
          <div className="world-island-float">
            <img
              src={`/art/${professionId}/island_${professionId}.png`}
              alt="City"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="world-island-progress">
            <Icon name="city" size={16} color="#FFD700" />
          </div>
        </div>
      </div>
    </div>
  );
}
