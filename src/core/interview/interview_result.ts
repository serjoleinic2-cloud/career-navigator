// TODO: unify with voice/ module (src/core/voice/interview_loop.ts) when Interview Trainer v2.
// voice/ uses InterviewResult with answer/analysis/feedback/confidenceDelta (AI pipeline).
// This MVP uses self-assessment checklist + audio blob — different model, keep separate.

export interface InterviewResult {
  id: string;
  question: string;
  audioBlob: Blob | null;
  durationSeconds: number;
  selfAssessment: {
    structure: boolean;
    confidence: boolean;
    noFillers: boolean;
    noPauses: boolean;
    clearConclusion: boolean;
  };
  completedAt: number;
}

export interface InterviewSession {
  id: string;
  professionId: string;
  results: InterviewResult[];
  startedAt: number;
  completedAt: number | null;
}
