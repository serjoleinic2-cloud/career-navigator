import type { JourneyRuntimeState } from '../runtime/journey_runtime';
import type { OnboardingState } from '../onboarding/onboarding_state';

export type CareerSnapshot = {
  version: 'FRZ_2.2';
  timestamp: number;
  professionId: string;
  onboardingState: OnboardingState;
  skillStates: Record<string, string>;
  chapterProgress: Record<string, number>;
  readiness: number;
  confidence: number;
  memorySummary: {
    totalEntries: number;
    topTags: string[];
  };
};

export function exportCareerSnapshot(
  runtimeState: JourneyRuntimeState,
  onboardingState: OnboardingState,
  memoryEntryCount: number,
  topTags: string[]
): CareerSnapshot {
  const skillStates: Record<string, string> = {};
  for (const [id, node] of Object.entries(runtimeState.nodeStates)) {
    skillStates[id] = node.state;
  }

  return {
    version: 'FRZ_2.2',
    timestamp: Date.now(),
    professionId: runtimeState.professionId,
    onboardingState,
    skillStates,
    chapterProgress: runtimeState.chapterProgress,
    readiness: runtimeState.readinessScore,
    confidence: runtimeState.confidenceScore,
    memorySummary: {
      totalEntries: memoryEntryCount,
      topTags,
    },
  };
}

export function serializeSnapshot(snapshot: CareerSnapshot): string {
  return JSON.stringify(snapshot, null, 2);
}
