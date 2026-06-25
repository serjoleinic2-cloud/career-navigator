export { processUserAction } from './interaction_engine';
export type { InteractionResult } from './interaction_types';

export type {
  InteractionAction,
  FeedbackEvent,
  FeedbackType,
  RewardResult,
} from './interaction_types';

export { applyStateTransition } from './state_transition_engine';

export { generateFeedback } from './feedback_engine';

export { calculateRewards, getStreak, resetStreak } from './reward_system';

export { subscribe, emit, clearAllListeners } from './event_bus';
export type { InteractionEventType } from './event_bus';

export type { TaskCycle, TaskResult } from './task_cycle';
export { createTaskCycle, calculateAdaptation, getTaskSuccessRate, shouldRetryTask } from './task_cycle';
