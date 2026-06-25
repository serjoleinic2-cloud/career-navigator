import type { InterviewSession, AnswerAnalysis } from './interview_state_machine';
import { advanceInterviewState, nextQuestion } from './interview_state_machine';
import type { TTSRequest } from './tts_engine';
import { speak } from './tts_engine';
import { listen } from './stt_engine';
import { analyzeAnswer } from './answer_analysis_engine';
import { generateFeedback } from './feedback_generator';
import { updateConfidenceFromVoice } from './confidence_impact_engine';
import type { UserConfidence } from './confidence_impact_engine';
import { getStressConfig } from './stress_simulation';

export type InterviewResult = {
  question: string;
  answer: string;
  analysis: AnswerAnalysis;
  feedback: string;
  confidenceDelta: number;
};

export async function runInterviewQuestion(
  session: InterviewSession,
  userConfidence: UserConfidence
): Promise<{
  session: InterviewSession;
  result: InterviewResult;
  updatedConfidence: UserConfidence;
}> {
  const question = session.questions[session.questionIndex];
  const stressConfig = getStressConfig(session.mode);

  const ttsRequest: TTSRequest = {
    text: question,
    voice: 'interviewer',
    speed: stressConfig.speedMultiplier,
  };
  speak(ttsRequest);

  const thinkTime = session.mode === 'stress' ? 3000 : 5000;
  await delay(thinkTime);

  const sttResult = await listen();
  const answer = sttResult.text || '';

  const analysis = analyzeAnswer(answer);
  const feedback = generateFeedback(analysis);

  const updatedConfidence = updateConfidenceFromVoice(userConfidence, analysis);

  const result: InterviewResult = {
    question,
    answer,
    analysis,
    feedback,
    confidenceDelta: updatedConfidence.confidence - userConfidence.confidence,
  };

  const newSession = nextQuestion({
    ...session,
    state: advanceInterviewState(session),
    answers: [...session.answers, answer],
    analyses: [...session.analyses, analysis],
  });

  return {
    session: newSession,
    result,
    updatedConfidence,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
