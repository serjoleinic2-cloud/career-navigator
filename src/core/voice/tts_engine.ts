export type TTSVoice = 'neutral' | 'interviewer' | 'coach';

export interface TTSRequest {
  text: string;
  voice: TTSVoice;
  speed: number;
}

export type TTSResult = {
  success: boolean;
  duration: number;
};

export function speak(request: TTSRequest): TTSResult {
  const baseDuration = request.text.length * 80;
  const speedFactor = 1 / Math.max(0.5, request.speed);

  return {
    success: true,
    duration: Math.round(baseDuration * speedFactor),
  };
}

export function estimateSpeechDuration(text: string, speed: number = 1): number {
  return Math.round(text.length * 80 * (1 / Math.max(0.5, speed)));
}
