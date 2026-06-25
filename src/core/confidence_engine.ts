import { getTaskSuccessRate } from './interaction/task_cycle';
import type { TaskCycle } from './interaction/task_cycle';

export type ConfidenceInput = {
  successRate: number;
  interviewHistory: number;
  selfAssessment: number;
  stressEvents: number;
};

const STRESS_PENALTY = 0.15;

export function calculateConfidence(input: ConfidenceInput): number {
  const base = input.successRate * 0.4
    + Math.min(input.interviewHistory / 10, 1) * 0.25
    + (input.selfAssessment / 100) * 0.20;

  const stressPenalty = Math.min(input.stressEvents * STRESS_PENALTY, 0.5);

  const raw = base * (1 - stressPenalty);
  return Math.round(Math.min(100, Math.max(0, raw * 100)));
}

export function buildConfidenceInput(
  taskCycles: TaskCycle[],
  interviewCount: number,
  selfScore: number,
  recentFailures: number
): ConfidenceInput {
  return {
    successRate: getTaskSuccessRate(taskCycles),
    interviewHistory: interviewCount,
    selfAssessment: selfScore,
    stressEvents: recentFailures,
  };
}

export function getConfidenceLevel(score: number): 'low' | 'medium' | 'high' {
  if (score < 35) return 'low';
  if (score < 65) return 'medium';
  return 'high';
}
