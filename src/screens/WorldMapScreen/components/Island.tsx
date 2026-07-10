import { Icon } from '@/components/Icon/Icon';
import type { IslandPosition } from '../hooks/useIslandPositions';
import { ProgressBadge } from './ProgressBadge';

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
  // Positioning itself now lives entirely in the parent `.world-cell`
  // (a CSS grid cell that centers its one child) — this component just
  // decides which side its progress badge leans toward, and whether
  // it's tappable.
  const className = `world-island world-island--${position.side} ${unlocked ? 'world-island--unlocked' : 'world-island--locked'}${isCity ? ' world-island--city' : ''}`;

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
            onError={onImgError}
          />
        ) : (
          <Icon name="island" size={48} color={accent} />
        )}
      </div>

      <ProgressBadge completed={completed} total={total} isCity={isCity} />
    </div>
  );
}
