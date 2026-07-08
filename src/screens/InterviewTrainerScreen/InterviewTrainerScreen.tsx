import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { emit } from '@/core/events/system_event_bus';
import { addSession, updateSession, setSessions, getSessions } from '@/core/interview/interview_store';
import { loadInterviewSessions, saveInterviewSessions } from '@/core/interview/interview_persistence';
import { generateFeedback } from '@/core/voice/feedback_generator';
import type { InterviewSession, InterviewResult } from '@/core/interview/interview_result';
import type { AnswerAnalysis } from '@/core/voice/interview_state_machine';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getInterviewQuestions } from '@/core/interview/interview_question_loader';
import { speakMale, stop as stopTts } from '@/core/voice/native_tts';
import { useVoiceRecorder } from './hooks/useVoiceRecorder';
import { InterviewResultsScreen } from './InterviewResultsScreen';
import './InterviewTrainerScreen.css';

const MAX_RECORD_SECONDS = 60;

type Phase = 'idle' | 'record' | 'review' | 'error';

type ErrorType = 'no_mic' | 'too_short' | null;

const ASSESSMENT_ITEMS = [
  { key: 'structure', label: 'Structure' },
  { key: 'confidence', label: 'Confidence' },
  { key: 'noFillers', label: 'No Fillers' },
  { key: 'noPauses', label: 'No Long Pauses' },
  { key: 'clearConclusion', label: 'Clear Conclusion' },
] as const;

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

function generateId(): string {
  return `int_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function InterviewTrainerScreen({ onClose }: InterviewTrainerScreenProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [selfAssessment, setSelfAssessment] = useState<Record<string, boolean>>({});
  const [currentResultId, setCurrentResultId] = useState<string>('');
  const [sessionId, setSessionId] = useState(() => generateId());
  const [started, setStarted] = useState(false);
  const [micError, setMicError] = useState<ErrorType>(null);
  const [recordingToast, setRecordingToast] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animFrameRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const feedbackTextRef = useRef<string | null>(null);

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

  const recordingSupported = isSupported;

  const questions = useMemo(() => {
    const pid = getRuntimeState()?.professionId || 'software_engineer';
    return getInterviewQuestions(pid);
  }, []);
  const question = questions[questionIndex] || '';
  const isLast = questionIndex >= questions.length - 1;
  const currentQuestion = useMemo(() => question, [question]);

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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.clientWidth || 320;
    canvas.height = canvas.clientHeight || 80;

    const analyser = analyserRef.current;
    const bufferLength = analyser ? analyser.frequencyBinCount : 0;
    const dataArray = analyser ? new Uint8Array(bufferLength) : null;

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        const barW = canvas.width / bufferLength;
        for (let i = 0; i < bufferLength; i++) {
          const barH = (dataArray[i] / 255) * canvas.height;
          const x = i * barW;
          const y = canvas.height - barH;
          const g = ctx.createLinearGradient(x, canvas.height, x, y);
          g.addColorStop(0, '#0A1A3A');
          g.addColorStop(0.5, '#1E3A5F');
          g.addColorStop(1, '#00F0FF');
          ctx.fillStyle = g;
          ctx.fillRect(x, y, barW - 1, barH);
        }
      }
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase, isRecording]);

  useEffect(() => {
    if (phase !== 'record' || !isRecording) return;
    const timeout = setTimeout(() => {
      stopRecording();
      setPhase('review');
    }, MAX_RECORD_SECONDS * 1000);
    return () => clearTimeout(timeout);
  }, [phase, isRecording, stopRecording]);

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
    feedbackTextRef.current = null;
    setPhase(recordingSupported ? 'record' : 'review');
    setCurrentResultId(generateId());
  }, [sessionId, recordingSupported]);

  const handleStopRecord = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }
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

  const saveCurrentResult = useCallback(() => {
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
  }, [currentResultId, currentQuestion, recordingDuration, selfAssessment, sessionId]);

  const handleNextQuestion = useCallback(() => {
    saveCurrentResult();
    resetRecording();
    if (audioRef.current) audioRef.current.pause();

    if (isLast) {
      updateSession(sessionId, { completedAt: Date.now() });
      saveInterviewSessions(getSessions());
      setShowResults(true);
      return;
    }

    setQuestionIndex(i => i + 1);
    setPhase(recordingSupported ? 'record' : 'review');
    setSelfAssessment({});
    setTextAnswer('');
    setCurrentResultId(generateId());
    feedbackTextRef.current = null;
  }, [saveCurrentResult, resetRecording, isLast, sessionId, onClose, recordingSupported]);

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
    setPhase(recordingSupported ? 'record' : 'review');
  }, [resetRecording, recordingSupported]);

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
    setQuestionIndex(0);
    setStarted(false);
    setPhase('idle');
    setSessionId(generateId());
  }, []);
  const handleResultsComplete = useCallback(() => {
    const s = getSessions().find(s => s.id === sessionId);
    if (s) {
      emit('INTERVIEW_SESSION_COMPLETE', { session: s });
    }
    onClose();
  }, [sessionId, onClose]);

  if (showResults) {
    return createPortal(
      <InterviewResultsScreen
        professionId={getRuntimeState()?.professionId || 'software_engineer'}
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
          <div className="interview-trainer-start-icon">🎤</div>
          <h2 className="interview-trainer-start-title">Interview Challenge</h2>
          <p className="interview-trainer-start-desc">
            Practice answering {questions.length} common interview questions.
            You'll be recorded and can self-assess your responses.
          </p>
          <button className="interview-trainer-start-btn" onClick={startSession}>
            Begin Challenge
          </button>
        </div>
      )}

      {started && phase === 'error' && micError === 'no_mic' && (
        <div className="interview-trainer-error">
          <div className="interview-trainer-error-icon">🎤</div>
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
          <div className="interview-trainer-error-icon">⏱️</div>
          <h3 className="interview-trainer-error-title">Recording too short</h3>
          <p className="interview-trainer-error-desc">
            Your recording was less than a second. Please try again and speak your answer.
          </p>
          <button className="interview-trainer-start-btn" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      )}

      {started && !recordingSupported && phase !== 'error' && (
        <div className="interview-trainer-unsupported-banner">
          Recording not supported on this device. Type your answer instead.
        </div>
      )}

      {started && phase === 'record' && recordingSupported && (
        <div className="interview-record-phase">
          <div className="interview-header">
            <span>{questionIndex + 1}/{questions.length} Interview Challenge</span>
            <button onClick={handleClose}>✕</button>
          </div>

          <div className="interview-photo">
            <img src="/art/software_engineer/interview_man.png" alt="Interviewer"
              onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.parentElement?.classList.add('fallback'); }} />
          </div>

          <p className="interview-question">{currentQuestion}</p>

          <button className="interview-tts" onClick={() => speakQuestion(currentQuestion)}>▶</button>

          <div className="interview-waveform">
            {isRecording ? <canvas ref={canvasRef} /> : <div className="waveform-idle" />}
          </div>

          <span className="interview-timer">{recordingDuration}s / 60s</span>

          {!isRecording ? (
            <button className="interview-record-btn" onClick={handleStartRecord}>● Record</button>
          ) : (
            <button className="interview-stop-btn" onClick={handleStopRecord}>■ Stop</button>
          )}
        </div>
      )}

      {started && phase === 'review' && recordingSupported && (
        <div className="interview-review-phase">
          <div className="interview-header">
            <span>{questionIndex + 1}/{questions.length} Interview Challenge</span>
            <button onClick={handleClose}>✕</button>
          </div>

          <p className="interview-question">{currentQuestion}</p>

          {audioBlob && (
            <audio
              key={currentResultId}
              ref={audioRef}
              controls
              src={audioUrl}
              className="interview-audio-player"
            />
          )}

          <hr />

          <h3>Самооценка</h3>
          {ASSESSMENT_ITEMS.map(item => (
            <label key={item.key} className="interview-check">
              <input
                type="checkbox"
                checked={selfAssessment[item.key] || false}
                onChange={() => toggleAssessment(item.key)}
              />
              {item.label}
            </label>
          ))}

          <hr />

          <div className="interview-actions">
            <button onClick={handleReRecord}>🔄 Переписать</button>
            <button onClick={handleNextQuestion}>Далее →</button>
          </div>
        </div>
      )}

      {started && phase === 'review' && !recordingSupported && (
        <div className="interview-trainer-body">
          <div className="interview-trainer-question-card">
            <span className="interview-trainer-question-label">QUESTION {questionIndex + 1}</span>
            <p className="interview-trainer-question-text">{currentQuestion}</p>
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
            ← Exit Interview
          </button>
        </div>
      )}
    </div>,
    document.body
  );
}
