import type { InterviewSession } from './interview_result';

let sessions: InterviewSession[] = [];

export function getSessions(): InterviewSession[] {
  return [...sessions];
}

export function setSessions(data: InterviewSession[]): void {
  sessions = data;
}

export function addSession(session: InterviewSession): void {
  sessions.push(session);
}

export function getLatestSession(): InterviewSession | undefined {
  return sessions.length > 0 ? sessions[sessions.length - 1] : undefined;
}

export function updateSession(sessionId: string, updates: Partial<InterviewSession>): void {
  const idx = sessions.findIndex(s => s.id === sessionId);
  if (idx >= 0) {
    sessions[idx] = { ...sessions[idx], ...updates };
  }
}

export function calculateInterviewReadiness(sessionsList?: InterviewSession[]): number {
  const target = sessionsList ?? sessions;
  const allResults = target.flatMap(s => s.results);
  if (allResults.length === 0) return 0;
  const scores = allResults.map(r => {
    const a = r.selfAssessment;
    const trues = [a.structure, a.confidence, a.noFillers, a.noPauses, a.clearConclusion].filter(Boolean).length;
    return trues / 5;
  });
  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}
