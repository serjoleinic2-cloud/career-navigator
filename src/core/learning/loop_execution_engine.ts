import type { LearningLoop, TaskResult, TaskState } from './learning_loop_model';

export type TaskInput = {
  meetsAllCriteria: boolean;
  meetsSomeCriteria: boolean;
  userPerception: number;
  systemReadiness: number;
};

export function processTaskAttempt(
  task: TaskState,
  input: TaskInput
): LearningLoop {
  const result = evaluate(input);
  const feedback = generateFeedback(result);
  const delta = calculateDelta(result);

  return {
    taskId: task.id,
    attempt: task.retries + 1,
    result,
    userAction: input.meetsAllCriteria ? 'complete' : input.meetsSomeCriteria ? 'partial' : 'attempt',
    systemFeedback: feedback,
    adaptationDelta: delta,
  };
}

function evaluate(input: TaskInput): TaskResult {
  if (input.meetsAllCriteria) return 'success';
  if (input.meetsSomeCriteria) return 'partial';
  return 'fail';
}

function generateFeedback(result: TaskResult): string {
  switch (result) {
    case 'success': return 'Task completed successfully.';
    case 'partial': return 'Partial progress. Review and retry.';
    case 'fail': return 'Task not completed. Simplified approach recommended.';
  }
}

export function calculateDelta(result: TaskResult): number {
  switch (result) {
    case 'success': return 1.0;
    case 'partial': return 0.3;
    case 'fail': return -0.5;
  }
}
