import { useState } from 'react';
import { PrimaryButton } from '@/components/layout/PrimaryButton';
import { useWorldCssStyle } from '@/core/world/useWorldCssStyle';

interface JourneyCompleteScreenProps {
  totalSkills: number;
  tasksCompleted: number;
  hoursInvested: number;
  readinessScore: number;
  confidenceScore: number;
  chapters: { title: string; completed: boolean }[];
}

export function JourneyCompleteScreen({
  totalSkills,
  tasksCompleted,
  hoursInvested,
  readinessScore,
  confidenceScore,
  chapters,
}: JourneyCompleteScreenProps) {
  const [celebrating, setCelebrating] = useState(false);
  const worldStyle = useWorldCssStyle();

  return (
    <div className="journey-complete-overlay" style={worldStyle}>
      {!celebrating ? (
        <div className="journey-complete-final">
          <div className="journey-complete-light" />

          <div className="journey-complete-final-content">
            <div className="journey-complete-artwork">
              <div className="artwork-placeholder">
                <span>🎓</span>
              </div>
            </div>

            <h1 className="journey-complete-title">Congratulations!</h1>
            <p className="journey-complete-profession">Software Engineer Journey Complete</p>

            <div className="journey-complete-stats-grid">
              <div className="jc-stat">
                <span className="jc-stat-value">{totalSkills}</span>
                <span className="jc-stat-label">Total Skills</span>
              </div>
              <div className="jc-stat">
                <span className="jc-stat-value">{tasksCompleted}</span>
                <span className="jc-stat-label">Tasks Done</span>
              </div>
              <div className="jc-stat">
                <span className="jc-stat-value">{hoursInvested}h</span>
                <span className="jc-stat-label">Invested</span>
              </div>
              <div className="jc-stat">
                <span className="jc-stat-value">{readinessScore}%</span>
                <span className="jc-stat-label">Readiness</span>
              </div>
              <div className="jc-stat">
                <span className="jc-stat-value">{Math.round(confidenceScore * 100)}%</span>
                <span className="jc-stat-label">Confidence</span>
              </div>
            </div>

            <div className="journey-complete-timeline">
              {chapters.map((ch, i) => (
                <div key={i} className={`timeline-item ${ch.completed ? 'timeline-done' : ''}`}>
                  <span className="timeline-check">{ch.completed ? '✓' : '○'}</span>
                  <span className="timeline-label">{ch.title}</span>
                </div>
              ))}
            </div>

            <PrimaryButton onClick={() => setCelebrating(true)}>
              Celebrate
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div className="journey-complete-celebration">
          <div className="celebration-art">
            <div className="celebration-sparkle" />
            <div className="celebration-text">
              <span className="celebration-big">🎉</span>
              <h2>You Did It!</h2>
            </div>
          </div>

          <div className="celebration-actions">
            <button className="celebration-action-btn" onClick={() => navigator.share?.({ title: 'Career Journey Complete' })}>
              Share Achievement
            </button>
            <button className="celebration-action-btn" onClick={() => { window.location.hash = '#onboarding'; }}>
              Start New Profession
            </button>
            <button className="celebration-action-btn primary" onClick={() => { window.location.hash = '#journey'; }}>
              Explore Advanced Paths
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
