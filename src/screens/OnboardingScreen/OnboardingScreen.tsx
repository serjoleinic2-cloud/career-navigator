import React, { useState, useCallback } from 'react';
import { Icon } from '../../components/Icon/Icon';
import './OnboardingScreen.css';

type Profession = 'software_engineer' | 'data_scientist' | 'product_manager';
type Experience = 'junior' | 'middle' | 'senior';
type Goal = 'first_job' | 'career_switch' | 'interview_prep' | 'skill_growth';
type Timeline = '1_month' | '3_months' | '6_months' | '1_year';
type Preference = 'remote' | 'hybrid' | 'onsite' | 'us' | 'eu';

export interface OnboardingState {
  profession: Profession;
  experience: Experience;
  goals: Goal[];
  timeline: Timeline;
  preferences: Preference[];
}

const professions: { id: Profession; label: string; status: 'available' | 'coming_soon' }[] = [
  { id: 'software_engineer', label: 'Software Engineer', status: 'available' },
  { id: 'data_scientist', label: 'Data Scientist', status: 'coming_soon' },
  { id: 'product_manager', label: 'Product Manager', status: 'coming_soon' },
];

const experiences: { id: Experience; label: string }[] = [
  { id: 'junior', label: 'Junior' },
  { id: 'middle', label: 'Middle' },
  { id: 'senior', label: 'Senior' },
];

const goals: { id: Goal; label: string }[] = [
  { id: 'first_job', label: 'Get my first job' },
  { id: 'career_switch', label: 'Career switch' },
  { id: 'interview_prep', label: 'Interview prep' },
  { id: 'skill_growth', label: 'Skill growth' },
];

const timelines: { id: Timeline; label: string }[] = [
  { id: '1_month', label: '1 Month' },
  { id: '3_months', label: '3 Months' },
  { id: '6_months', label: '6 Months' },
  { id: '1_year', label: '1 Year' },
];

const preferences: { id: Preference; label: string }[] = [
  { id: 'remote', label: 'Remote' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'onsite', label: 'On-site' },
  { id: 'us', label: 'US' },
  { id: 'eu', label: 'EU' },
];

interface OnboardingScreenProps {
  onComplete: (state: OnboardingState) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [state, setState] = useState<OnboardingState>({
    profession: 'software_engineer',
    experience: 'junior',
    goals: [],
    timeline: '3_months',
    preferences: [],
  });

  const goNext = useCallback(() => {
    setDirection('next');
    setScreen(s => Math.min(s + 1, 6));
  }, []);

  const goBack = useCallback(() => {
    setDirection('prev');
    setScreen(s => Math.max(s - 1, 0));
  }, []);

  const updateState = useCallback(<K extends keyof OnboardingState>(
    key: K,
    value: OnboardingState[K]
  ) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleGoal = useCallback((goalId: Goal) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId],
    }));
  }, []);

  const togglePreference = useCallback((prefId: Preference) => {
    setState(prev => ({
      ...prev,
      preferences: prev.preferences.includes(prefId)
        ? prev.preferences.filter(p => p !== prefId)
        : [...prev.preferences, prefId],
    }));
  }, []);

  const handleComplete = useCallback(() => {
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
                onClick={() => p.status === 'available' && updateState('profession', p.id)}
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

      {/* Screen 2: Experience */}
      {screen === 2 && (
        <div className={`onboarding-page ${slideClass}`}>
          <h2 className="onboarding-heading">Experience</h2>
          <div className="onboarding-cards">
            {experiences.map(e => (
              <div
                key={e.id}
                className={`onboarding-card ${state.experience === e.id ? 'selected scaled' : ''}`}
                onClick={() => updateState('experience', e.id)}
              >
                <span className="card-label">{e.label}</span>
              </div>
            ))}
          </div>
          <div className="onboarding-nav">
            <button className="onboarding-back-btn" onClick={goBack}>Back</button>
            <button className="onboarding-primary-btn" onClick={goNext}>Continue</button>
          </div>
        </div>
      )}

      {/* Screen 3: Goals */}
      {screen === 3 && (
        <div className={`onboarding-page ${slideClass}`}>
          <h2 className="onboarding-heading">Your Mission</h2>
          <div className="onboarding-cards">
            {goals.map(g => (
              <div
                key={g.id}
                className={`onboarding-card ${state.goals.includes(g.id) ? 'selected' : ''}`}
                onClick={() => toggleGoal(g.id)}
              >
                <span className="card-label">{g.label}</span>
                {state.goals.includes(g.id) && <span className="card-check"><Icon name="check" /></span>}
              </div>
            ))}
          </div>
          <div className="onboarding-nav">
            <button className="onboarding-back-btn" onClick={goBack}>Back</button>
            <button className="onboarding-primary-btn" onClick={goNext}>Continue</button>
          </div>
        </div>
      )}

      {/* Screen 4: Timeline */}
      {screen === 4 && (
        <div className={`onboarding-page ${slideClass}`}>
          <h2 className="onboarding-heading">Timeline</h2>
          <div className="onboarding-cards">
            {timelines.map(t => (
              <div
                key={t.id}
                className={`onboarding-card ${state.timeline === t.id ? 'selected' : ''}`}
                onClick={() => updateState('timeline', t.id)}
              >
                <span className="card-label">{t.label}</span>
              </div>
            ))}
          </div>
          <div className="onboarding-nav">
            <button className="onboarding-back-btn" onClick={goBack}>Back</button>
            <button className="onboarding-primary-btn" onClick={goNext}>Continue</button>
          </div>
        </div>
      )}

      {/* Screen 5: Preferences */}
      {screen === 5 && (
        <div className={`onboarding-page ${slideClass}`}>
          <h2 className="onboarding-heading">Preferences</h2>
          <div className="onboarding-cards">
            {preferences.map(p => (
              <div
                key={p.id}
                className={`onboarding-card ${state.preferences.includes(p.id) ? 'selected' : ''}`}
                onClick={() => togglePreference(p.id)}
              >
                <span className="card-label">{p.label}</span>
                {state.preferences.includes(p.id) && <span className="card-check"><Icon name="check" /></span>}
              </div>
            ))}
          </div>
          <div className="onboarding-nav">
            <button className="onboarding-back-btn" onClick={goBack}>Back</button>
            <button className="onboarding-primary-btn" onClick={goNext}>Continue</button>
          </div>
        </div>
      )}

      {/* Screen 6: Review */}
      {screen === 6 && (
        <div className={`onboarding-page onboarding-review ${slideClass}`}>
          <h2 className="onboarding-heading">Review</h2>
          <div className="review-grid">
            <div className="review-item">
              <div className="review-icon"><Icon name="briefcase" /></div>
              <div className="review-label">Profession</div>
              <div className="review-value">
                {professions.find(p => p.id === state.profession)?.label}
              </div>
            </div>
            <div className="review-item">
              <div className="review-icon"><Icon name="star" /></div>
              <div className="review-label">Experience</div>
              <div className="review-value">
                {experiences.find(e => e.id === state.experience)?.label}
              </div>
            </div>
            <div className="review-item">
              <div className="review-icon"><Icon name="target" /></div>
              <div className="review-label">Goals</div>
              <div className="review-value">
                {state.goals.length} selected
              </div>
            </div>
            <div className="review-item">
              <div className="review-icon">📅</div>
              <div className="review-label">Timeline</div>
              <div className="review-value">
                {timelines.find(t => t.id === state.timeline)?.label}
              </div>
            </div>
            <div className="review-item">
              <div className="review-icon"><Icon name="settings" /></div>
              <div className="review-label">Preferences</div>
              <div className="review-value">
                {state.preferences.length} selected
              </div>
            </div>
          </div>
          <button className="onboarding-primary-btn onboarding-start-btn" onClick={handleComplete}>
            Start Journey
          </button>
        </div>
      )}

      {/* Progress dots */}
      <div className="onboarding-progress">
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className={`progress-dot ${i === screen ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
};
