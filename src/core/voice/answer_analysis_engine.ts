import type { AnswerAnalysis } from './interview_state_machine';

export function analyzeAnswer(text: string): AnswerAnalysis {
  return {
    clarity: scoreClarity(text),
    structure: detectSTAR(text),
    confidence: detectConfidenceMarkers(text),
    fillerWords: detectFillerWords(text),
    completeness: detectCompleteness(text),
  };
}

function scoreClarity(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgLength = sentences.length > 0
    ? sentences.reduce((sum, s) => sum + s.trim().split(/\s+/).length, 0) / sentences.length
    : 0;

  if (avgLength >= 10 && avgLength <= 20) return 0.8;
  if (avgLength >= 5 && avgLength <= 25) return 0.6;
  return 0.3;
}

function detectSTAR(text: string): boolean {
  const lower = text.toLowerCase();
  const hasSituation = lower.includes('situation') || lower.includes('when') || lower.includes('during');
  const hasTask = lower.includes('task') || lower.includes('responsible') || lower.includes('had to');
  const hasAction = lower.includes('action') || lower.includes('did') || lower.includes('implemented');
  const hasResult = lower.includes('result') || lower.includes('outcome') || lower.includes('achieved');

  return hasSituation && hasTask && hasAction && hasResult;
}

function detectConfidenceMarkers(text: string): number {
  const confident = ['i know', 'i achieved', 'i led', 'i built', 'i created'];
  const uncertain = ['maybe', 'i think', 'kind of', 'sort of', 'perhaps'];

  let score = 0.5;
  const lower = text.toLowerCase();

  for (const phrase of confident) {
    if (lower.includes(phrase)) score += 0.1;
  }
  for (const phrase of uncertain) {
    if (lower.includes(phrase)) score -= 0.1;
  }

  return Math.max(0, Math.min(1, score));
}

function detectFillerWords(text: string): number {
  const fillers = ['um', 'uh', 'like', 'you know', 'so', 'actually', 'basically'];
  let count = 0;
  const lower = text.toLowerCase();
  for (const filler of fillers) {
    const matches = lower.match(new RegExp(`\\b${filler}\\b`, 'g'));
    count += matches?.length ?? 0;
  }
  return count;
}

function detectCompleteness(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words >= 50) return 1.0;
  if (words >= 30) return 0.7;
  if (words >= 15) return 0.4;
  return 0.2;
}
