import { ProgressRing } from '@/components/layout/ProgressRing';
import { useWorldConfettiColors } from '@/core/world/useWorldConfettiColors';

export interface TaskCompleteNextTask {
  title: string;
  index: number;
  total: number;
  estimatedMinutes: number;
}

interface TaskCompleteScreenProps {
  /** Path to a background photo. Left undefined until real art is supplied
   * — falls back to a themed gradient so the screen never looks broken. */
  backgroundImage?: string;
  skillProgressPercent: number;
  xpGained: number;
  readinessDelta: number;
  confidenceDelta: number;
  tasksCompleted: number;
  totalTasks: number;
  readinessScore: number;
  confidenceScore: number;
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
  readinessScore,
  confidenceScore,
  nextTask,
  onContinue,
}: TaskCompleteScreenProps) {
  // Reuses the same confetti palette/animation already used by
  // ChapterCompleteScreen (.confetti-container / .confetti-particle,
  // defined in JourneyScreen.css) — per request, no new confetti system.
  const confettiColors = useWorldConfettiColors();

  return (
    <div className="task-complete-screen">
      {/* Background photo slot. If none is supplied yet, a themed dark
          gradient fills the space (see .task-complete-bg-fallback) so the
          layout is never blank — swap in the real photo via
          backgroundImage without touching this component. */}
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
          <div className="task-complete-banner">🎉 TASK COMPLETED!</div>
          <h2 className="task-complete-heading">Great work!</h2>
          <p className="task-complete-subtitle">
            You've just completed another step in your journey.
          </p>

          <div className="task-complete-ring-wrap">
            <ProgressRing
              progress={Math.round(skillProgressPercent)}
              size={168}
              strokeColor="#F5A623"
              label="SKILL PROGRESS"
            />
          </div>

          <div className="task-complete-rewards">
            <div className="task-complete-reward">
              <span className="task-complete-reward-icon">⭐</span>
              <span className="task-complete-reward-value">+{xpGained} XP</span>
              <span className="task-complete-reward-label">Experience gained</span>
            </div>
            <div className="task-complete-reward">
              <span className="task-complete-reward-icon">📈</span>
              <span className="task-complete-reward-value">+{readinessDelta} Readiness</span>
              <span className="task-complete-reward-label">You're getting better</span>
            </div>
            <div className="task-complete-reward">
              <span className="task-complete-reward-icon">❤️</span>
              <span className="task-complete-reward-value">+{confidenceDelta} Confidence</span>
              <span className="task-complete-reward-label">Keep it up!</span>
            </div>
          </div>

          <div className="task-complete-stats-card">
            <div className="task-complete-stats-row">
              <span className="task-complete-stats-icon">📋</span>
              <span className="task-complete-stats-label">Tasks Completed</span>
              <span className="task-complete-stats-value task-complete-stats-value--amber">
                {tasksCompleted} / {totalTasks}
              </span>
            </div>
            <div className="task-complete-stats-row">
              <span className="task-complete-stats-icon">📈</span>
              <span className="task-complete-stats-label">Readiness Score</span>
              <span className="task-complete-stats-value task-complete-stats-value--green">
                {Math.round(readinessScore)} / 100
              </span>
            </div>
            <div className="task-complete-stats-row">
              <span className="task-complete-stats-icon">❤️</span>
              <span className="task-complete-stats-label">Confidence Score</span>
              <span className="task-complete-stats-value task-complete-stats-value--red">
                {Math.round(confidenceScore)} / 100
              </span>
            </div>
          </div>

          <button className="task-complete-continue-btn" onClick={onContinue}>
            <span>Continue Journey</span>
            <span className="task-complete-continue-arrow">→</span>
          </button>

          {nextTask && (
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
    </div>
  );
}
