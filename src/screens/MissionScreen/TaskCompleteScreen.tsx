import { createPortal } from 'react-dom';
import { ProgressRing } from '@/components/layout/ProgressRing';
import { useWorldConfettiColors } from '@/core/world/useWorldConfettiColors';
import { Icon } from '@/components/Icon/Icon';

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
  /** Title of the next chapter — shown as "Coming next" when this screen
   *  is the chapter-complete variant (there is no next *task* to preview
   *  in that case, only the next chapter). */
  nextChapterTitle?: string | null;
  onContinue: () => void;
}

// Reference maximums used only to turn each reward delta into a ring
// percentage — these are not hard caps on what a task can award, just a
// realistic "out of" scale for the diagram (see task_content_engine.ts
// rewards, which top out around these values for a single mission).
const XP_REFERENCE_MAX = 25;
const READINESS_REFERENCE_MAX = 10;
const CONFIDENCE_REFERENCE_MAX = 20;

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
  nextChapterTitle,
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
              <div className="task-complete-banner chapter-complete-banner"><Icon name="trophy" size={16} color="#00b894" /> CHAPTER COMPLETE!</div>
              <h2 className="task-complete-heading">{chapterTitle ? `${chapterTitle} Mastered` : 'Chapter Mastered!'}</h2>
              <p className="task-complete-subtitle">
                You've completed all {totalTasks} steps. On to the next island!
              </p>
            </>
          ) : (
            <>
              <div className="task-complete-banner"><Icon name="party" /> TASK COMPLETED!</div>
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
            <p className="task-complete-ring-explainer">% of this chapter's steps completed so far</p>
          </div>

          {/* Earned this mission — always deltas (+N), never absolute scores.
              Shown as ring diagrams (value out of a realistic reference max)
              instead of bare emoji, so each number has a name and a visual
              sense of scale, not just a floating "+N". */}
          <p className="task-complete-rewards-explainer">
            What you gained from this mission — each ring shows how much of a
            typical mission's reward you earned:
          </p>
          <div className="task-complete-rewards">
            <div className="task-complete-reward">
              <ProgressRing
                progress={Math.min(100, Math.round((xpGained / XP_REFERENCE_MAX) * 100))}
                size={64}
                strokeColor="#F5A623"
                centerText={`+${xpGained}`}
              />
              <span className="task-complete-reward-label">Experience (XP)</span>
              <span className="task-complete-reward-meaning">Overall points earned toward your level</span>
            </div>
            <div className="task-complete-reward">
              <ProgressRing
                progress={Math.min(100, Math.round((readinessDelta / READINESS_REFERENCE_MAX) * 100))}
                size={64}
                strokeColor="#00b894"
                centerText={`+${readinessDelta}`}
              />
              <span className="task-complete-reward-label">Readiness</span>
              <span className="task-complete-reward-meaning">How prepared you are for this chapter's topic</span>
            </div>
            <div className="task-complete-reward">
              <ProgressRing
                progress={Math.min(100, Math.round((confidenceDelta / CONFIDENCE_REFERENCE_MAX) * 100))}
                size={64}
                strokeColor="#e84393"
                centerText={`+${confidenceDelta}%`}
              />
              <span className="task-complete-reward-label">Confidence</span>
              <span className="task-complete-reward-meaning">How sure you feel putting this into practice</span>
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
            <span className="task-complete-continue-arrow">{showChapterComplete ? <Icon name="map" size={16} color="#fff" /> : '→'}</span>
          </button>

          {/* "Coming next" — a task preview mid-chapter, or the next
              chapter's name once this chapter is done. Previously this
              card only rendered for the mid-chapter case, so finishing a
              chapter showed no preview of what's coming at all. */}
          {!showChapterComplete && nextTask && (
            <div className="task-complete-next-card">
              <div className="task-complete-next-text">
                <span className="task-complete-next-label">COMING NEXT</span>
                <span className="task-complete-next-title">
                  Task {nextTask.index} of {nextTask.total}
                </span>
                <span className="task-complete-next-subtitle">{nextTask.title}</span>
                <span className="task-complete-next-time"><Icon name="clock" size={14} /> {nextTask.estimatedMinutes} min</span>
              </div>
              <div className="task-complete-next-icon"><Icon name="resume" /></div>
            </div>
          )}

          {showChapterComplete && nextChapterTitle && (
            <div className="task-complete-next-card">
              <div className="task-complete-next-text">
                <span className="task-complete-next-label">COMING NEXT</span>
                <span className="task-complete-next-title">{nextChapterTitle}</span>
                <span className="task-complete-next-subtitle">New chapter unlocked</span>
              </div>
              <div className="task-complete-next-icon"><Icon name="map" /></div>
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
}
