export type WeightedScoreInput = {
  resume: number;
  applications: number;
  interview: number;
  consistency: number;
  confidence: number;
};

const WEIGHTS = {
  resume: 0.25,
  applications: 0.20,
  interview: 0.20,
  consistency: 0.15,
  confidence: 0.20,
};

export function calculateCareerScore(input: WeightedScoreInput): number {
  const score =
    input.resume * WEIGHTS.resume +
    input.applications * WEIGHTS.applications +
    input.interview * WEIGHTS.interview +
    input.consistency * WEIGHTS.consistency +
    input.confidence * WEIGHTS.confidence;

  return Math.round(Math.min(100, Math.max(0, score)));
}

export function calculateSystemScore(input: WeightedScoreInput): number {
  return calculateCareerScore(input);
}
