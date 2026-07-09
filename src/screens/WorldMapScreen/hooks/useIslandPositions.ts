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
// Both columns cover the SAME vertical range, evenly spaced (not one
// column confined to the bottom half and the other to the top half —
// that's what made the previous version look lopsided). The hero/city
// island sits on top, center.
const COLUMN_RANGE = { start: 10, end: 82 }; // % from bottom
const ROWS_PER_COLUMN = 3;
const ROW_STEP = (COLUMN_RANGE.end - COLUMN_RANGE.start) / (ROWS_PER_COLUMN - 1);

function columnPosition(side: 'left' | 'right', row: number): IslandPosition {
  return { side, bottom: `${COLUMN_RANGE.start + row * ROW_STEP}%` };
}

const ISLAND_POSITIONS: IslandPosition[] = [
  columnPosition('left', 0),
  columnPosition('left', 1),
  columnPosition('left', 2),
  columnPosition('right', 0),
  columnPosition('right', 1),
  columnPosition('right', 2),
];

const CITY_POSITION: IslandPosition = { side: 'center', bottom: '94%' };

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
