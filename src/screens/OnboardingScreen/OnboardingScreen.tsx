import React, { useState, useCallback, useMemo } from 'react';
import { Icon } from '../../components/Icon/Icon';
import { PrivacyPolicyScreen } from '../PrivacyPolicyScreen/PrivacyPolicyScreen';
import { getAvailableProfessions } from '@/professions/profession_auto_loader';
import { getProfessionCatalog } from '@/core/profession_metadata';
import './OnboardingScreen.css';

type Profession = string;

export interface OnboardingState {
  profession: Profession;
  biggestFear: string[];
  privacyAgreed: boolean;
}

/**
 * Profession list is built, not hardcoded, so a new profession module
 * (see src/professions/profession_auto_loader.ts) appears here automatically
 * as "available", with no edits needed in this file. Professions in the
 * catalog (src/core/profession_metadata.ts) that aren't registered yet show
 * as "coming soon".
 */
function useProfessionOptions() {
  return useMemo(() => {
    const registered = getAvailableProfessions();
    const registeredIds = new Set(registered.map(p => p.id));
    const catalog = getProfessionCatalog();

    const available = registered.map(p => ({
      id: p.id,
      label: p.title,
      icon: p.icon ?? '💼',
      status: 'available' as const,
    }));

    const comingSoon = catalog
      .filter(p => !registeredIds.has(p.id))
      .map(p => ({
        id: p.id,
        label: p.title,
        icon: p.icon,
        status: 'coming_soon' as const,
      }));

    return [...available, ...comingSoon];
  }, []);
}

const biggestFears: { id: string; label: string; icon: string }[] = [
  { id: 'rejection', label: 'Rejection', icon: '😰' },
  { id: 'interviews', label: 'Interviews', icon: '🎤' },
  { id: 'lack_of_experience', label: 'Lack of experience', icon: '📚' },
  { id: 'salary_negotiation', label: 'Salary negotiation', icon: '💰' },
  { id: 'english_language', label: 'English language', icon: '🌍' },
  { id: 'competition', label: 'Competition', icon: '⚔️' },
  { id: 'not_sure_yet', label: 'Not sure yet', icon: '🤔' },
];

interface OnboardingScreenProps {
  onComplete: (state: OnboardingState) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const professions = useProfessionOptions();
  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [state, setState] = useState<OnboardingState>({
    profession: professions.find(p => p.status === 'available')?.id ?? 'software_engineer',
    biggestFear: [],
    privacyAgreed: false,
  });

  const goNext = useCallback(() => {
    setDirection('next');
    setScreen(s => Math.min(s + 1, 2));
  }, []);

  const goBack = useCallback(() => {
    setDirection('prev');
    setScreen(s => Math.max(s - 1, 0));
  }, []);

  const toggleFear = useCallback((fearId: string) => {
    setState(prev => ({
      ...prev,
      biggestFear: prev.biggestFear.includes(fearId)
        ? prev.biggestFear.filter(f => f !== fearId)
        : [...prev.biggestFear, fearId],
    }));
  }, []);

  const handleComplete = useCallback(() => {
    if (!state.privacyAgreed) return;
    onComplete(state);
  }, [onComplete, state]);

  const slideClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

  return (
    <div className="onboarding-screen">
      {/* Ambient background orbs */}
      <div className="onboarding-orb onboarding-orb--1" />
      <div className="onboarding-orb onboarding-orb--2" />
      <div className="onboarding-orb onboarding-orb--3" />

      {/* Screen 0: Welcome */}
      {screen === 0 && (
        <div className={`onboarding-page onboarding-welcome ${slideClass}`}>
          <div className="welcome-island-wrap">
            <div className="welcome-island-glow" />
            <div className="welcome-island-icon">
              <Icon name="map" size={72} color="#00e5e0" />
            </div>
            <div className="welcome-island-ring" />
          </div>

          <h1 className="welcome-title">Career Navigator</h1>
          <p className="welcome-subtitle">
            Your gamified path to the job you deserve.
          </p>

          <div className="welcome-stats-row">
            <div className="welcome-stat">
              <span className="welcome-stat-num">6</span>
              <span className="welcome-stat-label">Chapters</span>
            </div>
            <div className="welcome-stat-divider" />
            <div className="welcome-stat">
              <span className="welcome-stat-num">41</span>
              <span className="welcome-stat-label">Missions</span>
            </div>
            <div className="welcome-stat-divider" />
            <div className="welcome-stat">
              <span className="welcome-stat-num">1</span>
              <span className="welcome-stat-label">Offer</span>
            </div>
          </div>

          <div className="onboarding-nav" style={{ maxWidth: 280 }}>
            <button className="onboarding-primary-btn" onClick={goNext}>
              Begin Journey
            </button>
          </div>
        </div>
      )}

      {/* Screen 1: Profession */}
      {screen === 1 && (
        <div className={`onboarding-page ${slideClass}`}>
          <div className="onboarding-step-badge">Step 1 of 2</div>
          <h2 className="onboarding-heading">Choose your path</h2>
          <p className="onboarding-subheading">Select the profession you're targeting</p>

          <div className="onboarding-cards">
            {professions.map(p => (
              <div
                key={p.id}
                className={`onboarding-card ${p.status === 'coming_soon' ? 'disabled' : ''} ${
                  state.profession === p.id ? 'selected' : ''
                }`}
                onClick={() => p.status === 'available' && setState(prev => ({ ...prev, profession: p.id }))}
              >
                <span className="card-icon">{p.icon}</span>
                <span className="card-label">{p.label}</span>
                {p.status === 'available' && state.profession === p.id && (
                  <span className="card-check"><Icon name="check" size={14} color="#fff" /></span>
                )}
                {p.status === 'coming_soon' && (
                  <span className="card-status coming_soon">Soon</span>
                )}
              </div>
            ))}
          </div>

          <div className="onboarding-nav">
            <button className="onboarding-back-btn" onClick={goBack}>← Back</button>
            <button className="onboarding-primary-btn" onClick={goNext}>Continue →</button>
          </div>
        </div>
      )}

      {/* Screen 2: Fear + Privacy */}
      {screen === 2 && (
        <div className={`onboarding-page ${slideClass}`}>
          <div className="onboarding-step-badge">Step 2 of 2</div>
          <h2 className="onboarding-heading">Your biggest challenge?</h2>
          <p className="onboarding-subheading">We'll focus on what matters most to you</p>

          <div className="onboarding-cards onboarding-cards--grid">
            {biggestFears.map(f => (
              <div
                key={f.id}
                className={`onboarding-card onboarding-card--compact ${state.biggestFear.includes(f.id) ? 'selected' : ''}`}
                onClick={() => toggleFear(f.id)}
              >
                <span className="card-icon">{f.icon}</span>
                <span className="card-label">{f.label}</span>
                {state.biggestFear.includes(f.id) && (
                  <span className="card-check"><Icon name="check" size={12} color="#fff" /></span>
                )}
              </div>
            ))}
          </div>

          <label className="onboarding-privacy-agree">
            <input
              type="checkbox"
              checked={state.privacyAgreed}
              onChange={e => setState(prev => ({ ...prev, privacyAgreed: e.target.checked }))}
            />
            <span className="onboarding-privacy-checkbox">
              {state.privacyAgreed && <Icon name="check" size={11} color="#fff" />}
            </span>
            <span className="onboarding-privacy-label">
              I agree to the{' '}
              <button
                type="button"
                className="onboarding-privacy-link"
                onClick={() => setShowPrivacyPolicy(true)}
              >
                Privacy Policy
              </button>
            </span>
          </label>

          <div className="onboarding-nav">
            <button className="onboarding-back-btn" onClick={goBack}>← Back</button>
            <button
              className={`onboarding-primary-btn onboarding-start-btn ${!state.privacyAgreed ? '' : 'ready'}`}
              onClick={handleComplete}
              disabled={!state.privacyAgreed}
            >
              Start Journey 🚀
            </button>
          </div>
        </div>
      )}

      {/* Progress dots */}
      <div className="onboarding-progress">
        {[0, 1, 2].map(i => (
          <div key={i} className={`progress-dot ${i === screen ? 'active' : ''} ${i < screen ? 'done' : ''}`} />
        ))}
      </div>

      {showPrivacyPolicy && (
        <PrivacyPolicyScreen onClose={() => setShowPrivacyPolicy(false)} />
      )}
    </div>
  );
};
