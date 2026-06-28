import { useState, useEffect, useRef, useCallback } from 'react';
import type { TaskContent } from '@/core/task_content';
import { submitTask, createTask } from '@/core/runtime/runtime_controller';
import { speak, stop } from '@/voice/tts';
import './InterviewTrainer.css';

type Phase = 'idle' | 'countdown' | 'recording' | 'review' | 'feedback' | 'completed';

type TrainerProps = {
  task: TaskContent;
  onComplete: () => void;
  onClose: () => void;
};

const CHECKLIST_ITEMS = [
  'Were there any filler words (um, uh, like)?',
  'Were there long pauses (3+ seconds)?',
  'Was the answer structured (STAR method)?',
  'Did you use weak phrases (I think, maybe, sort of)?',
  'Did you sound confident and clear?',
];

const CHECKLIST_RECOMMENDATIONS: Record<number, string> = {
  0: 'Practice pausing instead of using filler words',
  1: 'Prepare key points before speaking',
  2: 'Use STAR method: Situation, Task, Action, Result',
  3: "Replace 'I think' with direct statements",
  4: 'Practice speaking louder and slower',
};

function getTimerSeconds(difficulty: number): number {
  if (difficulty <= 1.2) return 60;
  if (difficulty <= 2.0) return 45;
  return 30;
}

function getDifficultyLabel(difficulty: number): string {
  if (difficulty <= 1.2) return 'Easy';
  if (difficulty <= 2.0) return 'Medium';
  return 'Hard';
}

export function InterviewTrainerScreen({ task, onComplete, onClose }: TrainerProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [timerValue, setTimerValue] = useState(1);
  const [repeatCount, setRepeatCount] = useState(0);
  const [repeatDisabled, setRepeatDisabled] = useState(false);
  const [countdownValue, setCountdownValue] = useState(5);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [checklist, setChecklist] = useState([false, false, false, false, false]);
  const [checkedCount, setCheckedCount] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const cooldownRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const phaseRef = useRef(phase);
  const startTimeRef = useRef(0);
  const durationRef = useRef(60);

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const cleanup = useCallback(() => {
    stop();
    clearTimer();
    if (cooldownRef.current !== null) {
      clearTimeout(cooldownRef.current);
      cooldownRef.current = null;
    }
    if (countdownRef.current !== null) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, [clearTimer, audioUrl]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    clearTimer();
  }, [clearTimer]);

  const beginRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      };

      recorder.start();
      setPhase('recording');
      setTimerValue(1);
      startTimeRef.current = Date.now();

      intervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, 1 - elapsed / (durationRef.current * 1000));
        setTimerValue(remaining);

        if (remaining <= 0 && phaseRef.current === 'recording') {
          clearTimer();
          stopRecording();
          setPhase('review');
        }
      }, 100);
    } catch {
      setPhase('idle');
    }
  }, [clearTimer, stopRecording]);

  const startCountdown = useCallback(() => {
    setPhase('countdown');
    setCountdownValue(5);
    const duration = getTimerSeconds(task.difficulty);
    durationRef.current = duration;

    countdownRef.current = window.setInterval(() => {
      setCountdownValue(prev => {
        if (prev <= 1) {
          if (countdownRef.current !== null) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
          }
          beginRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [task.difficulty, beginRecording]);

  const handleListen = useCallback(() => {
    speak(task.objective, { rate: 0.9 });
  }, [task.objective]);

  const handleRepeat = useCallback(() => {
    speak(task.objective, { rate: 0.9 });
    const newCount = repeatCount + 1;
    setRepeatCount(newCount);

    if (newCount >= 2) {
      setRepeatDisabled(true);
      cooldownRef.current = window.setTimeout(() => {
        setRepeatDisabled(false);
        setRepeatCount(0);
        cooldownRef.current = null;
      }, 10000);
    }
  }, [task.objective, repeatCount]);

  const handleStopRecording = useCallback(() => {
    stopRecording();
    setPhase('review');
  }, [stopRecording]);

  const toggleChecklist = useCallback((index: number) => {
    setChecklist(prev => {
      const next = [...prev];
      next[index] = !next[index];
      setCheckedCount(next.filter(Boolean).length);
      return next;
    });
  }, []);

  const handleSubmitReview = useCallback(() => {
    clearTimer();
    setPhase('feedback');
  }, [clearTimer]);

  const handleTryAgain = useCallback(() => {
    stop();
    clearTimer();
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setChecklist([false, false, false, false, false]);
    setCheckedCount(0);
    setRepeatCount(0);
    setRepeatDisabled(false);
    setTimerValue(1);
    setPhase('idle');
  }, [clearTimer, audioUrl]);

  const handleComplete = useCallback(() => {
    createTask('TEXT_TASK', task.title, task.objective);
    const score = checkedCount / 5;
    const unchecked = checklist
      .map((v, i) => (!v ? i : -1))
      .filter(i => i !== -1);
    const payload = {
      taskId: task.id,
      completed: true,
      score,
      checkedCount,
      unchecked,
    };
    try {
      submitTask(payload);
    } catch {
      // Runtime task not set up — complete locally
    }
    stop();
    clearTimer();
    setPhase('completed');
  }, [task, checkedCount, checklist, clearTimer]);

  const handleBackToJourney = useCallback(() => {
    cleanup();
    onComplete();
  }, [cleanup, onComplete]);

  const difficultyLabel = getDifficultyLabel(task.difficulty);
  const score = checkedCount / 5;
  const passed = score >= 0.6;
  const timerClass = timerValue < 0.15 ? 'critical' : timerValue < 0.3 ? 'warning' : '';

  return (
    <div className="interview-trainer">
      {/* Timer bar (during recording) */}
      {phase === 'recording' && (
        <div className="trainer-timer-bar">
          <div
            className={`trainer-timer-fill ${timerClass}`}
            style={{ transform: `scaleX(${timerValue})`, width: '100%' }}
          />
        </div>
      )}

      {/* Header */}
      <div className="trainer-header">
        <button
          className="trainer-back-btn"
          onClick={phase === 'completed' ? handleBackToJourney : onClose}
          aria-label="Back to journey"
        >
          ← Back
        </button>
        <span className="trainer-task-label">{difficultyLabel} · {task.estimatedMinutes} min</span>
      </div>

      {/* Question card — always visible */}
      <div className="trainer-question-card">
        <p className="trainer-question-text">{task.objective}</p>
      </div>

      {/* Phase: idle */}
      {phase === 'idle' && (
        <div className="trainer-buttons">
          <button className="trainer-btn" onClick={handleListen} aria-label="Listen to question">
            🔊 Listen
          </button>
          <button
            className="trainer-btn"
            onClick={handleRepeat}
            disabled={repeatDisabled}
            aria-label="Repeat question"
          >
            🔁 Repeat
          </button>
          <button className="trainer-btn primary" onClick={startCountdown} aria-label="Start recording">
            ▶ Start Recording
          </button>
        </div>
      )}

      {/* Phase: countdown */}
      {phase === 'countdown' && (
        <div className="trainer-countdown">
          <div className="trainer-countdown-circle">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <circle
                cx="80" cy="80" r="70"
                fill="none"
                stroke="var(--interview)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 70}
                strokeDashoffset={2 * Math.PI * 70 * (1 - countdownValue / 5)}
                transform="rotate(-90 80 80)"
                style={{ transition: 'stroke-dashoffset 0.9s linear' }}
              />
            </svg>
            <div className="trainer-countdown-number">{countdownValue}</div>
          </div>
          <p className="trainer-countdown-label">Prepare your answer...</p>
        </div>
      )}

      {/* Phase: recording */}
      {phase === 'recording' && (
        <>
          <div className="trainer-recording">
            <div className="trainer-recording-indicator">
              <span className="trainer-recording-dot" />
              <span className="trainer-recording-text">Recording...</span>
            </div>
            <div className="trainer-waveform">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="trainer-waveform-bar" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
            <p className="trainer-recording-hint">Speak clearly into your microphone</p>
          </div>
          <div className="trainer-buttons">
            <button className="trainer-record-btn" onClick={handleStopRecording} aria-label="Stop recording">
              <span className="trainer-record-btn-inner" />
            </button>
            <span className="trainer-record-label">Tap to stop</span>
          </div>
        </>
      )}

      {/* Phase: review */}
      {phase === 'review' && (
        <>
          {audioUrl && (
            <div className="trainer-playback">
              <p className="trainer-feedback-label">Your recording</p>
              <audio controls src={audioUrl} />
            </div>
          )}

          <div className="trainer-checklist">
            <p className="trainer-checklist-title">Self-assessment</p>
            {CHECKLIST_ITEMS.map((item, i) => (
              <label key={i} className="trainer-checklist-item">
                <input
                  type="checkbox"
                  checked={checklist[i]}
                  onChange={() => toggleChecklist(i)}
                />
                <span className="trainer-checklist-label">{item}</span>
              </label>
            ))}
          </div>

          <div className="trainer-buttons">
            <button className="trainer-btn" onClick={handleTryAgain} aria-label="Record again">
              🔄 Record Again
            </button>
            <button className="trainer-btn primary" onClick={handleSubmitReview} aria-label="Submit self-assessment">
              Submit Assessment
            </button>
          </div>
        </>
      )}

      {/* Phase: feedback */}
      {phase === 'feedback' && (
        <div className="trainer-feedback">
          <h3 className={`trainer-feedback-title ${passed ? 'pass' : 'fail'}`}>
            {passed ? '✓ Good self-awareness!' : 'Keep practicing'}
          </h3>

          <div className="trainer-feedback-section">
            <p className="trainer-feedback-label">Score</p>
            <p className="trainer-feedback-score" style={{ margin: 0, fontSize: 32, color: passed ? 'var(--offer)' : 'var(--applications)' }}>
              {Math.round(score * 100)}%
            </p>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              {checkedCount} of 5 checked
            </p>
          </div>

          {checklist.map((v, i) => !v && (
            <div key={i} className="trainer-feedback-section">
              <p className="trainer-feedback-label">{CHECKLIST_ITEMS[i]}</p>
              <p className="trainer-feedback-recommendation">
                {CHECKLIST_RECOMMENDATIONS[i]}
              </p>
            </div>
          ))}

          <div className="trainer-feedback-actions">
            {!passed && (
              <button className="trainer-btn" onClick={handleTryAgain} aria-label="Try again">
                Try Again
              </button>
            )}
            <button className="trainer-btn primary" onClick={handleComplete} aria-label="Complete task">
              {passed ? 'Complete Task' : 'Continue Anyway'}
            </button>
          </div>
        </div>
      )}

      {/* Phase: completed */}
      {phase === 'completed' && (
        <div className="trainer-completed">
          <div className="trainer-completed-icon">🎉</div>
          <h2>Task Completed</h2>
          <p>Your recording and self-assessment have been submitted.</p>
          <button
            className="trainer-btn primary"
            onClick={handleBackToJourney}
            aria-label="Back to journey"
            style={{ maxWidth: 240, margin: '0 auto' }}
          >
            Back to Journey
          </button>
        </div>
      )}
    </div>
  );
}
