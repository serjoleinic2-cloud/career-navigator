export type VoiceSessionType = 'interview' | 'practice' | 'feedback';

export type VoiceSessionStatus = 'idle' | 'speaking' | 'listening' | 'analyzing';

export interface VoiceSession {
  sessionId: string;
  type: VoiceSessionType;
  status: VoiceSessionStatus;
  currentQuestion: string;
  userAnswer: string | null;
}

export function createVoiceSession(
  sessionId: string,
  type: VoiceSessionType = 'interview'
): VoiceSession {
  return {
    sessionId,
    type,
    status: 'idle',
    currentQuestion: '',
    userAnswer: null,
  };
}
