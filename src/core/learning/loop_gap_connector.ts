import type { LearningLoop } from './learning_loop_model';
import type { GapState } from '../gap_engine';

export function loopToGapUpdate(
  _loop: LearningLoop,
  currentConfidence: number,
  systemReadiness: number
): GapState {
  return {
    delta: systemReadiness - currentConfidence,
    userPerception: currentConfidence,
    systemReadiness,
  };
}

export function shouldUpdateGap(loop: LearningLoop): boolean {
  return loop.result === 'fail' || loop.result === 'partial';
}
