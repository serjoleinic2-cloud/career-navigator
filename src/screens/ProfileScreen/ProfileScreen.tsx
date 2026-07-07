import { useState } from 'react';
import type { CSSProperties } from 'react';
import { getRuntimeState, devCompleteAllChaptersExceptLast } from '@/core/runtime/runtime_controller';
import { getActiveChapters, getActiveProfession } from '@/core/profession_loader';
import { calculateCareerScore } from '@/core/scoring/career_score';
import { ShareScreen } from '@/screens/ShareScreen/ShareScreen';
import './ProfileScreen.css';

// PROFILE (per +Window_functional.md): "Паспорт путешественника" — replaces
// the old standalone Share tab. Share now lives here as an action
// ("Share Progress"), opened as a sub-screen overlay, not a permanent tab.
//
// All numbers on this screen are derived from real runtime state
// (chapterProgress / confidenceScore / readinessScore / nodeStates) — none
// of them are placeholder/fake values. Where the design doc asks for a
// metric the runtime doesn't track as its own field (Consistency, Interview
// Readiness), it's computed from data that already exists rather than
// invented: Consistency = average completion % across all chapters
// (a proxy for "steady progress across areas" rather than one chapter
// carrying the whole score), Interview Readiness = the Interviews chapter's
// own completion %.
export function ProfileScreen({ style, onClose }: { style?: CSSProperties; onClose?: () => void }) {
  const [showShare, setShowShare] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const runtime = getRuntimeState();
  const profession = getActiveProfession();
  const chapters = getActiveChapters();

  if (!runtime) {
    return (
      <div className="profile-screen" style={style}>
        {onClose && <button className="profile-close-btn" onClick={onClose}>✕</button>}
        <div className="profile-empty">Start your journey to build a profile.</div>
      </div>
    );
  }

  const progressValues = chapters.map(c => runtime.chapterProgress[c.id] ?? 0);
  const overallJourneyPct = progressValues.length > 0
    ? Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length)
    : 0;

  const confidencePct = Math.round(runtime.confidenceScore * 100);
  const readinessPct = Math.round(runtime.readinessScore);
  const consistencyPct = overallJourneyPct; // average completion across chapters
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

  const totalNodes = Object.keys(runtime.nodeStates).length;
  const completedNodes = Object.values(runtime.nodeStates).filter(
    n => n.state === 'confidence' || n.state === 'execution'
  ).length;

  // Level: simple, honest derivation from real progress — one level per
  // ~2 completed nodes, floor 1. Not a separate hidden XP system.
  const level = Math.max(1, Math.floor(completedNodes / 2) + 1);

  const daysSinceStart = runtime.createdAt
    ? Math.max(0, Math.floor((Date.now() - runtime.createdAt) / (1000 * 60 * 60 * 24)))
    : 0;

  const achievements: { icon: string; label: string; earned: boolean }[] = [
    { icon: '🚀', label: 'First Steps', earned: completedNodes >= 1 },
    { icon: '📄', label: 'Resume Master', earned: resumePct >= 100 },
    { icon: '🔗', label: 'LinkedIn Pro', earned: (runtime.chapterProgress['linkedin'] ?? 0) >= 100 },
    { icon: '🎯', label: 'On Target', earned: applicationsPct >= 100 },
    { icon: '🎤', label: 'Interview Ready', earned: interviewReadinessPct >= 100 },
    { icon: '🏆', label: 'Offer Secured', earned: (runtime.chapterProgress['offer'] ?? 0) >= 100 },
  ];

  return (
    <div className="profile-screen" style={style}>
      {onClose && <button className="profile-close-btn" onClick={onClose}>✕</button>}

      <button
        className="profile-settings-btn"
        onClick={() => setShowSettings(true)}
        aria-label="Settings"
      >
        ⚙️
      </button>

      <div className="profile-scroll">
        <div className="profile-header">
          <div className="profile-avatar">🧭</div>
          <div className="profile-name">Explorer</div>
          <div className="profile-level">Level {level}</div>
          <div className="profile-profession">{profession?.title || 'Career Explorer'}</div>
          <div className="profile-journey-bar-wrap">
            <div className="profile-journey-bar-track">
              <div className="profile-journey-bar-fill" style={{ width: `${overallJourneyPct}%` }} />
            </div>
            <span className="profile-journey-pct">{overallJourneyPct}% Journey</span>
          </div>
        </div>

        <div className="profile-stats-grid">
          <div className="profile-stat-card">
            <span className="profile-stat-value">{careerScore}</span>
            <span className="profile-stat-label">Career Score</span>
          </div>
          <div className="profile-stat-card">
            <span className="profile-stat-value">{confidencePct}%</span>
            <span className="profile-stat-label">Confidence</span>
          </div>
          <div className="profile-stat-card">
            <span className="profile-stat-value">{readinessPct}%</span>
            <span className="profile-stat-label">Readiness</span>
          </div>
          <div className="profile-stat-card">
            <span className="profile-stat-value">{consistencyPct}%</span>
            <span className="profile-stat-label">Consistency</span>
          </div>
          <div className="profile-stat-card">
            <span className="profile-stat-value">{interviewReadinessPct}%</span>
            <span className="profile-stat-label">Interview Readiness</span>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="profile-section-title">Achievements</h3>
          <div className="profile-achievements-grid">
            {achievements.map(a => (
              <div key={a.label} className={`profile-achievement ${a.earned ? 'earned' : 'locked'}`}>
                <span className="profile-achievement-icon">{a.earned ? a.icon : '🔒'}</span>
                <span className="profile-achievement-label">{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h3 className="profile-section-title">Visited Islands</h3>
          <div className="profile-islands-list">
            {chapters.map(c => {
              const pct = Math.round(runtime.chapterProgress[c.id] ?? 0);
              const visited = pct >= 100;
              return (
                <div key={c.id} className="profile-island-row">
                  <span className="profile-island-check">{visited ? '✓' : '□'}</span>
                  <span className="profile-island-title">{c.title}</span>
                  <span className="profile-island-pct">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="profile-section">
          <h3 className="profile-section-title">Statistics</h3>
          <div className="profile-stats-list">
            <div className="profile-stats-row">
              <span>Skills completed</span>
              <span>{completedNodes} / {totalNodes}</span>
            </div>
            <div className="profile-stats-row">
              <span>Days on journey</span>
              <span>{daysSinceStart}</span>
            </div>
            <div className="profile-stats-row">
              <span>Current chapter</span>
              <span>{chapters.find(c => c.id === runtime.activeChapterId)?.title || '—'}</span>
            </div>
          </div>
        </div>

        <button className="profile-share-btn" onClick={() => setShowShare(true)}>
          🔗 Share Progress
        </button>
      </div>

      {showShare && (
        <div className="profile-overlay">
          <ShareScreen onClose={() => setShowShare(false)} />
        </div>
      )}

      {showSettings && (
        <div className="profile-overlay">
          <div className="profile-settings-sheet">
            <button className="profile-close-btn" onClick={() => setShowSettings(false)}>✕</button>
            <h2 className="profile-settings-title">Settings</h2>
            {/* Placeholder menu — not wired to real functionality yet.
                Each of these needs its own implementation (i18n system,
                theme switcher, notification permissions, JSZip backup/
                restore already exists in Moodos and can be ported). */}
            <div className="profile-settings-list">
              {['Language', 'Theme', 'Notifications', 'Backup', 'Restore', 'Privacy', 'About'].map(item => (
                <div key={item} className="profile-settings-item">{item}</div>
              ))}
              <button
                className="profile-settings-item profile-settings-dev-btn"
                onClick={() => {
                  devCompleteAllChaptersExceptLast();
                  setShowSettings(false);
                }}
              >
                🧪 Test 1: Complete all chapters except last
              </button>
            </div>
            <button className="profile-back-btn" onClick={() => setShowSettings(false)}>← Назад</button>
          </div>
        </div>
      )}
    </div>
  );
}
