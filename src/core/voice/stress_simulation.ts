import type { InterviewSession } from './interview_state_machine';

export type StressConfig = {
  speedMultiplier: number;
  pauseReduction: boolean;
  interruptionMode: boolean;
  timeLimit: number;
};

export function applyStressMode(session: InterviewSession): InterviewSession {
  if (session.mode !== 'stress') return session;

  return {
    ...session,
  };
}

export function getStressConfig(mode: string): StressConfig {
  switch (mode) {
    case 'stress':
      return {
        speedMultiplier: 1.2,
        pauseReduction: true,
        interruptionMode: true,
        timeLimit: 60,
      };
    case 'final_round':
      return {
        speedMultiplier: 1.1,
        pauseReduction: true,
        interruptionMode: false,
        timeLimit: 90,
      };
    case 'beginner':
      return {
        speedMultiplier: 0.9,
        pauseReduction: false,
        interruptionMode: false,
        timeLimit: 180,
      };
    default:
      return {
        speedMultiplier: 1.0,
        pauseReduction: false,
        interruptionMode: false,
        timeLimit: 120,
      };
  }
}
