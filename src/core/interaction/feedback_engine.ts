import type { SkillState } from '../skill_state';
import type { InteractionAction, FeedbackEvent } from './interaction_types';

export function generateFeedback(
  action: InteractionAction,
  previousState: SkillState,
  newState: SkillState,
  readinessDelta: number
): FeedbackEvent {
  switch (action) {
    case 'complete_task':
      if (newState !== previousState && readinessDelta > 0) {
        return {
          type: 'positive',
          title: 'Skill Upgraded!',
          message: 'Your readiness has improved.',
          nextSuggestion: 'Continue to the next task.',
        };
      }
      return {
        type: 'positive',
        title: 'Task Completed',
        message: 'Good progress. Keep the momentum.',
        nextSuggestion: 'Try the next challenge.',
      };

    case 'fail_task':
      return {
        type: 'warning',
        title: 'Task Not Completed',
        message: 'Review the material and try again.',
        nextSuggestion: 'Go back to the previous task.',
      };

    case 'skip_task':
      return {
        type: 'neutral',
        title: 'Task Skipped',
        message: 'You can return to this later.',
        nextSuggestion: 'Move to the next available task.',
      };

    case 'mark_practice_done':
      return {
        type: 'positive',
        title: 'Practice Recorded',
        message: 'Consistent practice builds confidence.',
        nextSuggestion: 'Keep practicing regularly.',
      };

    case 'submit_answer':
      if (newState !== previousState) {
        return {
          type: 'positive',
          title: 'Correct!',
          message: 'Your understanding is growing.',
          nextSuggestion: 'Move to the next topic.',
        };
      }
      return {
        type: 'neutral',
        title: 'Answer Submitted',
        message: 'Review the explanation for deeper understanding.',
        nextSuggestion: 'Try a related practice task.',
      };

    case 'start_interview_practice':
      return {
        type: 'neutral',
        title: 'Interview Mode',
        message: 'Simulating real interview conditions.',
        nextSuggestion: 'Answer as if in a real interview.',
      };
  }
}
