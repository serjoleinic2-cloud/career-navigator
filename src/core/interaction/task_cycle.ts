export type TaskResult = 'fail' | 'partial' | 'success';

export type TaskCycle = {
  attempt: number;
  feedback: string;
  result: TaskResult;
  adaptation: number;
};

const ADAPTATION_MAP: Record<TaskResult, number> = {
  fail: -0.1,
  partial: 0.05,
  success: 0.2,
};

export function createTaskCycle(result: TaskResult, feedback: string, previousAttempts: number = 0): TaskCycle {
  return {
    attempt: previousAttempts + 1,
    feedback,
    result,
    adaptation: ADAPTATION_MAP[result],
  };
}

export function calculateAdaptation(cycles: TaskCycle[]): number {
  if (cycles.length === 0) return 0;
  const sum = cycles.reduce((acc, c) => acc + c.adaptation, 0);
  return Math.max(-0.5, Math.min(1.0, sum));
}

export function getTaskSuccessRate(cycles: TaskCycle[]): number {
  if (cycles.length === 0) return 0;
  const successes = cycles.filter(c => c.result === 'success').length;
  const partials = cycles.filter(c => c.result === 'partial').length;
  return (successes + partials * 0.5) / cycles.length;
}

export function shouldRetryTask(cycles: TaskCycle[]): boolean {
  const last = cycles[cycles.length - 1];
  if (!last) return true;
  if (last.result === 'success') return false;
  return cycles.length < 3;
}
