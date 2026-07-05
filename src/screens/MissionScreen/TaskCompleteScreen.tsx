import { createPortal } from 'react-dom';
import { ProgressRing } from '@/components/layout/ProgressRing';
import { useWorldConfettiColors } from '@/core/world/useWorldConfettiColors';

export interface TaskCompleteNextTask {
  title: string;
  index: number;
  total: number;
  estimatedMinutes: number;
}

interface TaskCompleteScreenProps {
  backgroundImage?: string;
  skillProgressPercent: number;
  xpGained: number;
  readinessDelta: number;
  confidenceDelta: number;
  tasksCompleted: number;
  totalTasks: number;
  /** Whether this was the last node in the chapter — shows Chapter Complete banner */
  isChapterComplete?: boolean;
  chapterTitle?: string;
  nextTask?: TaskCompleteNextTask | null;
  onContinue: () => void;
}

export function TaskCompleteScreen({
  backgroundImage,
  skillProgressPercent,
  xpGained,
  readinessDelta,
  confidenceDelta,
  tasksCompleted,
  totalTasks,
  isChapterComplete,
  chapterTitle,
  nextTask,
  onContinue,
}: TaskCompleteScreenProps) {
  const confettiColors = useWorldConfettiColors();

  const isLastTask = tasksCompleted >= totalTasks;
  const showChapterComplete = isChapterComplete || isLastTask;

  return createPortal(
    <div className="task-complete-screen">
      <div
        className="task-complete-bg"
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
      >
        {!backgroundImage && <div className="task-complete-bg-fallback" />}
        <div className="task-complete-bg-scrim" />
      </div>

      <div className="confetti-container">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="confetti-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: confettiColors[i % confettiColors.length],
            }}
          />
        ))}
      </div>

      <div className="task-complete-scroll">
        <div className="task-complete-content">

          {showChapterComplete ? (
            <>
              <div className="task-complete-banner chapter-complete-banner">🏆 CHAPTER COMPLETE!</div>
              <h2 className="task-complete-heading">{chapterTitle ? `${chapterTitle} Mastered` : 'Chapter Mastered!'}</h2>
              <p className="task-complete-subtitle">
                You've completed all {totalTasks} steps. On to the next island!
              </p>
            </>
          ) : (
            <>
              <div className="task-complete-banner">🎉 TASK COMPLETED!</div>
              <h2 className="task-complete-heading">Great work!</h2>
              <p className="task-complete-subtitle">
                Step {tasksCompleted} of {totalTasks} — keep going!
              </p>
            </>
          )}

          <div className="task-complete-ring-wrap">
            <ProgressRing
              progress={Math.round(skillProgressPercent)}
              size={132}
              strokeColor={showChapterComplete ? '#00b894' : '#F5A623'}
              label="CHAPTER PROGRESS"
            />
          </div>

          {/* Earned this mission — always deltas (+N), never absolute scores */}
          <div className="task-complete-rewards">
            <div className="task-complete-reward">
              <span className="task-complete-reward-icon">⭐</span>
              <span className="task-complete-reward-value">+{xpGained} XP</span>
              <span className="task-complete-reward-label">Experience</span>
            </div>
            <div className="task-complete-reward">
              <span className="task-complete-reward-icon">📈</span>
              <span className="task-complete-reward-value">+{readinessDelta}</span>
              <span className="task-complete-reward-label">Readiness</span>
            </div>
            <div className="task-complete-reward">
              <span className="task-complete-reward-icon">❤️</span>
              <span className="task-complete-reward-value">+{confidenceDelta}%</span>
              <span className="task-complete-reward-label">Confidence</span>
            </div>
          </div>

          {/* Chapter progress bar — meaningful because it tracks steps, not a capped global score */}
          <div className="task-complete-chapter-progress">
            <div className="task-complete-chapter-progress-label">
              <span>Chapter progress</span>
              <span>{tasksCompleted} / {totalTasks} steps</span>
            </div>
            <div className="task-complete-chapter-progress-bar">
              <div
                className="task-complete-chapter-progress-fill"
                style={{ width: `${Math.round((tasksCompleted / Math.max(totalTasks, 1)) * 100)}%` }}
              />
            </div>
          </div>

          <button className="task-complete-continue-btn" onClick={onContinue}>
            <span>{showChapterComplete ? 'Next Chapter →' : 'Continue Journey'}</span>
            <span className="task-complete-continue-arrow">{showChapterComplete ? '🗺️' : '→'}</span>
          </button>

          {/* Only show "Coming next" when there is a next task in this chapter */}
          {!showChapterComplete && nextTask && (
            <div className="task-complete-next-card">
              <div className="task-complete-next-text">
                <span className="task-complete-next-label">COMING NEXT</span>
                <span className="task-complete-next-title">
                  Task {nextTask.index} of {nextTask.total}
                </span>
                <span className="task-complete-next-subtitle">{nextTask.title}</span>
                <span className="task-complete-next-time">🕐 {nextTask.estimatedMinutes} min</span>
              </div>
              <div className="task-complete-next-icon">📋</div>
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
}
