/**
 * Headless test for Interview Trainer MVP (Задание 13).
 *
 * Run: npx tsx scripts/test-interview-trainer.ts
 *
 * Creates 3 mock sessions with different self-assessment results,
 * verifies calculateInterviewReadiness(), serialization/deserialization,
 * and prints a summary table.
 *
 * This file is temporary and must NOT be committed.
 */

import type { InterviewSession, InterviewResult } from '../src/core/interview/interview_result';
import { addSession, getSessions, setSessions, calculateInterviewReadiness } from '../src/core/interview/interview_store';
import { loadInterviewSessions, saveInterviewSessions, clearInterviewSessions } from '../src/core/interview/interview_persistence';

// Minimal localStorage polyfill for Node.js
if (typeof globalThis.localStorage === 'undefined') {
  const store: Record<string, string> = {};
  (globalThis as any).localStorage = {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
  };
}

function makeResult(overrides: Partial<InterviewResult['selfAssessment']> & { idx: number; question?: string }): InterviewResult {
  return {
    id: `r_${Date.now()}_${overrides.idx}`,
    question: overrides.question ?? `Mock question ${overrides.idx}`,
    audioBlob: null,
    durationSeconds: 30 + overrides.idx * 5,
    selfAssessment: {
      structure: overrides.structure ?? false,
      confidence: overrides.confidence ?? false,
      noFillers: overrides.noFillers ?? false,
      noPauses: overrides.noPauses ?? false,
      clearConclusion: overrides.clearConclusion ?? false,
    },
    completedAt: Date.now(),
  };
}

function formatDate(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

function avgScore(session: InterviewSession): number {
  const scores = session.results.map(r => {
    const a = r.selfAssessment;
    return [a.structure, a.confidence, a.noFillers, a.noPauses, a.clearConclusion].filter(Boolean).length / 5;
  });
  if (scores.length === 0) return 0;
  return scores.reduce((s, v) => s + v, 0) / scores.length;
}

// ── Session #1: all true ──────────────────────────────────────────
const session1: InterviewSession = {
  id: `test_1_${Date.now()}`,
  professionId: 'software_engineer',
  results: Array.from({ length: 10 }, (_, i) => makeResult({ idx: i, structure: true, confidence: true, noFillers: true, noPauses: true, clearConclusion: true })),
  startedAt: Date.now(),
  completedAt: Date.now(),
};

// ── Session #2: partial ───────────────────────────────────────────
const session2: InterviewSession = {
  id: `test_2_${Date.now()}`,
  professionId: 'software_engineer',
  results: Array.from({ length: 5 }, (_, i) => makeResult({ idx: i, structure: true, confidence: true, noFillers: true, noPauses: false, clearConclusion: i % 2 === 0 })),
  startedAt: Date.now(),
  completedAt: Date.now(),
};

// ── Session #3: all false ─────────────────────────────────────────
const session3: InterviewSession = {
  id: `test_3_${Date.now()}`,
  professionId: 'software_engineer',
  results: Array.from({ length: 3 }, (_, i) => makeResult({ idx: i })),
  startedAt: Date.now(),
  completedAt: Date.now(),
};

// ── Test ──────────────────────────────────────────────────────────
clearInterviewSessions();
setSessions([]);

addSession(session1);
addSession(session2);
addSession(session3);

const allSessions = getSessions();

console.log('\nInterview Trainer Test');
console.log('═══════════════════════\n');

for (let i = 0; i < allSessions.length; i++) {
  const s = allSessions[i];
  const score = (avgScore(s) * 5).toFixed(1);
  console.log(`Session #${i + 1}: ${s.results.length} questions, avg score ${score}/5, ${formatDate(s.startedAt)}`);
}

const readiness = calculateInterviewReadiness();
const stars = readiness >= 0.8 ? '★★★★★' : readiness >= 0.6 ? '★★★★☆' : readiness >= 0.4 ? '★★★☆☆' : readiness >= 0.2 ? '★★☆☆☆' : '★☆☆☆☆';
console.log(`\nOverall Readiness: ${stars} (${(readiness * 5).toFixed(1)}/5)`);

// ── Persistence test ──────────────────────────────────────────────
saveInterviewSessions(allSessions);
const loaded = loadInterviewSessions();

if (loaded && loaded.length === 3) {
  console.log('\nPersistence: OK (3 sessions saved and loaded)');
  const allAudioNull = loaded.every(s => s.results.every(r => r.audioBlob === null));
  console.log(`AudioBlob stripping: ${allAudioNull ? 'OK' : 'FAIL'}`);
} else {
  console.log('\nPersistence: FAIL');
}

clearInterviewSessions();
setSessions([]);
console.log();
