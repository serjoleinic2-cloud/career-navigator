import type { CSSProperties } from 'react';
import { getRuntimeState, switchProfession } from '@/core/runtime/runtime_controller';
import { getActiveChapters, getActiveProfession } from '@/core/profession_loader';
import { calculateCareerScore } from '@/core/scoring/career_score';
import { getOwnedProfessionsSummary } from '@/core/premium/profession_progress_summary';
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

  // Only worth showing as a switcher once the user actually owns more
  // than one profession — with a single owned profession this would just
  // be a redundant card repeating what the passport above already shows.
  const ownedProfessions = getOwnedProfessionsSummary(runtime.professionId);
  const showProfessionSwitcher = ownedProfessions.length > 1;

  const handleSwitchProfession = (professionId: string) => {
    if (professionId === runtime.professionId) return;
    switchProfession(professionId);
  };

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

        {showProfessionSwitcher && (
          <div className="profile-professions">
            <div className="profile-professions-title">My Professions</div>
            {ownedProfessions.map(p => (
              <button
                key={p.professionId}
                className={`profile-profession-row ${p.isActive ? 'active' : ''}`}
                onClick={() => handleSwitchProfession(p.professionId)}
                disabled={p.isActive}
              >
                <div className="profile-profession-row-info">
                  <span className="profile-profession-row-title">{p.title}</span>
                  <span className="profile-profession-row-status">
                    {p.isActive ? 'Currently active' : p.started ? `${p.percent}% complete` : 'Not started'}
                  </span>
                </div>
                <div className="profile-profession-row-track">
                  <div className="profile-profession-row-fill" style={{ width: `${p.percent}%` }} />
                </div>
                {!p.isActive && <span className="profile-profession-row-arrow">→</span>}
              </button>
            ))}
          </div>
        )}

        {onClose && (
          <button className="profile-back-btn" onClick={onClose}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
