import type { InterviewSession } from './interview_result';
import { load, save, remove } from '../persistence/storage';

const STORAGE_KEY = 'career-navigator.interview.v1';
const CURRENT_VERSION = 1;

const opts = { key: STORAGE_KEY, version: CURRENT_VERSION };

export interface PersistedSession {
  id: string;
  professionId: string;
  results: Omit<InterviewSession['results'][0], 'audioBlob'>[];
  startedAt: number;
  completedAt: number | null;
}

export function loadInterviewSessions(): InterviewSession[] | null {
  const raw = load<PersistedSession[]>(opts);
  if (!raw) return null;
  return raw.map(s => ({
    ...s,
    results: s.results.map(r => ({ ...r, audioBlob: null })),
  }));
}

export function saveInterviewSessions(sessions: InterviewSession[]): void {
  const persisted: PersistedSession[] = sessions.map(s => ({
    id: s.id,
    professionId: s.professionId,
    startedAt: s.startedAt,
    completedAt: s.completedAt,
    results: s.results.map(r => ({
      id: r.id,
      question: r.question,
      durationSeconds: r.durationSeconds,
      completedAt: r.completedAt,
      selfAssessment: { ...r.selfAssessment },
    })),
  }));
  save(opts, persisted);
}

export function clearInterviewSessions(): void {
  remove(STORAGE_KEY);
}
