import { useState, useCallback } from 'react';
import { addSession, updateSession, getSessions } from '@/core/interview/interview_store';
import { saveInterviewSessions } from '@/core/interview/interview_persistence';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import type { InterviewSession, InterviewResult } from '@/core/interview/interview_result';

function generateId(): string {
  return `int_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function useInterviewSession() {
  const [sessionId, setSessionId] = useState(() => generateId());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentResultId, setCurrentResultId] = useState(generateId);
  const [started, setStarted] = useState(false);

  const startSession = useCallback(() => {
    setStarted(true);
    const pid = getRuntimeState()?.professionId || 'software_engineer';
    const session: InterviewSession = {
      id: sessionId,
      professionId: pid,
      results: [],
      startedAt: Date.now(),
      completedAt: null,
    };
    addSession(session);
    const newId = generateId();
    setCurrentResultId(newId);
  }, [sessionId]);

  const saveCurrentResult = useCallback((
    currentQuestion: string,
    recordingDuration: number,
    selfAssessment: Record<string, boolean>,
  ) => {
    const result: InterviewResult = {
      id: currentResultId,
      question: currentQuestion,
      audioBlob: null,
      durationSeconds: recordingDuration,
      selfAssessment: {
        structure: selfAssessment.structure || false,
        confidence: selfAssessment.confidence || false,
        noFillers: selfAssessment.noFillers || false,
        noPauses: selfAssessment.noPauses || false,
        clearConclusion: selfAssessment.clearConclusion || false,
      },
      completedAt: Date.now(),
    };
    const sessions = getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      session.results.push(result);
      updateSession(sessionId, { results: [...session.results] });
    }
    saveInterviewSessions(getSessions());
  }, [currentResultId, sessionId]);

  const nextQuestion = useCallback(() => {
    const newId = generateId();
    setCurrentResultId(newId);
    setQuestionIndex(i => i + 1);
  }, []);

  const finishSession = useCallback(() => {
    updateSession(sessionId, { completedAt: Date.now() });
    saveInterviewSessions(getSessions());
  }, [sessionId]);

  const resetSession = useCallback(() => {
    const newId = generateId();
    setSessionId(newId);
    setQuestionIndex(0);
    setCurrentResultId(newId);
    setStarted(false);
  }, []);

  return {
    sessionId,
    questionIndex,
    setQuestionIndex,
    currentResultId,
    started,
    setStarted,
    startSession,
    saveCurrentResult,
    nextQuestion,
    finishSession,
    resetSession,
  };
}
