import type { TaskState, LearningLoop } from './learning_loop_model';

export function adaptDifficulty(task: TaskState, loop: LearningLoop): TaskState {
  let newDifficulty = task.difficulty;

  if (loop.result === 'success' && task.retries <= 1) {
    newDifficulty = Math.min(3.0, task.difficulty + 0.2);
  }

  if (loop.result === 'fail' && task.retries > 2) {
    newDifficulty = Math.max(0.5, task.difficulty - 0.2);
  }

  return {
    ...task,
    difficulty: newDifficulty,
    retries: task.retries + 1,
    lastResult: loop.result,
    status: loop.result === 'success' ? 'completed' : task.retries >= 3 ? 'failed' : 'active',
  };
}

export function shouldRetry(task: TaskState, loop: LearningLoop): boolean {
  if (loop.result === 'fail' && task.retries < 3) return true;
  if (loop.result === 'partial') return true;
  return false;
}
