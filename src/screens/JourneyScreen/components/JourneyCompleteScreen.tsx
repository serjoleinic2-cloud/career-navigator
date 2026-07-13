import { emit } from '@/core/events/system_event_bus';
import { Icon } from '../../../components/Icon/Icon';
import { getProfession } from '@/professions/profession_registry';
import './JourneyCompleteScreen.css';

interface JourneyCompleteScreenProps {
  professionId: string;
  totalSkills: number;
  tasksCompleted: number;
  hoursInvested: number;
  readinessScore: number;
  confidenceScore: number;
  chapters: { title: string; completed: boolean }[];
  onStartInterview: () => void;
  onNewJourney: () => void;
}

export function JourneyCompleteScreen({
  professionId,
  totalSkills,
  tasksCompleted,
  hoursInvested,
  readinessScore,
  confidenceScore,
  chapters,
  onStartInterview,
  onNewJourney,
}: JourneyCompleteScreenProps) {
  // BUGFIX (2026-07-13): "Software Engineer Journey Complete" was hardcoded
  // here, so every other profession's final screen showed the wrong name.
  const professionTitle = getProfession(professionId)?.title || professionId;

  return (
    <div className="journey-complete-screen-root">
      <div className="journey-complete-light" />
      <div className="journey-complete-scroll">
        <div className="journey-complete-content">

          <div className="journey-complete-artwork">
            <div className="artwork-circle">
              <span>🎓</span>
            </div>
          </div>

          <h1 className="journey-complete-title">You Did It!</h1>
          <p className="journey-complete-subtitle">{professionTitle} Journey Complete</p>

          <div className="journey-complete-stats-grid">
            <div className="jc-stat">
              <span className="jc-stat-value">{totalSkills}</span>
              <span className="jc-stat-label">Skills</span>
            </div>
            <div className="jc-stat">
              <span className="jc-stat-value">{tasksCompleted}</span>
              <span className="jc-stat-label">Tasks</span>
            </div>
            <div className="jc-stat">
              <span className="jc-stat-value">{hoursInvested}h</span>
              <span className="jc-stat-label">Hours</span>
            </div>
            <div className="jc-stat">
              <span className="jc-stat-value">{readinessScore}%</span>
              <span className="jc-stat-label">Readiness</span>
            </div>
            <div className="jc-stat">
              <span className="jc-stat-value">{Math.round(confidenceScore)}%</span>
              <span className="jc-stat-label">Confidence</span>
            </div>
          </div>

          <div className="journey-complete-timeline">
            {chapters.map((ch, i) => (
              <div key={i} className={`timeline-item ${ch.completed ? 'timeline-done' : ''}`}>
                <span className="timeline-check">{ch.completed ? <Icon name="check" size={16} /> : '○'}</span>
                <span className="timeline-label">{ch.title}</span>
              </div>
            ))}
          </div>

          <div className="journey-complete-actions">
            <button className="jc-btn jc-btn-primary" onClick={onStartInterview}>
              BEGIN INTERVIEW CHALLENGE
            </button>
            <button className="jc-btn jc-btn-secondary" onClick={onNewJourney}>
              NEW JOURNEY
            </button>
          </div>

          <button
            className="jc-share-icon"
            onClick={() => emit('OPEN_SHARE', {})}
            aria-label="Share"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  );
}
