import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { emit } from '@/core/events/system_event_bus';
import { addSession, updateSession, setSessions, getSessions } from '@/core/interview/interview_store';
import { loadInterviewSessions, saveInterviewSessions } from '@/core/interview/interview_persistence';
import type { InterviewSession, InterviewResult } from '@/core/interview/interview_result';
// TODO: unify with voice/ module when Interview Trainer v2 — MVP uses self-assessment,
// voice/ uses AnswerAnalysis from AI pipeline. Integrating feedback_generator as-is.
import { generateFeedback } from '@/core/voice/feedback_generator';
import type { AnswerAnalysis } from '@/core/voice/interview_state_machine';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getInterviewQuestions } from '@/core/interview/interview_question_loader';
import { useVoiceRecorder } from './hooks/useVoiceRecorder';
import { InterviewResultsScreen } from './InterviewResultsScreen';
import './InterviewTrainerScreen.css';

const PREPARE_SECONDS = 5;
const MAX_RECORD_SECONDS = 60;

type Phase = 'idle' | 'prepare' | 'record' | 'review' | 'error';

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
  const [prepareCount, setPrepareCount] = useState(PREPARE_SECONDS);
  const [selfAssessment, setSelfAssessment] = useState<Record<string, boolean>>({});
  const [currentResultId, setCurrentResultId] = useState<string>('');
  const [sessionId, setSessionId] = useState(() => generateId());
  const [started, setStarted] = useState(false);
  const [micError, setMicError] = useState<ErrorType>(null);
  const [recordingToast, setRecordingToast] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [useFallbackWaveform, setUseFallbackWaveform] = useState(false);
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
    setPhase(recordingSupported ? 'prepare' : 'review');
    setPrepareCount(PREPARE_SECONDS);
    setCurrentResultId(generateId());
  }, [sessionId, recordingSupported]);

  useEffect(() => {
    if (phase !== 'prepare') return;
    if (prepareCount <= 0) {
      setPhase('record');
      return;
    }
    const t = setTimeout(() => setPrepareCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, prepareCount]);

  // Fallback check: if analyser returns zero data after 500ms, use CSS animation
  useEffect(() => {
    if (phase !== 'record' || !isRecording || !analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    const t = setTimeout(() => {
      analyserRef.current!.getByteFrequencyData(data);
      if (data.reduce((a, b) => a + b, 0) === 0) {
        setUseFallbackWaveform(true);
      }
    }, 500);
    return () => clearTimeout(t);
  }, [phase, isRecording]);

  // Waveform draw loop — real analyser data or random fallback
  useEffect(() => {
    if (phase !== 'record' || !isRecording || useFallbackWaveform) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser ? analyser.frequencyBinCount : 30;
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
      } else {
        const barCount = 30;
        const barW = canvas.width / barCount;
        for (let i = 0; i < barCount; i++) {
          const h = Math.random() * canvas.height * 0.8 + canvas.height * 0.1;
          const x = i * barW + 1;
          const g = ctx.createLinearGradient(0, canvas.height, 0, 0);
          g.addColorStop(0, '#0A1A3A');
          g.addColorStop(0.5, '#1E3A5F');
          g.addColorStop(1, '#00F0FF');
          ctx.fillStyle = g;
          ctx.globalAlpha = 0.6 + Math.random() * 0.4;
          ctx.fillRect(x, canvas.height - h, barW - 2, h);
        }
      }
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase, isRecording, useFallbackWaveform]);

  const handleStopRecord = useCallback(() => {
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

      // Connect analyser to the media stream for real waveform data
      try {
        const stream = streamRef.current;
        if (stream) {
          const ac = new AudioContext();
          const analyser = ac.createAnalyser();
          analyser.fftSize = 256;
          const source = ac.createMediaStreamSource(stream);
          source.connect(analyser);
          audioContextRef.current = ac;
          analyserRef.current = analyser;
          setUseFallbackWaveform(false);
        }
      } catch {
        setUseFallbackWaveform(true);
      }
    } catch {
      setMicError('no_mic');
      setPhase('error');
    }
  }, [startRecording]);

  const handleSkipPrepare = useCallback(() => {
    setPrepareCount(0);
    handleStartRecord();
  }, [handleStartRecord]);

  const toggleAssessment = useCallback((key: string) => {
    setSelfAssessment(prev => {
      const next = { ...prev, [key]: !prev[key] };
      const analysis = selfAssessmentToAnswerAnalysis(next);
      feedbackTextRef.current = generateFeedback(analysis);
      return next;
    });
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
    setPhase(recordingSupported ? 'prepare' : 'review');
    setPrepareCount(PREPARE_SECONDS);
    setSelfAssessment({});
    setTextAnswer('');
    setCurrentResultId(generateId());
    feedbackTextRef.current = null;
  }, [saveCurrentResult, resetRecording, isLast, sessionId, onClose, recordingSupported]);

  const handleReRecord = useCallback(() => {
    resetRecording();
    if (audioRef.current) audioRef.current.pause();
    setSelfAssessment({});
    if (recordingSupported) {
      setPhase('prepare');
      setPrepareCount(PREPARE_SECONDS);
    } else {
      setPhase('review');
    }
    feedbackTextRef.current = null;
  }, [resetRecording, recordingSupported]);

  const handleTryAgain = useCallback(() => {
    setMicError(null);
    resetRecording();
    setPhase(recordingSupported ? 'prepare' : 'review');
    setPrepareCount(PREPARE_SECONDS);
  }, [resetRecording, recordingSupported]);

  const handleClose = useCallback(() => {
    const hasProgress = questionIndex > 0 || recordingDuration > 0;
    if (hasProgress && !window.confirm('Exit Interview? Your progress will be lost.')) return;
    if (onClose) {
      onClose();
    } else {
      emit('CLOSE_INTERVIEW_TRAINER', {});
    }
  }, [questionIndex, recordingDuration, onClose]);

  const recordProgress = recordingDuration / MAX_RECORD_SECONDS;

  const clarityScore = selfAssessment.clearConclusion ? 80 : 40;
  const structureScore = selfAssessment.structure ? 100 : 0;
  const confidenceScore = selfAssessment.confidence ? 80 : 40;
  const fillerScore = selfAssessment.noFillers ? 80 : 20;
  const completenessScore = selfAssessment.clearConclusion ? 80 : 40;
  const allScores = [clarityScore, structureScore, confidenceScore, fillerScore, completenessScore];
  const overallScore = Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);
  const star = (v: number) => Math.round(v / 20);
  const stars = (v: number) => '★'.repeat(star(v)) + '☆'.repeat(5 - star(v));

  const STAR_ITEMS = ['Situation', 'Task', 'Action', 'Result'] as const;
  const starChecked = selfAssessment.structure === true;

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

      <div className="interview-trainer-header">
        <button className="interview-trainer-close" onClick={handleClose}>✕</button>
        <span className="interview-trainer-header-title">Interview Challenge</span>
        <span className="interview-trainer-header-count">{questionIndex + 1} / {questions.length}</span>
      </div>

      {/* Toast */}
      {recordingToast && (
        <div className="interview-trainer-toast">{recordingToast}</div>
      )}

      {/* Start screen */}
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

      {/* Error screens */}
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

      {/* Recording unsupported banner */}
      {started && !recordingSupported && phase !== 'error' && (
        <div className="interview-trainer-unsupported-banner">
          Recording not supported on this device. Type your answer instead.
        </div>
      )}

      {/* Main body */}
      {started && (phase === 'prepare' || phase === 'record' || phase === 'review') && (
        <div className="interview-trainer-body">
          <div className="interview-trainer-question-card">
            <span className="interview-trainer-question-label">QUESTION {questionIndex + 1}</span>
            <p className="interview-trainer-question-text">{currentQuestion}</p>
          </div>

          {phase === 'prepare' && recordingSupported && (
            <div className="interview-trainer-prepare">
              <p className="interview-trainer-prepare-text">Get ready to answer...</p>
              <div className="interview-trainer-countdown-ring">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(240,240,245,0.1)" strokeWidth="4" />
                  <circle
                    cx="40" cy="40" r="34" fill="none"
                    stroke="var(--w-primary, #00e5e0)"
                    strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 34}
                    strokeDashoffset={2 * Math.PI * 34 * (1 - prepareCount / PREPARE_SECONDS)}
                    transform="rotate(-90 40 40)"
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <span className="interview-trainer-countdown-number">{prepareCount}</span>
              </div>
              <button className="interview-trainer-skip-btn" onClick={handleSkipPrepare}>
                Skip →
              </button>
            </div>
          )}

          {phase === 'record' && recordingSupported && (
            <div className="interview-trainer-record">
              {useFallbackWaveform ? (
                <div className="waveform-fallback">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="waveform-fallback-bar" style={{ animationDelay: `${i * 0.05}s` }} />
                  ))}
                </div>
              ) : (
                <canvas ref={canvasRef} className="interview-trainer-waveform" width={300} height={80} />
              )}

              <div className="interview-trainer-record-timer-bar">
                <div className="interview-trainer-record-timer-fill" style={{ width: `${recordProgress * 100}%` }} />
              </div>
              <span className="interview-trainer-record-timer-text">
                {recordingDuration}s / {MAX_RECORD_SECONDS}s
              </span>

              {!isRecording ? (
                <button className="interview-trainer-record-btn" onClick={handleStartRecord}>
                  <div className="interview-trainer-record-btn-inner" />
                  <span>Start Recording</span>
                </button>
              ) : (
                <button className="interview-trainer-stop-btn" onClick={handleStopRecord}>
                  <div className="interview-trainer-stop-icon" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          )}

          {phase === 'review' && (
            <div className="interview-trainer-review">
              {recordingSupported && audioBlob && (
                <div className="interview-trainer-audio-player">
                  <audio ref={audioRef} src={URL.createObjectURL(audioBlob)} controls className="interview-trainer-audio" />
                </div>
              )}

              {!recordingSupported && (
                <textarea
                  className="interview-trainer-textarea"
                  placeholder="Type your answer here..."
                  value={textAnswer}
                  onChange={e => setTextAnswer(e.target.value)}
                  rows={5}
                />
              )}

              <p className="interview-trainer-review-label">Self Assessment</p>
              <div className="interview-trainer-checklist">
                {ASSESSMENT_ITEMS.map(item => (
                  <button
                    key={item.key}
                    className={`interview-trainer-check-item ${selfAssessment[item.key] ? 'checked' : ''}`}
                    onClick={() => toggleAssessment(item.key)}
                  >
                    <span className="interview-trainer-check-icon">
                      {selfAssessment[item.key] ? '✓' : '○'}
                    </span>
                    <span className="interview-trainer-check-label">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="review-metrics">
                <div className="review-metric">
                  <span className="review-label">Clarity</span>
                  <span className="review-stars">{stars(clarityScore)}</span>
                  <span className="review-value">{clarityScore}%</span>
                </div>
                <div className="review-metric">
                  <span className="review-label">Structure</span>
                  <span className="review-stars">{stars(structureScore)}</span>
                  <span className="review-value">{structureScore}%</span>
                </div>
                <div className="review-star-checklist">
                  {STAR_ITEMS.map(item => (
                    <span key={item} className="review-star-item">
                      <span className="review-star-icon">{starChecked ? '✓' : '✗'}</span>
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
                <div className="review-metric">
                  <span className="review-label">Confidence</span>
                  <span className="review-stars">{stars(confidenceScore)}</span>
                  <span className="review-value">{confidenceScore}%</span>
                </div>
                <div className="review-metric">
                  <span className="review-label">Filler words</span>
                  <span className="review-stars">{stars(fillerScore)}</span>
                  <span className="review-value">{fillerScore}%</span>
                </div>
                <div className="review-metric review-metric-last">
                  <span className="review-label">Completeness</span>
                  <span className="review-stars">{stars(completenessScore)}</span>
                  <span className="review-value">{completenessScore}%</span>
                </div>
                <div className="review-metric review-metric-overall">
                  <span className="review-label">Overall</span>
                  <span className="review-stars">{stars(overallScore)}</span>
                  <span className="review-value">{overallScore}%</span>
                </div>
              </div>

              <div className="interview-trainer-actions">
                <button className="interview-trainer-rerecord-btn" onClick={handleReRecord}>
                  Re-record
                </button>
                <button className="interview-trainer-next-btn" onClick={handleNextQuestion}>
                  {isLast ? 'Finish Session' : 'Next Question'}
                </button>
              </div>
            </div>
          )}

          <button className="interview-exit-btn" onClick={handleClose}>
            ← Exit Interview
          </button>
        </div>
      )}
    </div>,
    document.body
  );
}
