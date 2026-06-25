export interface STTResult {
  text: string;
  confidence: number;
  duration: number;
}

export function listen(): Promise<STTResult> {
  return Promise.resolve({
    text: '',
    confidence: 0,
    duration: 0,
  });
}

export function parseTranscript(raw: string): STTResult {
  const words = raw.trim().split(/\s+/).filter(Boolean);
  const fillerCount = countFillerWords(raw);

  const baseConfidence = Math.min(1, words.length / 20);
  const confidence = Math.max(0, baseConfidence - fillerCount * 0.05);

  return {
    text: raw,
    confidence: Math.round(confidence * 100) / 100,
    duration: estimateDuration(words.length),
  };
}

function countFillerWords(text: string): number {
  const fillers = ['um', 'uh', 'like', 'you know', 'so', 'actually', 'basically'];
  let count = 0;
  const lower = text.toLowerCase();
  for (const filler of fillers) {
    const matches = lower.match(new RegExp(`\\b${filler}\\b`, 'g'));
    count += matches?.length ?? 0;
  }
  return count;
}

function estimateDuration(wordCount: number): number {
  return Math.round(wordCount * 300);
}
