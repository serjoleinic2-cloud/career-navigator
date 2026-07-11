import React, { useState, useCallback } from 'react';
import { Icon } from '../../components/Icon/Icon';
import { PrivacyPolicyScreen } from '../PrivacyPolicyScreen/PrivacyPolicyScreen';
import './OnboardingScreen.css';

type Profession = 'software_engineer' | 'data_scientist' | 'product_manager';

export interface OnboardingState {
  profession: Profession;
  biggestFear: string[];
  privacyAgreed: boolean;
}

const professions: { id: Profession; label: string; status: 'available' | 'coming_soon' }[] = [
  { id: 'software_engineer', label: 'Software Engineer', status: 'available' },
  { id: 'data_scientist', label: 'Data Scientist', status: 'coming_soon' },
  { id: 'product_manager', label: 'Product Manager', status: 'coming_soon' },
];

const biggestFears: { id: string; label: string }[] = [
  { id: 'rejection', label: 'Rejection' },
  { id: 'interviews', label: 'Interviews' },
  { id: 'lack_of_experience', label: 'Lack of experience' },
  { id: 'salary_negotiation', label: 'Salary negotiation' },
  { id: 'english_language', label: 'English language' },
  { id: 'competition', label: 'Competition' },
  { id: 'not_sure_yet', label: 'Not sure yet' },
];

interface OnboardingScreenProps {
  onComplete: (state: OnboardingState) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [state, setState] = useState<OnboardingState>({
    profession: 'software_engineer',
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
      {/* Screen 0: Welcome */}
      {screen === 0 && (
        <div className={`onboarding-page onboarding-welcome ${slideClass}`}>
          <div className="welcome-illustration">
            <div className="illustration-placeholder"><Icon name="map" /></div>
          </div>
          <h1 className="welcome-title">Career Navigator</h1>
          <p className="welcome-subtitle">
            Become the engineer companies compete for.
          </p>
          <button className="onboarding-primary-btn" onClick={goNext}>
            Begin Journey
          </button>
        </div>
      )}

      {/* Screen 1: Profession */}
      {screen === 1 && (
        <div className={`onboarding-page ${slideClass}`}>
          <h2 className="onboarding-heading">Choose your profession</h2>
          <div className="onboarding-cards">
            {professions.map(p => (
              <div
                key={p.id}
                className={`onboarding-card ${p.status === 'coming_soon' ? 'disabled' : ''} ${
                  state.profession === p.id ? 'selected' : ''
                }`}
                onClick={() => p.status === 'available' && setState(prev => ({ ...prev, profession: p.id }))}
              >
                <span className="card-label">{p.label}</span>
                <span className={`card-status ${p.status}`}>
                  {p.status === 'available' ? 'Available' : 'Coming Soon'}
                </span>
              </div>
            ))}
          </div>
          <div className="onboarding-nav">
            <button className="onboarding-back-btn" onClick={goBack}>Back</button>
            <button className="onboarding-primary-btn" onClick={goNext}>Continue</button>
          </div>
        </div>
      )}

      {/* Screen 2: Fear + Privacy */}
      {screen === 2 && (
        <div className={`onboarding-page ${slideClass}`}>
          <h2 className="onboarding-heading">Biggest Challenge</h2>
          <p className="onboarding-subheading">What's your biggest challenge?</p>
          <div className="onboarding-cards">
            {biggestFears.map(f => (
              <div
                key={f.id}
                className={`onboarding-card ${state.biggestFear.includes(f.id) ? 'selected' : ''}`}
                onClick={() => toggleFear(f.id)}
              >
                <span className="card-label">{f.label}</span>
                {state.biggestFear.includes(f.id) && <span className="card-check"><Icon name="check" /></span>}
              </div>
            ))}
          </div>

          <label className="privacy-checkbox">
            <input
              type="checkbox"
              checked={state.privacyAgreed}
              onChange={e => setState(prev => ({ ...prev, privacyAgreed: e.target.checked }))}
            />
            <span className="onboarding-privacy-checkbox">
              {state.privacyAgreed && <Icon name="check" size={14} color="#0b0e14" />}
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
            <button className="onboarding-back-btn" onClick={goBack}>Back</button>
            <button
              className="onboarding-primary-btn onboarding-start-btn"
              onClick={handleComplete}
              disabled={!state.privacyAgreed}
            >
              Start My Journey
            </button>
          </div>
        </div>
      )}

      {/* Progress dots */}
      <div className="onboarding-progress">
        {[0, 1, 2].map(i => (
          <div key={i} className={`progress-dot ${i === screen ? 'active' : ''}`} />
        ))}
      </div>

      {showPrivacyPolicy && (
        <PrivacyPolicyScreen onClose={() => setShowPrivacyPolicy(false)} />
      )}
    </div>
  );
};
