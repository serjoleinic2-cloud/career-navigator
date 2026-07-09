import type { CSSProperties } from 'react';
import { getRuntimeState } from '@/core/runtime/runtime_controller';
import { getActiveChapters, getActiveProfession } from '@/core/profession_loader';
import { calculateCareerScore } from '@/core/scoring/career_score';
import { Icon } from '@/components/Icon/Icon';
import './ProfileScreen.css';

interface ProfileScreenProps {
  style?: CSSProperties;
  onClose?: () => void;
  onOpenSettings?: () => void;
}

export function ProfileScreen({ style, onClose, onOpenSettings }: ProfileScreenProps) {
  const runtime = getRuntimeState();
  const profession = getActiveProfession();
  const chapters = getActiveChapters();

  if (!runtime) {
    return (
      <div className="profile-screen" style={style}>
        {onClose && <button className="profile-close-btn" onClick={onClose}><Icon name="close" size={16} /></button>}
        <div className="profile-empty">Start your journey to build a profile.</div>
      </div>
    );
  }

  const progressValues = chapters.map(c => runtime.chapterProgress[c.id] ?? 0);
  const overallJourneyPct = progressValues.length > 0
    ? Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length)
    : 0;

  const confidencePct = Math.round(runtime.confidenceScore * 100);
  const consistencyPct = overallJourneyPct;
  const interviewsChapterId = chapters.find(c => c.id === 'interviews')?.id;
  const interviewReadinessPct = interviewsChapterId
    ? Math.round(runtime.chapterProgress[interviewsChapterId] ?? 0)
    : 0;
  const resumePct = Math.round(runtime.chapterProgress['resume'] ?? 0);
  const applicationsPct = Math.round(runtime.chapterProgress['applications'] ?? 0);

  const careerScore = calculateCareerScore({
    resume: resumePct,
    applications: applicationsPct,
    interview: interviewReadinessPct,
    consistency: consistencyPct,
    confidence: confidencePct,
  });

  const daysSinceStart = runtime.journeyStartedAt
    ? Math.max(0, Math.floor((Date.now() - runtime.journeyStartedAt) / (1000 * 60 * 60 * 24)))
    : 0;

  const completedNodes = Object.values(runtime.nodeStates).filter(
    n => n.state === 'confidence' || n.state === 'execution'
  ).length;

  const achievements: { icon: string; label: string; earned: boolean }[] = [
    { icon: '🚀', label: 'First Steps', earned: completedNodes >= 1 },
    { icon: 'resume', label: 'Resume Master', earned: resumePct >= 100 },
    { icon: 'linkedin', label: 'LinkedIn Pro', earned: (runtime.chapterProgress['linkedin'] ?? 0) >= 100 },
    { icon: 'target', label: 'On Target', earned: applicationsPct >= 100 },
    { icon: 'microphone', label: 'Interview Ready', earned: interviewReadinessPct >= 100 },
    { icon: 'trophy', label: 'Offer Secured', earned: (runtime.chapterProgress['offer'] ?? 0) >= 100 },
  ];

  return (
    <div className="profile-screen" style={style}>
      {onClose && <button className="profile-close-btn" onClick={onClose}><Icon name="close" size={16} /></button>}
      {onOpenSettings && (
        <button className="profile-settings-btn" onClick={onOpenSettings} aria-label="Settings">
          <Icon name="settings" />
        </button>
      )}

      <div className="profile-scroll">
        <div className="profile-passport">
          <div className="profile-passport-avatar">
            <Icon name="map" size={36} />
          </div>
          <div className="profile-passport-profession">{profession?.title || 'Career Explorer'}</div>

          <div className="profile-passport-stat">
            <div className="profile-passport-stat-header">
              <span className="profile-passport-stat-label">Career Score</span>
              <span className="profile-passport-stat-value">{careerScore}</span>
            </div>
            <div className="profile-passport-stat-track">
              <div className="profile-passport-stat-fill" style={{ width: `${careerScore}%` }} />
            </div>
          </div>

          <div className="profile-passport-stat">
            <div className="profile-passport-stat-header">
              <span className="profile-passport-stat-label">Confidence</span>
              <span className="profile-passport-stat-value">{confidencePct}%</span>
            </div>
            <div className="profile-passport-stat-track">
              <div className="profile-passport-stat-fill confidence" style={{ width: `${confidencePct}%` }} />
            </div>
          </div>

          <div className="profile-passport-days">
            <Icon name="clock" size={14} color="rgba(240,240,245,0.5)" />
            <span>{daysSinceStart} days in journey</span>
          </div>

          <div className="profile-passport-achievements">
            {achievements.map(a => (
              <div key={a.label} className={`profile-passport-badge ${a.earned ? 'earned' : 'locked'}`} title={a.label}>
                {a.earned ? (
                  ['🚀'].includes(a.icon) ? <span>{a.icon}</span> : <Icon name={a.icon as any} size={20} />
                ) : (
                  <Icon name="lock" size={20} />
                )}
              </div>
            ))}
          </div>
        </div>

        {onClose && (
          <button className="profile-back-btn" onClick={onClose}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
