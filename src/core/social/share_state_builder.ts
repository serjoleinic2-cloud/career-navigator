import type { JourneyRuntimeState } from '../runtime/journey_runtime';
import { getProfession } from '../profession_registry';
import { getChapterById } from '../chapter_engine';
import { getTopGap } from '../gap_engine';

export type ShareState = {
  professionTitle: string;
  readinessScore: number;
  confidenceScore: number;
  currentChapter: string;
  completedChapters: string[];
  topGap: string | null;
  strongestSkill: string | null;
  weakestSkill: string | null;
};

export function buildShareState(runtimeState: JourneyRuntimeState): ShareState {
  const profession = getProfession(runtimeState.professionId);
  const professionTitle = profession?.title ?? 'Unknown';

  const currentChapter = getChapterById(
    profession?.chapters ?? [],
    runtimeState.activeChapterId
  )?.title ?? 'Unknown';

  const completedChapters = (profession?.chapters ?? [])
    .filter(ch => (runtimeState.chapterProgress[ch.id] ?? 0) === 100)
    .map(ch => ch.title);

  const nodes = Object.values(runtimeState.nodeStates);
  const topGap = getTopGap(nodes);
  const topGapText = topGap?.skill ?? null;

  const sortedByState = [...nodes].sort((a, b) => {
    const order = { locked: 0, awareness: 1, understanding: 2, application: 3, readiness: 4, execution: 5, confidence: 6 };
    return order[b.state] - order[a.state];
  });

  const strongestSkill = sortedByState[0]?.skill ?? null;
  const weakestSkill = sortedByState[sortedByState.length - 1]?.skill ?? null;

  return {
    professionTitle,
    readinessScore: runtimeState.readinessScore,
    confidenceScore: runtimeState.confidenceScore,
    currentChapter,
    completedChapters,
    topGap: topGapText,
    strongestSkill,
    weakestSkill,
  };
}
