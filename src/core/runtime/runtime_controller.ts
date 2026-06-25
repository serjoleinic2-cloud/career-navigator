import type { JourneyRuntimeState } from './journey_runtime';
import { initializeJourneyRuntime } from './journey_runtime';
import type { OnboardingState } from '../onboarding/onboarding_state';
import type { UserAction } from '../skill_engine';
import { getActiveChapters } from '../profession_loader';
import type { Chapter } from '../chapter_model';
import { getNextChapter } from '../chapter_engine';

let runtimeState: JourneyRuntimeState | null = null;

export function startJourney(onboardingState: OnboardingState): JourneyRuntimeState {
  runtimeState = initializeJourneyRuntime(onboardingState);
  return runtimeState;
}

export function getRuntimeState(): JourneyRuntimeState | null {
  return runtimeState;
}

export function setActiveNode(nodeId: string): JourneyRuntimeState {
  if (!runtimeState) {
    throw new Error('Runtime not initialized');
  }
  runtimeState = { ...runtimeState, activeNodeId: nodeId };
  return runtimeState;
}

export function advanceNode(_action: UserAction): JourneyRuntimeState {
  if (!runtimeState) {
    throw new Error('Runtime not initialized');
  }
  return runtimeState;
}

export function advanceChapter(): JourneyRuntimeState {
  if (!runtimeState) {
    throw new Error('Runtime not initialized');
  }
  const chapters = getActiveChapters();
  const currentChapter: Chapter | undefined = chapters.find(
    ch => ch.nodeIds.includes(runtimeState!.activeNodeId)
  );
  if (!currentChapter) {
    throw new Error('Current chapter not found');
  }
  const next = getNextChapter(chapters, currentChapter.id);
  if (!next) {
    throw new Error('No next chapter available');
  }
  const nextNodeId = next.nodeIds[0];
  if (!nextNodeId) {
    throw new Error('Next chapter has no nodes');
  }
  runtimeState = { ...runtimeState, activeNodeId: nextNodeId };
  return runtimeState;
}

export function resetRuntime(): void {
  runtimeState = null;
}
