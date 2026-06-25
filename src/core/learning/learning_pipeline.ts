import type { TaskState, LearningLoop } from './learning_loop_model';
import type { TaskInput } from './loop_execution_engine';
import { processTaskAttempt } from './loop_execution_engine';
import { adaptDifficulty, shouldRetry } from './difficulty_adapter';
import { applyReinforcement, createConfidenceState } from './reinforcement_engine';
import { loopToGapUpdate, shouldUpdateGap } from './loop_gap_connector';
import type { UserConfidenceState } from './reinforcement_engine';
import type { GapState } from '../gap_engine';

export type PipelineResult = {
  loop: LearningLoop;
  updatedTask: TaskState;
  updatedConfidence: UserConfidenceState;
  gapUpdate: GapState | null;
  retryRecommended: boolean;
};

export function runLearningPipeline(
  task: TaskState,
  input: TaskInput,
  currentConfidence: UserConfidenceState,
  systemReadiness: number
): PipelineResult {
  const loop = processTaskAttempt(task, input);

  const updatedTask = adaptDifficulty(task, loop);

  const updatedConfidence = applyReinforcement(currentConfidence, loop);

  const gapUpdate = shouldUpdateGap(loop)
    ? loopToGapUpdate(loop, updatedConfidence.confidence, systemReadiness)
    : null;

  const retryRecommended = shouldRetry(updatedTask, loop);

  return {
    loop,
    updatedTask,
    updatedConfidence,
    gapUpdate,
    retryRecommended,
  };
}

export { createConfidenceState };
