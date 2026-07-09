import { useMemo } from 'react';
import type { Chapter } from '@/core/chapter_model';
import type { JourneyRuntimeState } from '@/core/runtime/journey_runtime';

export interface IslandPosition {
  side: 'left' | 'right' | 'center';
  bottom: string;
}

export interface IslandData {
  chapterId: string;
  position: IslandPosition;
  unlocked: boolean;
  completed: number;
  total: number;
}

export interface CityData {
  position: IslandPosition;
}

// Chapters 1-3 stack on the left, chapters 4-6 stack on the right.
// Rows are staggered between the two columns (right offset by half a
// row-step) so a left island and a right island are never at exactly
// the same height — otherwise their progress badges, which both sit
// pushed toward the screen's center, land on top of each other.
const COLUMN_RANGE = { start: 24, end: 62 }; // % from bottom, tighter than before
const ROW_STEP = (COLUMN_RANGE.end - COLUMN_RANGE.start) / 2; // 3 rows per column

function columnPosition(side: 'left' | 'right', row: number): IslandPosition {
  const stagger = side === 'right' ? ROW_STEP / 2 : 0;
  return { side, bottom: `${COLUMN_RANGE.start + row * ROW_STEP + stagger}%` };
}

const ISLAND_POSITIONS: IslandPosition[] = [
  columnPosition('left', 0),
  columnPosition('left', 1),
  columnPosition('left', 2),
  columnPosition('right', 0),
  columnPosition('right', 1),
  columnPosition('right', 2),
];

// Hero/city island: centered on top, fully visible (not clipped by the
// screen edge) — sits just above the highest regular island.
const CITY_POSITION: IslandPosition = { side: 'center', bottom: '88%' };

export function useIslandPositions(
  chapters: Chapter[],
  runtimeState: JourneyRuntimeState | null
): { islands: IslandData[]; city: CityData } {
  return useMemo(() => {
    const islands: IslandData[] = chapters.map((ch, i) => {
      const nodeIds = ch.nodeIds || [];
      const nodes = nodeIds.map(id => runtimeState?.nodeStates?.[id]).filter(Boolean);
      const completed = nodes.filter(n => n!.state === 'confidence').length;
      const total = nodeIds.length || 1;

      const ownProgress = runtimeState?.chapterProgress?.[ch.id] || 0;
      const isActiveChapter = runtimeState?.activeChapterId === ch.id;
      const prevCompleted = i === 0
        ? true
        : (runtimeState?.chapterProgress?.[chapters[i - 1]?.id] || 0) >= 100;

      // Island becomes active (tappable) once the user has entered this
      // chapter and started it (own progress > 0, or it's the current
      // active chapter), or once the previous chapter is fully completed
      // and the journey can move on to this one.
      const unlocked = i === 0 || ownProgress > 0 || isActiveChapter || prevCompleted;

      return {
        chapterId: ch.id,
        position: ISLAND_POSITIONS[i] || { side: 'center', bottom: '50%' },
        unlocked,
        completed,
        total,
      };
    });

    return {
      islands,
      city: { position: CITY_POSITION },
    };
  }, [chapters, runtimeState]);
}
