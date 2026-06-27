import { useState, useEffect, useRef, useCallback } from 'react';
import type { TaskContent } from '@/core/task_content';
import { submitTask, createTask } from '@/core/runtime/runtime_controller';
import { speak, stop } from '@/voice/tts';
import './InterviewTrainer.css';

type Phase = 'idle' | 'active' | 'feedback' | 'completed';

type EvaluationResult = {
  score: number;
  matched: string[];
  missing: string[];
  passed: boolean;
};

type InterviewTrainerProps = {
  task: TaskContent;
  onComplete: () => void;
  onClose: () => void;
};

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
  'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'some', 'them',
  'than', 'that', 'this', 'with', 'your', 'each', 'make', 'from', 'they',
  'said', 'what', 'were', 'when', 'will', 'more', 'also', 'its', 'over',
  'such', 'into', 'than', 'then', 'them', 'their', 'there', 'these',
  'about', 'would', 'other', 'which', 'after', 'should', 'where', 'while',
  'three', 'list', 'plan', 'tell', 'meet', 'need', 'step', 'next', 'must',
  'told', 'took', 'done', 'well', 'very', 'just', 'come', 'came', 'give',
  'know', 'like', 'look', 'make', 'take', 'time', 'good', 'best', 'many',
  'some', 'than', 'then', 'thing', 'things', 'much', 'before', 'being',
  'both', 'does', 'done', 'each', 'else', 'ever', 'every', 'five', 'four',
  'give', 'goes', 'going', 'half', 'help', 'here', 'high', 'hold', 'home',
  'keep', 'kind', 'last', 'left', 'life', 'long', 'made', 'many', 'more',
  'most', 'move', 'name', 'need', 'next', 'once', 'only', 'open', 'over',
  'part', 'pick', 'play', 'read', 'real', 'rest', 'said', 'same', 'seen',
  'self', 'show', 'side', 'sign', 'size', 'some', 'sort', 'step', 'sure',
  'take', 'tell', 'than', 'that', 'them', 'then', 'they', 'this', 'time',
  'told', 'took', 'turn', 'upon', 'very', 'want', 'ways', 'well', 'went',
  'what', 'when', 'whom', 'will', 'wish', 'with', 'work', 'year', 'your',
]);

function getTimerSeconds(difficulty: number): number {
  if (difficulty <= 1.2) return 60;
  if (difficulty <= 2.0) return 45;
  return 30;
}

function extractKeywords(criteria: string[]): string[] {
  const keywords = new Set<string>();
  for (const criterion of criteria) {
    const words = criterion.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    for (const word of words) {
      if (word.length > 2 && !STOP_WORDS.has(word)) {
        keywords.add(word);
      }
    }
  }
  return Array.from(keywords);
}

function evaluateAnswer(answer: string, criteria: string[]): EvaluationResult {
  const answerLower = answer.toLowerCase().trim();

  if (!answerLower) {
    return { score: 0, matched: [], missing: extractKeywords(criteria), passed: false };
  }

  const keywords = extractKeywords(criteria);
  if (keywords.length === 0) {
    return { score: 1, matched: [], missing: [], passed: true };
  }

  const matched = keywords.filter(kw => answerLower.includes(kw));
  const missing = keywords.filter(kw => !matched.includes(kw));
  const score = matched.length / keywords.length;

  return {
    score,
    matched,
    missing,
    passed: score >= 0.7,
  };
}

function getDifficultyLabel(difficulty: number): string {
  if (difficulty <= 1.2) return 'Easy';
  if (difficulty <= 2.0) return 'Medium';
  return 'Hard';
}

export function InterviewTrainerScreen({ task, onComplete, onClose }: InterviewTrainerProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [timerValue, setTimerValue] = useState(1);
  const [repeatCount, setRepeatCount] = useState(0);
  const [repeatDisabled, setRepeatDisabled] = useState(false);
  const [answer, setAnswer] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [timeExpired, setTimeExpired] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const cooldownRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);
  const durationRef = useRef(60);
  const answerRef = useRef(answer);
  const phaseRef = useRef(phase);

  useEffect(() => { answerRef.current = answer; }, [answer]);
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
  }, [clearTimer]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const handleTimeout = useCallback(() => {
    clearTimer();
    setTimeExpired(true);
    const currentAnswer = answerRef.current;
    const result = evaluateAnswer(currentAnswer, task.completionCriteria);
    setEvaluation(result);
    setPhase('feedback');
  }, [clearTimer, task.completionCriteria]);

  const startTimer = useCallback((duration: number) => {
    clearTimer();
    durationRef.current = duration;
    startTimeRef.current = Date.now();
    setTimerValue(1);

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, 1 - elapsed / (durationRef.current * 1000));
      setTimerValue(remaining);

      if (remaining <= 0 && phaseRef.current === 'active') {
        clearTimer();
        handleTimeout();
      }
    };

    tick();
    intervalRef.current = window.setInterval(tick, 100);
  }, [clearTimer, handleTimeout]);

  const handleListen = useCallback(() => {
    speak(task.objective, { rate: 0.9 });
    const duration = getTimerSeconds(task.difficulty);
    startTimer(duration);
    setPhase('active');
  }, [task.objective, task.difficulty, startTimer]);

  const handleStart = useCallback(() => {
    const duration = getTimerSeconds(task.difficulty);
    startTimer(duration);
    setPhase('active');
  }, [task.difficulty, startTimer]);

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

  const handleSubmit = useCallback(() => {
    clearTimer();
    const result = evaluateAnswer(answer, task.completionCriteria);
    setEvaluation(result);
    setPhase('feedback');
  }, [answer, task.completionCriteria, clearTimer]);

  const handleTryAgain = useCallback(() => {
    setAnswer('');
    setEvaluation(null);
    setTimeExpired(false);
    setPhase('active');
    const duration = getTimerSeconds(task.difficulty);
    startTimer(duration);
  }, [task.difficulty, startTimer]);

  const handleComplete = useCallback(() => {
    createTask('TEXT_TASK', task.title, task.objective);
    const payload = {
      taskId: task.id,
      completed: true,
      answer,
      score: evaluation?.score ?? 0,
      matched: evaluation?.matched ?? [],
      missing: evaluation?.missing ?? [],
    };
    try {
      submitTask(payload);
    } catch {
      // Runtime task not set up — complete locally
    }
    stop();
    clearTimer();
    setPhase('completed');
  }, [task, answer, evaluation, clearTimer]);

  const handleBackToJourney = useCallback(() => {
    cleanup();
    onComplete();
  }, [cleanup, onComplete]);

  const difficultyLabel = getDifficultyLabel(task.difficulty);
  const timerClass = timerValue < 0.15 ? 'critical' : timerValue < 0.3 ? 'warning' : '';

  return (
    <div className="interview-trainer">
      {/* Timer bar */}
      {phase === 'active' && (
        <div className="trainer-timer-bar">
          <div
            className={`trainer-timer-fill ${timerClass}`}
            style={{ transform: `scaleX(${timerValue})`, width: '100%' }}
          />
        </div>
      )}

      {/* Header */}
      <div className="trainer-header">
        <button className="trainer-back-btn" onClick={phase === 'completed' ? handleBackToJourney : onClose} aria-label="Back to journey">
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
          <button className="trainer-btn primary" onClick={handleStart} aria-label="Start answering">
            ▶ Start
          </button>
        </div>
      )}

      {/* Phase: active */}
      {phase === 'active' && (
        <>
          <div className="trainer-buttons">
            <button
              className="trainer-btn"
              onClick={handleRepeat}
              disabled={repeatDisabled}
              aria-label="Repeat question"
            >
              🔁 Repeat {repeatCount > 0 && `(${repeatCount}/2)`}
            </button>
            <button className="trainer-btn submit" onClick={handleSubmit} aria-label="Submit answer">
              Submit Answer
            </button>
          </div>

          <div className="trainer-answer-area">
            <textarea
              className="trainer-textarea"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              disabled={false}
              autoFocus
              aria-label="Your answer"
            />
          </div>

          <div className="trainer-hints">
            <button
              className="trainer-hints-toggle"
              onClick={() => setShowHints(h => !h)}
              aria-expanded={showHints}
              aria-label="Toggle hints"
            >
              {showHints ? '▼' : '▶'} Need a hint?
            </button>
            {showHints && (
              <div className="trainer-hints-content">
                <ol>
                  {task.instructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </>
      )}

      {/* Phase: feedback */}
      {phase === 'feedback' && evaluation && (
        <div className="trainer-feedback">
          <h3 className={`trainer-feedback-title ${evaluation.passed ? 'pass' : 'fail'}`}>
            {timeExpired ? "Time's up" : evaluation.passed ? '✓ Great answer!' : 'Needs improvement'}
          </h3>

          {evaluation.matched.length > 0 && (
            <div className="trainer-feedback-section">
              <p className="trainer-feedback-label">What you did well</p>
              <div className="trainer-feedback-tags">
                {evaluation.matched.map((m, i) => (
                  <span key={i} className="trainer-feedback-tag matched">{m}</span>
                ))}
              </div>
            </div>
          )}

          {evaluation.missing.length > 0 && (
            <div className="trainer-feedback-section">
              <p className="trainer-feedback-label">What to improve</p>
              <div className="trainer-feedback-tags">
                {evaluation.missing.map((m, i) => (
                  <span key={i} className="trainer-feedback-tag missing">{m}</span>
                ))}
              </div>
            </div>
          )}

          {task.tips.length > 0 && (
            <div className="trainer-feedback-section">
              <p className="trainer-feedback-label">Quick advice</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {task.tips.map((tip, i) => (
                  <li key={i} className="trainer-feedback-text">{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="trainer-feedback-section">
            <p className="trainer-feedback-label">Reference answer</p>
            <p className="trainer-feedback-reference">{task.expectedOutcome}</p>
          </div>

          <p className="trainer-feedback-score">
            Score: {Math.round(evaluation.score * 100)}% · {evaluation.matched.length} of {evaluation.matched.length + evaluation.missing.length} keywords
          </p>

          <div className="trainer-feedback-actions">
            {!evaluation.passed && (
              <button className="trainer-btn" onClick={handleTryAgain} aria-label="Try again">
                Try Again
              </button>
            )}
            <button className="trainer-btn primary" onClick={handleComplete} aria-label="Complete task">
              {evaluation.passed ? 'Complete Task' : 'Continue Anyway'}
            </button>
          </div>
        </div>
      )}

      {/* Phase: completed */}
      {phase === 'completed' && (
        <div className="trainer-completed">
          <div className="trainer-completed-icon">🎉</div>
          <h2>Task Completed</h2>
          <p>Your answer has been submitted and your progress has been saved.</p>
          <button className="trainer-btn primary" onClick={handleBackToJourney} aria-label="Back to journey" style={{ maxWidth: 240, margin: '0 auto' }}>
            Back to Journey
          </button>
        </div>
      )}
    </div>
  );
}
