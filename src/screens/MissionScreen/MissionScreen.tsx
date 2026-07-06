import { useState, useCallback, useEffect } from 'react';
import './MissionScreen.css';
import './TaskCompleteScreen.css';
import type { JourneyRuntimeState } from '../../core/runtime/journey_runtime';
import { emit, subscribe } from '../../core/events/system_event_bus';
import type { PlaybookCategory } from '../../core/playbook/playbook_types';
import { loadTaskForNode, createTaskFromDefinition, getActiveTask } from '../../core/runtime/runtime_controller';
import { addNote, updateNote, getNotesByTask } from '../../core/user_data/notes/notes_controller';
import { getActiveProfessionId, getActiveChapters } from '../../core/profession_loader';
import { getNextChapter } from '../../core/chapter_engine';
import { TaskCompleteScreen, type TaskCompleteNextTask } from './TaskCompleteScreen';

interface MissionScreenProps {
  runtimeState: JourneyRuntimeState;
  chapterTitle?: string;
  onComplete: () => void;
  onClose?: () => void;
}

type TaskView = 'active' | 'completing' | 'completed' | 'retry';

// Chapter/domain ids (see CHAPTER_ICONS in JourneyHUD) mapped to their
// closest Playbook category, for the "Learn more" button below. Falls
// back to 'resume' if a chapter id isn't in this map rather than
// crashing or silently doing nothing.
const CHAPTER_TO_PLAYBOOK_CATEGORY: Record<string, PlaybookCategory> = {
  resume: 'resume',
  linkedin: 'linkedin',
  applications: 'networking',
  interviews: 'interview',
  interview: 'interview',
  offer: 'salary',
  offer_preparation: 'salary',
};

interface MissionOutcome {
  advanced: boolean;
  feedback?: string;
  recommendation?: string;
  readinessDelta?: number;
  confidenceDelta?: number;
  skillProgressPercent?: number;
}

export const MissionScreen: React.FC<MissionScreenProps> = ({ runtimeState, chapterTitle, onComplete, onClose }) => {
  const [taskView, setTaskView] = useState<TaskView>('active');
  const [textInput, setTextInput] = useState('');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [reflectionScore, setReflectionScore] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<MissionOutcome | null>(null);

  const activeNodeId = runtimeState.activeNodeId;
  const nodeStates = runtimeState.nodeStates;
  const activeNode = nodeStates[activeNodeId];
  const activeTask = activeNode?.tasks?.[0];

  // Ensure the runtime's task-lifecycle state machine (runtime_controller's
  // module-level `activeTask`) actually has a task loaded for this node
  // before the user can submit. Without this, submitTask() always threw
  // 'No active task', which surfaced to the user as
  // 'Something went wrong. Try again.' on every mission, every time.
  useEffect(() => {
    if (!activeNodeId) return;
    if (getActiveTask()?.nodeId === activeNodeId) return;
    const definition = loadTaskForNode(activeNodeId);
    if (definition) {
      createTaskFromDefinition(definition);
    }
  }, [activeNodeId]);

  useEffect(() => {
    setTaskView('active');
    setTextInput('');
    setCheckedItems(new Set());
    setReflectionScore(0);
    setErrorMessage(null);
    setOutcome(null);
  }, [activeNodeId]);

  useEffect(() => {
    const unsub = subscribe('MISSION_RESULT', (event) => {
      const payload = event.payload as {
        success: boolean;
        error?: string;
        advanced?: boolean;
        feedback?: string;
        recommendation?: string;
        readinessDelta?: number;
        confidenceDelta?: number;
        skillProgressPercent?: number;
      };
      if (payload.error) {
        // A real exception was thrown during submission — this is the only
        // case that should surface as "Something went wrong".
        setTaskView('active');
        setErrorMessage(`Something went wrong. Try again. (${payload.error})`);
        return;
      }
      // BUGFIX (2026-07-04): this used to always jump to 'completed' and
      // show "Mission Complete!" regardless of whether the node actually
      // advanced (payload.advanced === skillTransition.changed). Under the
      // current "1 success = node done" model, a partial/fail grade means
      // the node did NOT progress, chapter % was not awarded, and the next
      // node stays locked — but the user saw the same success screen and
      // had no idea anything was missing. Now: only a real advance shows
      // the success panel; anything else shows what's missing and lets the
      // user try again with more detail, using the same feedback text the
      // grading engine already computes (task_content_engine.ts).
      setOutcome({
        advanced: !!payload.advanced,
        feedback: payload.feedback,
        recommendation: payload.recommendation,
        readinessDelta: payload.readinessDelta,
        confidenceDelta: payload.confidenceDelta,
        skillProgressPercent: payload.skillProgressPercent,
      });
      setTaskView(payload.advanced ? 'completed' : 'retry');
    });
    return unsub;
  }, []);

  const handleSubmit = useCallback(() => {
    setTaskView('completing');
    setErrorMessage(null);

    // BUGFIX (2026-07-05): the "Your Notes" textarea is the actual written
    // deliverable of every mission (see canSubmit below), but it was only
    // ever used as grading input for submitTask() — never persisted
    // anywhere. Users wrote real reflections on every single mission and
    // then watched them vanish the moment they hit Complete Mission,
    // because nothing called addNote(). Now every submission with a
    // non-empty note also saves a real Note, tagged with the same
    // chapterId/nodeId the Notes screen already groups by (see
    // NotesScreen.tsx CATEGORY_ORDER / grouped-by-chapterId), so it shows
    // up under the right category (Resume/LinkedIn/etc) automatically.
    const trimmed = textInput.trim();
    if (trimmed && activeTask) {
      // Retrying the same mission (e.g. after "Not quite there yet") should
      // update the existing note for this task, not spawn a new duplicate
      // every attempt.
      const existing = getNotesByTask(activeTask.id);
      if (existing.length > 0) {
        updateNote(existing[0].id, { content: trimmed });
      } else {
        addNote({
          professionId: getActiveProfessionId() || '',
          chapterId: runtimeState.activeChapterId || '',
          nodeId: activeNodeId,
          taskId: activeTask.id,
          title: activeTask.title,
          content: trimmed,
        });
      }
    }

    emit('MISSION_SUBMIT', {
      text: textInput,
      checked: Array.from(checkedItems),
      score: reflectionScore,
    });
  }, [textInput, checkedItems, reflectionScore, activeTask, activeNodeId, runtimeState.activeChapterId]);

  const handleChecklistToggle = useCallback((index: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const handleContinue = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const handleTryAgain = useCallback(() => {
    setTaskView('active');
    setOutcome(null);
  }, []);

  if (!activeTask) {
    return (
      <div className="mission-screen mission-empty">
        {onClose && <button className="mission-close-btn" onClick={onClose}>✕</button>}
        <div className="mission-empty-text">No active mission</div>
        <button className="mission-primary-btn" onClick={onComplete}>
          Return to Journey
        </button>
      </div>
    );
  }

  const dayNumber = Object.values(nodeStates).filter(n =>
    n.state === 'confidence' || n.state === 'execution'
  ).length + 1;

  // BUGFIX (2026-07-04): previously any one of note/checklist/star rating
  // was enough to enable Complete Mission, so a mission could be finished
  // without ever writing a note — checking a single checklist box or
  // tapping one star was enough. The note is the actual deliverable every
  // mission asks for ("Your Notes"), so it's now always required; the
  // checklist and star rating remain optional self-reflection aids on top
  // of it, matching what the hint text under the textarea already says.
  const canSubmit = textInput.trim().length > 0;

  // BUGFIX (2026-07-05): `new Array(n)` throws "Invalid array length" for
  // any non-integer n (e.g. Array(1.5)) — it only accepts a non-negative
  // integer. Some task content has fractional `difficulty` values (e.g.
  // achievement-framing's first task is 1.5), which crashed this whole
  // screen the instant it opened — no error UI existed at the time, so it
  // showed as a black screen requiring an app restart. Clamp + round to a
  // safe 1-5 integer before building the dot rating.
  const difficultyLevel = Math.min(5, Math.max(1, Math.round(activeTask.difficulty || 1)));

  // Data for the full-screen TaskCompleteScreen (taskView === 'completed').
  // Derived from real runtime state — chapter node order/progress, current
  // scores — not hardcoded placeholder numbers.
  const chapters = getActiveChapters();
  // BUGFIX (2026-07-06): this used to look up the chapter via
  // `runtimeState.activeChapterId`. But `submitTask()` (runtime_controller.ts)
  // already advances `activeChapterId` to the NEXT chapter the instant the
  // last node of the current chapter completes — before this screen ever
  // renders. That made `currentChapter` resolve to the next (all-locked)
  // chapter, so "Chapter progress" showed "0/7" instead of "7/7" on the
  // exact screen meant to celebrate finishing it. `activeNodeId` does NOT
  // get advanced until the user taps Continue, so looking the chapter up
  // by which chapter actually contains the just-finished node is stable
  // regardless of when the store's activeChapterId flips.
  const currentChapter = chapters.find(c => c.nodeIds.includes(activeNodeId))
    ?? chapters.find(c => c.id === runtimeState.activeChapterId);
  const chapterNodeIds = currentChapter?.nodeIds ?? [];
  const tasksCompletedInChapter = chapterNodeIds.filter(
    id => nodeStates[id]?.state === 'confidence' || nodeStates[id]?.state === 'execution'
  ).length;
  const nextChapterTitle = currentChapter ? getNextChapter(chapters, currentChapter.id)?.title ?? null : null;

  let nextTaskInfo: TaskCompleteNextTask | null = null;
  if (currentChapter) {
    const currentIndex = chapterNodeIds.indexOf(activeNodeId);
    const nextNodeId = chapterNodeIds[currentIndex + 1];
    const nextNode = nextNodeId ? nodeStates[nextNodeId] : undefined;
    const nextNodeTask = nextNode?.tasks?.[0];
    if (nextNode && nextNodeTask) {
      nextTaskInfo = {
        title: nextNodeTask.title,
        index: currentIndex + 2,
        total: chapterNodeIds.length,
        estimatedMinutes: nextNodeTask.estimatedMinutes,
      };
    }
  }

  // Reward numbers shown on the celebration screen. The engine (see
  // task_content_engine.ts rewards) only tracks confidence (0-1 scale) and
  // readiness (0-100 scale) deltas — there's no separate XP reward field in
  // content data, so XP is derived from those two deltas with a simple,
  // consistent formula rather than inventing unrelated numbers.
  const readinessDeltaShown = Math.round(outcome?.readinessDelta ?? 0);
  const confidenceDeltaShown = Math.round((outcome?.confidenceDelta ?? 0) * 100);
  const xpGained = Math.max(5, readinessDeltaShown * 3 + confidenceDeltaShown * 2);

  // Full-screen celebration takeover (see obrazets.png reference) — replaces
  // the rest of the mission UI entirely while taskView === 'completed', the
  // same way ChapterCompleteScreen takes over for a finished chapter.
  if (taskView === 'completed') {
    const isChapterComplete = tasksCompletedInChapter >= chapterNodeIds.length && chapterNodeIds.length > 0;
    return (
      <TaskCompleteScreen
        skillProgressPercent={outcome?.skillProgressPercent ?? runtimeState.chapterProgress?.[runtimeState.activeChapterId] ?? 0}
        xpGained={xpGained}
        readinessDelta={readinessDeltaShown}
        confidenceDelta={confidenceDeltaShown}
        tasksCompleted={tasksCompletedInChapter}
        totalTasks={chapterNodeIds.length || 1}
        isChapterComplete={isChapterComplete}
        chapterTitle={currentChapter?.title ?? chapterTitle ?? ''}
        nextTask={isChapterComplete ? null : nextTaskInfo}
        nextChapterTitle={isChapterComplete ? nextChapterTitle : null}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className={`mission-screen ${taskView === 'active' ? 'mission-enter' : ''}`}>
      <div className="mission-header">
        <div className="header-day">Day {dayNumber}</div>
        <div className="header-chapter">
          {chapterTitle || runtimeState.activeChapterId || 'Resume'}
        </div>
        <div className="header-scores">
          {/* These are journey-wide running totals, not per-chapter progress.
              Readiness (0-100) measures how prepared you are for the job market;
              Confidence (0-100%) grows with each completed mission. Both
              accumulate across all chapters — reaching 100% here means you have
              completed enough missions across all chapters to max out that score,
              which is expected by the time you reach Interviews. */}
          <div className="score-badge readiness" title="Career Readiness — your overall job-market preparedness score">
            <span className="score-badge-label">Ready</span>
            {Math.round(runtimeState.readinessScore)}%
          </div>
          <div className="score-badge confidence" title="Confidence — how confident you feel across your career journey">
            <span className="score-badge-label">Conf</span>
            {Math.round(runtimeState.confidenceScore * 100)}%
          </div>
        </div>
        {onClose && <button className="mission-close-btn" onClick={onClose} aria-label="Close">✕</button>}
      </div>

      <div className={`mission-card ${taskView === 'completing' ? 'mission-pulse' : ''}`}>
        <div className="task-type-badge">
          {activeTask.completionCriteria.length > 0 ? '☑️ Complete' : '✏️ Write'}
        </div>

        <h2 className="task-title">{activeTask.title}</h2>
        <p className="task-description">{activeTask.objective}</p>

        {/* Was completely missing before — +Window_functional.md requires
            "Любое задание имеет кнопку Learn more которая открывает нужную
            страницу Playbook", but no such button existed anywhere in the
            app, so mission content and the Playbook were never linked.
            Deep-links via OPEN_PLAYBOOK (App.tsx switches tabs and passes
            the category straight to PlaybookScreen). */}
        <button
          type="button"
          className="task-learn-more-btn"
          onClick={() => {
            const category = CHAPTER_TO_PLAYBOOK_CATEGORY[runtimeState.activeChapterId] || 'resume';
            emit('OPEN_PLAYBOOK', { category });
          }}
        >
          📖 Learn more
        </button>

        <div className="mission-card-meta">
          <div className="mission-card-meta-item">
            <span className="mission-card-meta-label">Difficulty</span>
            <span className="mission-card-meta-value">
              {Array(difficultyLevel).fill('●').join('')}
              {Array(Math.max(0, 5 - difficultyLevel)).fill('○').join('')}
            </span>
          </div>
          <div className="mission-card-meta-item">
            <span className="mission-card-meta-label">Est. Time</span>
            <span className="mission-card-meta-value">{activeTask.estimatedMinutes} min</span>
          </div>
        </div>

        {activeTask.instructions.length > 0 && (
          <div className="task-section">
            <div className="task-section-label">Steps</div>
            <ol className="task-instructions">
              {activeTask.instructions.map((inst, i) => (
                <li key={i} className="task-instruction-item">{inst}</li>
              ))}
            </ol>
          </div>
        )}

        <div className="task-content">
          {activeTask.completionCriteria.length > 0 && (
            <div className="task-section">
              <div className="task-section-label">Completion Checklist</div>
              <div className="task-checklist">
                {activeTask.completionCriteria.map((criterion, index) => (
                  <div
                    key={index}
                    className={`checklist-item ${checkedItems.has(index) ? 'checked' : ''}`}
                    onClick={() => handleChecklistToggle(index)}
                  >
                    <div className="checklist-box">
                      {checkedItems.has(index) && <span className="checklist-mark">✓</span>}
                    </div>
                    <span className="checklist-label">{criterion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="task-section">
            <div className="task-section-label">Your Notes</div>
            <textarea
              className="task-textarea"
              placeholder="Write your thoughts, answers, or reflection here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              rows={4}
            />
            <div className={`text-quality-hint ${textInput.trim().length >= 40 ? 'text-quality-hint-ready' : ''}`}>
              {textInput.trim().length >= 40
                ? '✓ Detailed enough for full credit on this mission.'
                : `Write at least 2–3 full sentences (${textInput.trim().length}/40 characters) for full credit. Checklist and star rating below are for your own reflection and don't affect whether this mission counts as a full pass.`}
            </div>
          </div>

          <div className="task-section">
            <div className="task-section-label">Self Assessment</div>
            <div className="task-reflection">
              <div className="reflection-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`reflection-star ${star <= reflectionScore ? 'active' : ''}`}
                    onClick={() => setReflectionScore(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="reflection-label">
                {reflectionScore === 0 && 'Tap to rate your work'}
                {reflectionScore === 1 && 'Needs work'}
                {reflectionScore === 2 && 'Getting there'}
                {reflectionScore === 3 && 'Good'}
                {reflectionScore === 4 && 'Great'}
                {reflectionScore === 5 && 'Excellent'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mission-error">
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="mission-bottom">
        {taskView === 'active' && (
          <button
            className="mission-primary-btn"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            Complete Mission
          </button>
        )}

        {taskView === 'active' && onClose && (
          <button className="mission-back-btn" onClick={onClose}>← Назад</button>
        )}

        {taskView === 'completing' && (
          <div className="mission-completing">
            <div className="completing-spinner" />
            <span>Saving progress...</span>
          </div>
        )}

        {taskView === 'retry' && (
          <div className="mission-completed mission-retry">
            <div className="completed-icon">✎</div>
            <div className="completed-text">Not quite there yet</div>
            {outcome?.feedback && (
              <p className="mission-outcome-feedback">{outcome.feedback}</p>
            )}
            {outcome?.recommendation && (
              <p className="mission-outcome-recommendation">{outcome.recommendation}</p>
            )}
            <button className="mission-primary-btn" onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
