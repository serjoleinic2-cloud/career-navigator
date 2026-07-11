import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { emit } from '@/core/events/system_event_bus';
import { setSessions, getSessions } from '@/core/interview/interview_store';
import { loadInterviewSessions, saveInterviewSessions } from '@/core/interview/interview_persistence';
import { generateFeedback } from '@/core/voice/feedback_generator';
import type { AnswerAnalysis } from '@/core/voice/interview_state_machine';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getInterviewQuestions } from '@/core/interview/interview_question_loader';
import { speakMale, stop as stopTts } from '@/core/voice/native_tts';
import { useVoiceRecorder } from './hooks/useVoiceRecorder';
import { useInterviewSession } from './hooks/useInterviewSession';
import { Icon } from '@/components/Icon/Icon';
import { markInterviewPracticeToday } from '@/core/notifications/notification_service';
import { RecordPhase } from './RecordPhase';
import { ReviewPhase } from './ReviewPhase';
import { ResultsScreen } from './ResultsScreen';
import './InterviewTrainerScreen.css';

const MAX_RECORD_SECONDS = 60;

type Phase = 'idle' | 'record' | 'review' | 'error';
type ErrorType = 'no_mic' | 'too_short' | null;

function selfAssessmentToAnswerAnalysis(sa: Record<string, boolean>): AnswerAnalysis {
  return {
    clarity: sa.clearConclusion ? 0.8 : 0.4,
    structure: sa.structure || false,
    confidence: sa.confidence ? 0.8 : 0.4,
    fillerWords: sa.noFillers ? 2 : 8,
    completeness: sa.clearConclusion ? 0.8 : 0.4,
  };
}

interface InterviewTrainerScreenProps {
  onClose: () => void;
}

export function InterviewTrainerScreen({ onClose }: InterviewTrainerScreenProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [selfAssessment, setSelfAssessment] = useState<Record<string, boolean>>({});
  const [micError, setMicError] = useState<ErrorType>(null);
  const [recordingToast, setRecordingToast] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [textAnswer, setTextAnswer] = useState('');

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const feedbackTextRef = useRef<string | null>(null);

  const {
    sessionId,
    questionIndex,
    currentResultId,
    started,
    startSession,
    saveCurrentResult,
    nextQuestion,
    finishSession,
    resetSession,
  } = useInterviewSession();

  const {
    isRecording, isSupported, audioBlob,
    recordingDuration, startRecording, stopRecording, resetRecording, streamRef,
  } = useVoiceRecorder(MAX_RECORD_SECONDS * 1000);

  const audioUrl = useMemo(() => {
    if (!audioBlob) return '';
    return URL.createObjectURL(audioBlob);
  }, [audioBlob]);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const questions = useMemo(() => {
    const pid = getRuntimeState()?.professionId || 'software_engineer';
    return getInterviewQuestions(pid);
  }, []);
  const question = questions[questionIndex] || '';
  const isLast = questionIndex >= questions.length - 1;

  const professionId = getRuntimeState()?.professionId || 'software_engineer';

  useEffect(() => {
    const saved = loadInterviewSessions();
    if (saved) setSessions(saved);
  }, []);

  useEffect(() => {
    if (!started) return;
    saveInterviewSessions(getSessions());
  }, [started, selfAssessment]);

  useEffect(() => {
    const handler = () => {
      if (document.hidden && isRecording) {
        stopRecording();
        setPhase('review');
        setRecordingToast('Recording paused — review your answer');
        setTimeout(() => setRecordingToast(null), 3000);
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [isRecording, stopRecording]);

  useEffect(() => {
    if (phase !== 'record' || !isRecording) return;
    const timeout = setTimeout(() => {
      stopRecording();
      setPhase('review');
    }, MAX_RECORD_SECONDS * 1000);
    return () => clearTimeout(timeout);
  }, [phase, isRecording, stopRecording]);

  const handleStartSession = useCallback(() => {
    startSession();
    feedbackTextRef.current = null;
    setPhase(isSupported ? 'record' : 'review');
  }, [startSession, isSupported]);

  const handleStopRecord = useCallback(() => {
    audioContextRef.current?.close();
    audioContextRef.current = null;
    analyserRef.current = null;
    stopRecording();
    if (recordingDuration === 0) {
      setMicError('too_short');
      setPhase('error');
      return;
    }
    setPhase('review');
    setSelfAssessment({});
    feedbackTextRef.current = null;
  }, [stopRecording, recordingDuration]);

  const handleStartRecord = useCallback(async () => {
    try {
      await startRecording();
      setMicError(null);
      setPhase('record');

      const stream = streamRef.current;
      if (stream) {
        const ac = new AudioContext();
        if (ac.state === 'suspended') await ac.resume();
        const analyser = ac.createAnalyser();
        analyser.fftSize = 256;
        const source = ac.createMediaStreamSource(stream);
        source.connect(analyser);
        audioContextRef.current = ac;
        analyserRef.current = analyser;
      }
    } catch {
      setMicError('no_mic');
      setPhase('error');
    }
  }, [startRecording]);

  const speakQuestion = useCallback(async (text: string) => {
    await stopTts();
    await speakMale(text);
  }, []);

  const handleNextQuestion = useCallback(() => {
    saveCurrentResult(question, recordingDuration, selfAssessment);
    resetRecording();
    if (audioRef.current) audioRef.current.pause();

    if (isLast) {
      finishSession();
      setShowResults(true);
      return;
    }

    nextQuestion();
    setPhase(isSupported ? 'record' : 'review');
    setSelfAssessment({});
    setTextAnswer('');
    feedbackTextRef.current = null;
  }, [saveCurrentResult, question, recordingDuration, selfAssessment, resetRecording, isLast, finishSession, nextQuestion, isSupported]);

  const handleReRecord = useCallback(async () => {
    resetRecording();
    setSelfAssessment({});
    setPhase('record');

    const stream = streamRef.current;
    if (stream) {
      audioContextRef.current?.close();
      const ac = new AudioContext();
      if (ac.state === 'suspended') await ac.resume();
      const analyser = ac.createAnalyser();
      analyser.fftSize = 256;
      const source = ac.createMediaStreamSource(stream);
      source.connect(analyser);
      audioContextRef.current = ac;
      analyserRef.current = analyser;
    }
  }, [resetRecording]);

  const handleTryAgain = useCallback(() => {
    setMicError(null);
    resetRecording();
    setPhase(isSupported ? 'record' : 'review');
  }, [resetRecording, isSupported]);

  const toggleAssessment = useCallback((key: string) => {
    setSelfAssessment(prev => {
      const next = { ...prev, [key]: !prev[key] };
      const analysis = selfAssessmentToAnswerAnalysis(next);
      feedbackTextRef.current = generateFeedback(analysis);
      return next;
    });
  }, []);

  const handleClose = useCallback(() => {
    const hasProgress = questionIndex > 0 || recordingDuration > 0;
    if (hasProgress && !window.confirm('Exit Interview? Your progress will be lost.')) return;
    if (onClose) {
      onClose();
    } else {
      emit('CLOSE_INTERVIEW_TRAINER', {});
    }
  }, [questionIndex, recordingDuration, onClose]);

  const handleRetry = useCallback(() => {
    setShowResults(false);
    resetSession();
    setPhase('idle');
  }, [resetSession]);

  const handleResultsComplete = useCallback(() => {
    const s = getSessions().find(s => s.id === sessionId);
    if (s) {
      emit('INTERVIEW_SESSION_COMPLETE', { session: s });
    }
    markInterviewPracticeToday();
    onClose();
  }, [sessionId, onClose]);

  if (showResults) {
    return createPortal(
      <ResultsScreen
        professionId={professionId}
        onRetry={handleRetry}
        onComplete={handleResultsComplete}
      />,
      document.body
    );
  }

  return createPortal(
    <div className="interview-trainer-overlay">
      <div className="interview-trainer-bg" />

      {recordingToast && (
        <div className="interview-trainer-toast">{recordingToast}</div>
      )}

      {!started && (
        <div className="interview-trainer-start">
          <div className="interview-trainer-start-icon"><Icon name="microphone" size={64} color="#00e5e0" /></div>
          <h2 className="interview-trainer-start-title">Interview Challenge</h2>
          <p className="interview-trainer-start-desc">
            Practice answering {questions.length} common interview questions.
            You'll be recorded and can self-assess your responses.
          </p>
          <button className="interview-trainer-start-btn" onClick={handleStartSession}>
            Begin Challenge
          </button>
        </div>
      )}

      {started && phase === 'error' && micError === 'no_mic' && (
        <div className="interview-trainer-error">
          <div className="interview-trainer-error-icon"><Icon name="microphone" size={48} /></div>
          <h3 className="interview-trainer-error-title">Microphone access is required</h3>
          <p className="interview-trainer-error-desc">
            Please allow microphone access in your browser or device settings to record your answers.
          </p>
          <div className="interview-trainer-error-actions">
            <button className="interview-trainer-start-btn" onClick={handleTryAgain}>
              Try Again
            </button>
            <button
              className="interview-trainer-error-settings"
              onClick={() => window.open('app-settings:', '_blank')}
            >
              Open Settings
            </button>
          </div>
        </div>
      )}

      {started && phase === 'error' && micError === 'too_short' && (
        <div className="interview-trainer-error">
          <div className="interview-trainer-error-icon"><Icon name="clock" size={48} /></div>
          <h3 className="interview-trainer-error-title">Recording too short</h3>
          <p className="interview-trainer-error-desc">
            Your recording was less than a second. Please try again and speak your answer.
          </p>
          <button className="interview-trainer-start-btn" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      )}

      {started && !isSupported && phase !== 'error' && (
        <div className="interview-trainer-unsupported-banner">
          Recording not supported on this device. Type your answer instead.
        </div>
      )}

      {started && phase === 'record' && isSupported && (
        <RecordPhase
          questionIndex={questionIndex}
          totalQuestions={questions.length}
          currentQuestion={question}
          isRecording={isRecording}
          recordingDuration={recordingDuration}
          onStartRecord={handleStartRecord}
          onStopRecord={handleStopRecord}
          onClose={handleClose}
          onSpeakQuestion={speakQuestion}
          analyserRef={analyserRef}
          professionId={professionId}
        />
      )}

      {started && phase === 'review' && isSupported && (
        <ReviewPhase
          questionIndex={questionIndex}
          totalQuestions={questions.length}
          currentQuestion={question}
          audioBlob={audioBlob}
          audioUrl={audioUrl}
          currentResultId={currentResultId}
          selfAssessment={selfAssessment}
          onToggleAssessment={toggleAssessment}
          onReRecord={handleReRecord}
          onNextQuestion={handleNextQuestion}
          onClose={handleClose}
          audioRef={audioRef as React.RefObject<HTMLAudioElement>}
        />
      )}

      {started && phase === 'review' && !isSupported && (
        <div className="interview-trainer-body">
          <div className="interview-trainer-question-card">
            <span className="interview-trainer-question-label">QUESTION {questionIndex + 1}</span>
            <p className="interview-trainer-question-text">{question}</p>
          </div>
          <p className="interview-trainer-review-label">Your Answer</p>
          <textarea
            className="interview-trainer-textarea"
            placeholder="Type your answer here..."
            value={textAnswer}
            onChange={e => setTextAnswer(e.target.value)}
            rows={5}
          />
          <div className="interview-trainer-actions">
            <button className="interview-trainer-next-btn" onClick={handleNextQuestion}>
              {isLast ? 'Finish Session' : 'Next Question →'}
            </button>
          </div>
          <button className="interview-exit-btn" onClick={handleClose}>
            ← Exit
          </button>
        </div>
      )}
    </div>,
    document.body
  );
}
