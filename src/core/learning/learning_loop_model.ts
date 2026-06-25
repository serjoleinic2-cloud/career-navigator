export type TaskResult = 'fail' | 'partial' | 'success';

export interface LearningLoop {
  taskId: string;
  attempt: number;
  result: TaskResult;
  userAction: string;
  systemFeedback: string;
  adaptationDelta: number;
}

export interface TaskState {
  id: string;
  status: 'active' | 'failed' | 'completed';
  difficulty: number;
  retries: number;
  lastResult: TaskResult | null;
}

export function createTaskState(id: string): TaskState {
  return {
    id,
    status: 'active',
    difficulty: 1.0,
    retries: 0,
    lastResult: null,
  };
}
