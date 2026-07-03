import { useState, useCallback, useEffect } from 'react';
import './MissionScreen.css';
import type { JourneyRuntimeState } from '../../core/runtime/journey_runtime';
import { emit, subscribe } from '../../core/events/system_event_bus';
import { loadTaskForNode, createTaskFromDefinition, getActiveTask } from '../../core/runtime/runtime_controller';

interface MissionScreenProps {
  runtimeState: JourneyRuntimeState;
  chapterTitle?: string;
  onComplete: () => void;
  onClose?: () => void;
}

type TaskView = 'active' | 'completing' | 'completed';

export const MissionScreen: React.FC<MissionScreenProps> = ({ runtimeState, chapterTitle, onComplete, onClose }) => {
  const [taskView, setTaskView] = useState<TaskView>('active');
  const [textInput, setTextInput] = useState('');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [reflectionScore, setReflectionScore] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
  }, [activeNodeId]);

  useEffect(() => {
    const unsub = subscribe('MISSION_RESULT', (event) => {
      const payload = event.payload as { success: boolean };
      if (payload.success) {
        setTaskView('completed');
      } else {
        setTaskView('active');
        setErrorMessage('Something went wrong. Try again.');
      }
    });
    return unsub;
  }, []);

  const handleSubmit = useCallback(() => {
    setTaskView('completing');
    setErrorMessage(null);

    emit('MISSION_SUBMIT', {
      text: textInput,
      checked: Array.from(checkedItems),
      score: reflectionScore,
    });
  }, [textInput, checkedItems, reflectionScore]);

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

  const canSubmit = textInput.trim() || checkedItems.size > 0 || reflectionScore > 0;

  return (
    <div className={`mission-screen ${taskView === 'active' ? 'mission-enter' : ''}`}>
      <div className="mission-header">
        <div className="header-day">Day {dayNumber}</div>
        <div className="header-chapter">
          {chapterTitle || runtimeState.activeChapterId || 'Resume'}
        </div>
        <div className="header-scores">
          <div className="score-badge readiness">
            {Math.round(runtimeState.readinessScore)}%
          </div>
          <div className="score-badge confidence">
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

        <div className="mission-card-meta">
          <div className="mission-card-meta-item">
            <span className="mission-card-meta-label">Difficulty</span>
            <span className="mission-card-meta-value">
              {Array(activeTask.difficulty).fill('●').join('')}
              {Array(Math.max(0, 5 - activeTask.difficulty)).fill('○').join('')}
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

        {taskView === 'completed' && (
          <div className="mission-completed">
            <div className="completed-icon">✓</div>
            <div className="completed-text">Mission Complete!</div>
            <button className="mission-primary-btn" onClick={handleContinue}>
              Continue Journey
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
