import { Icon } from '@/components/Icon/Icon';
import type { IslandPosition } from '../hooks/useIslandPositions';
import { ProgressBadge } from './ProgressBadge';

const CHAPTER_TITLES: Record<string, string> = {
  resume: 'Resume',
  linkedin: 'LinkedIn',
  applications: 'Applications',
  interviews: 'Interviews',
  offer_preparation: 'Offer Prep',
  offer: 'Offer',
};

interface WorldMapIslandProps {
  chapterId: string;
  position: IslandPosition;
  accent: string;
  artSrc: string;
  unlocked: boolean;
  completed: number;
  total: number;
  isCity?: boolean;
  imgError: boolean;
  onClick: (chapterId: string) => void;
  onImgError: () => void;
}

export function WorldMapIsland({
  chapterId,
  position,
  accent,
  artSrc,
  unlocked,
  completed,
  total,
  isCity,
  imgError,
  onClick,
  onImgError,
}: WorldMapIslandProps) {
  const className = `world-island world-island--${position.side} ${unlocked ? 'world-island--unlocked' : 'world-island--locked'}${isCity ? ' world-island--city' : ''}`;
  const title = isCity ? null : (CHAPTER_TITLES[chapterId] ?? chapterId);

  return (
    <div
      className={className}
      style={{ '--island-accent': accent } as React.CSSProperties}
      onClick={() => unlocked && onClick(chapterId)}
    >
      <div className="world-island-float">
        {!imgError ? (
          <img
            src={artSrc}
            alt={chapterId}
            onError={() => {
              console.warn(`[WorldMap] Failed to load island image: ${artSrc}`);
              onImgError?.();
            }}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <Icon name="island" size={48} color={accent} />
        )}
      </div>

      {title && (
        <div className="world-island-title" style={{ color: accent }}>
          {title}
        </div>
      )}

      <ProgressBadge completed={completed} total={total} isCity={isCity} />
    </div>
  );
}
