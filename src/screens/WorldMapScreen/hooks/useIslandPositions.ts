import { useMemo } from 'react';
import type { Chapter } from '@/core/chapter_model';
import type { JourneyRuntimeState } from '@/core/runtime/journey_runtime';

export interface IslandPosition {
  /** Which column the island's badge should lean toward (also used for
   *  the grid column: left -> col 1, right -> col 2, center -> spans
   *  both, used only by the hero/city island). */
  side: 'left' | 'right' | 'center';
  /** Grid row inside `.world-grid` (row 1 is reserved for the hero
   *  island; rows 2-4 hold the two columns of three regular islands). */
  row: number;
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

// 7 grid cells total: 1 hero cell on top (row 1, spans both columns),
// and two columns of 3 cells below it (rows 2-4). Chapters 1-3 go in
// the left column, chapters 4-6 in the right column. Each cell centers
// its island via flex — no manual percentage math, so nothing can
// clip off an edge or land under the bottom nav, and everything scales
// proportionally with the grid's own size (see WorldMapScreen.css).
const ISLAND_POSITIONS: IslandPosition[] = [
  { side: 'left',  row: 2 },
  { side: 'left',  row: 3 },
  { side: 'left',  row: 4 },
  { side: 'right', row: 2 },
  { side: 'right', row: 3 },
  { side: 'right', row: 4 },
];

const CITY_POSITION: IslandPosition = { side: 'center', row: 1 };

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
        position: ISLAND_POSITIONS[i] || { side: 'left', row: 4 },
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
