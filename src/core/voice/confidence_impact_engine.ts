import type { AnswerAnalysis } from './interview_state_machine';

export type UserConfidence = {
  confidence: number;
  voiceScore: number;
};

export function updateConfidenceFromVoice(
  user: UserConfidence,
  analysis: AnswerAnalysis
): UserConfidence {
  let delta = 0;

  delta += analysis.clarity * 0.5;
  delta += analysis.structure ? 0.5 : -0.3;
  delta -= analysis.fillerWords * 0.05;
  delta += analysis.completeness * 0.3;

  const newConfidence = clamp(user.confidence + delta, 0, 10);
  const newVoiceScore = Math.round(
    (analysis.clarity + (analysis.structure ? 1 : 0) + analysis.confidence + analysis.completeness) / 4 * 100
  ) / 100;

  return {
    confidence: Math.round(newConfidence * 10) / 10,
    voiceScore: newVoiceScore,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
