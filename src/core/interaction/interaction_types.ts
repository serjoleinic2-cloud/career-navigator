import type { SkillNode } from '../skill_state';
import type { ReadinessResult } from '../readiness_engine';
import type { Gap } from '../gap_engine';

export type InteractionAction =
  | 'complete_task'
  | 'fail_task'
  | 'skip_task'
  | 'mark_practice_done'
  | 'submit_answer'
  | 'start_interview_practice';

export type FeedbackType = 'positive' | 'neutral' | 'warning';

export type FeedbackEvent = {
  type: FeedbackType;
  title: string;
  message: string;
  nextSuggestion: string;
};

export type RewardResult = {
  streakBonus: number;
  progressBurst: boolean;
  chapterCompleted: boolean;
  confidenceBoost: number;
};

export type InteractionResult = {
  updatedSkillNodes: SkillNode[];
  updatedReadiness: ReadinessResult;
  updatedGaps: Gap[];
  updatedChapterProgress: Array<{ chapterId: string; percent: number }>;
  feedbackEvent: FeedbackEvent;
  rewards: RewardResult;
};
