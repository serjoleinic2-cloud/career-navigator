import type { JourneyRuntimeState } from './journey_runtime';
import type { ReadinessResult } from '../readiness_engine';
import { calculateReadiness } from '../readiness_engine';
import { analyzeGaps, getGapSummary } from '../gap_engine';
import { getActiveNodes, getActiveChapters } from '../profession_loader';
import { getChapterProgress } from '../chapter_engine';
import type { Gap } from '../gap_engine';

export type SyncResult = {
  readiness: ReadinessResult;
  gaps: Gap[];
  gapSummary: ReturnType<typeof getGapSummary>;
  chapterProgress: Array<{
    chapterId: string;
    percent: number;
  }>;
};

export function syncRuntimeWithEngine(_runtimeState: JourneyRuntimeState): SyncResult {
  const nodes = getActiveNodes();
  const chapters = getActiveChapters();

  const readiness = calculateReadiness(nodes);
  const gaps = analyzeGaps(nodes);
  const gapSummary = getGapSummary(nodes);

  const nodeMap: Record<string, typeof nodes[number]> = {};
  for (const n of nodes) {
    nodeMap[n.id] = n;
  }

  const chapterProgress = chapters.map(ch => {
    const progress = getChapterProgress(ch, nodeMap);
    return {
      chapterId: ch.id,
      percent: progress.percent,
    };
  });

  return {
    readiness,
    gaps,
    gapSummary,
    chapterProgress,
  };
}
