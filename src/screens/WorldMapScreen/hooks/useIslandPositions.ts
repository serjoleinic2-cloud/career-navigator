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

const ISLAND_POSITIONS: IslandPosition[] = [
  { side: 'left',   bottom: '10%' },
  { side: 'right',  bottom: '22%' },
  { side: 'left',   bottom: '38%' },
  { side: 'right',  bottom: '50%' },
  { side: 'left',   bottom: '66%' },
  { side: 'right',  bottom: '78%' },
];

const CITY_POSITION: IslandPosition = { side: 'center', bottom: '90%' };

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

      const unlocked = i === 0
        ? true
        : (runtimeState?.chapterProgress?.[chapters[i - 1]?.id] || 0) >= 100;

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
