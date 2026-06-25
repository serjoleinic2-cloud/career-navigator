import type { AnswerAnalysis } from './interview_state_machine';

export function generateFeedback(analysis: AnswerAnalysis): string {
  if (analysis.clarity < 0.5) {
    return 'Answer is unclear. Try shorter sentences.';
  }

  if (!analysis.structure) {
    return 'Use STAR structure (Situation, Task, Action, Result).';
  }

  if (analysis.fillerWords > 5) {
    return 'Reduce filler words like "um", "like".';
  }

  if (analysis.completeness < 0.5) {
    return 'Answer too brief. Expand with specific details.';
  }

  if (analysis.confidence < 0.5) {
    return 'Use stronger action verbs. Own your achievements.';
  }

  return 'Strong answer. Keep consistency.';
}

export function generateScoreBreakdown(analysis: AnswerAnalysis): string[] {
  const parts: string[] = [];
  parts.push(`Clarity: ${Math.round(analysis.clarity * 100)}%`);
  parts.push(`Structure: ${analysis.structure ? 'STAR detected' : 'Use STAR'}`);
  parts.push(`Confidence: ${Math.round(analysis.confidence * 100)}%`);
  parts.push(`Filler words: ${analysis.fillerWords}`);
  parts.push(`Completeness: ${Math.round(analysis.completeness * 100)}%`);
  return parts;
}
