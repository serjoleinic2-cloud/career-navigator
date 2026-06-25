export type InterviewState =
  | 'start'
  | 'asking'
  | 'thinking'
  | 'recording'
  | 'analyzing'
  | 'feedback'
  | 'end';

export type InterviewMode = 'normal' | 'stress' | 'beginner' | 'final_round';

export interface InterviewSession {
  state: InterviewState;
  mode: InterviewMode;
  questionIndex: number;
  questions: string[];
  answers: string[];
  analyses: AnswerAnalysis[];
}

export interface AnswerAnalysis {
  clarity: number;
  structure: boolean;
  confidence: number;
  fillerWords: number;
  completeness: number;
}

export function createInterviewSession(
  questions: string[],
  mode: InterviewMode = 'normal'
): InterviewSession {
  return {
    state: 'start',
    mode,
    questionIndex: 0,
    questions,
    answers: [],
    analyses: [],
  };
}

export function advanceInterviewState(session: InterviewSession): InterviewState {
  const transitions: Record<InterviewState, InterviewState> = {
    start: 'asking',
    asking: 'thinking',
    thinking: 'recording',
    recording: 'analyzing',
    analyzing: 'feedback',
    feedback: 'asking',
    end: 'end',
  };

  let next = transitions[session.state];

  if (session.state === 'feedback' && session.questionIndex >= session.questions.length - 1) {
    next = 'end';
  }

  return next;
}

export function nextQuestion(session: InterviewSession): InterviewSession {
  if (session.state === 'feedback') {
    return {
      ...session,
      state: 'asking',
      questionIndex: session.questionIndex + 1,
    };
  }
  return session;
}
