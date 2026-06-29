import { useState, useEffect } from 'react';
import {
  startOnboarding,
  getOnboardingState,
  selectProfession,
  setExperience,
  toggleGoal,
  setTimeline,
  togglePreference,
  setSituation,
  setEmotion,
  nextStep,
  previousStep,
  finishOnboarding,
} from '@/core/onboarding/onboarding_engine';
import { startJourney } from '@/core/runtime/runtime_controller';
import { PrimaryButton } from '@/components/layout/PrimaryButton';

const PAGES = [
  'welcome',
  'profession',
  'experience',
  'mission',
  'timeline',
  'preferences',
  'review',
] as const;

const EXPERIENCE_LEVELS = ['Junior', 'Middle', 'Senior'];
const MISSION_OPTIONS = ['Get my first job', 'Career switch', 'Interview prep', 'Skill growth'];
const TIMELINE_OPTIONS = ['1 Month', '3 Months', '6 Months', '1 Year'];
const PREFERENCE_OPTIONS = ['Remote', 'Hybrid', 'On-site', 'US', 'EU'];

interface Props {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: Props) {
  const [initialized, setInitialized] = useState(false);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [animating, setAnimating] = useState(false);
  const [, setTick] = useState(0);

  const rerender = () => setTick(v => v + 1);

  useEffect(() => {
    if (!initialized) {
      startOnboarding();
      setSituation('no_job');
      setEmotion('confident');
      setInitialized(true);
    }
  }, [initialized]);

  const state = getOnboardingState();
  if (!state || !initialized) return null;

  const comingSoon = [
    { id: 'data_scientist', title: 'Data Scientist', icon: '📊' },
    { id: 'product_manager', title: 'Product Manager', icon: '📋' },
  ];

  const handleNext = () => {
    if (animating) return;
    setDirection('forward');
    setAnimating(true);
    setTimeout(() => {
      const result = nextStep();
      if (result.success) {
        setPage(p => p + 1);
      } else {
        console.warn('[Onboarding] nextStep failed:', result.error);
      }
      rerender();
      setAnimating(false);
    }, 200);
  };

  const handleBack = () => {
    if (animating || page === 0) return;
    setDirection('backward');
    setAnimating(true);
    setTimeout(() => {
      previousStep();
      setPage(p => p - 1);
      rerender();
      setAnimating(false);
    }, 200);
  };

  const handleFinish = () => {
    const finalState = finishOnboarding();
    if (!finalState) {
      return;
    }
    try {
      startJourney(finalState);
      onComplete();
    } catch {
      // fail silently
    }
  };

  const canProceed = (): boolean => {
    switch (page) {
      case 1: return !!state.professionId;
      case 2: return !!state.experienceLevel;
      case 3: return state.goals.length > 0;
      case 4: return !!state.timeline;
      case 5: return state.preferences.length > 0;
      default: return true;
    }
  };

  const isLastPage = page === PAGES.length - 1;

  const reviewItems = [
    { icon: '💼', label: 'Profession', value: state.professionId?.replace(/_/g, ' ') || '-' },
    { icon: '📈', label: 'Experience', value: state.experienceLevel || '-' },
    { icon: '🎯', label: 'Goals', value: state.goals.length > 0 ? state.goals.join(', ') : '-' },
    { icon: '⏱', label: 'Timeline', value: state.timeline || '-' },
    { icon: '🌍', label: 'Preferences', value: state.preferences.length > 0 ? state.preferences.join(', ') : '-' },
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#071320',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Progress bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 10,
        background: 'rgba(255,255,255,0.06)',
      }}>
        <div style={{
          height: '100%',
          width: `${((page + 1) / PAGES.length) * 100}%`,
          background: 'linear-gradient(90deg, #FF6B6B, #FF8E8E)',
          transition: 'width 400ms ease',
          borderRadius: '0 2px 2px 0',
        }} />
      </div>

      {/* Page content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 24px 100px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div key={page} style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          animation: direction === 'forward'
            ? 'onboardingSlideIn 350ms ease forwards'
            : 'onboardingSlideInBack 350ms ease forwards',
          transformOrigin: direction === 'forward' ? 'left center' : 'right center',
        }}>
          {page === 0 && (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              gap: 16,
            }}>
              <div style={{
                width: 160,
                height: 160,
                borderRadius: 40,
                background: 'linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,142,142,0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 72,
                marginBottom: 16,
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                🧭
              </div>
              <h1 style={{
                fontSize: 32,
                fontWeight: 700,
                margin: 0,
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Career Navigator
              </h1>
              <p style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.6)',
                maxWidth: 280,
                lineHeight: 1.6,
                margin: 0,
              }}>
                Become the engineer companies compete for
              </p>
              <div style={{ marginTop: 32, width: '100%', maxWidth: 280 }}>
                <PrimaryButton onClick={handleNext}>
                  Begin Journey
                </PrimaryButton>
              </div>
            </div>
          )}

          {page === 1 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Choose your profession</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 28px' }}>
                Your journey will be tailored to this path
              </p>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <ProfessionCard
                  icon="💻"
                  title="Software Engineer"
                  subtitle="Available"
                  active={state.professionId === 'software_engineer'}
                  onClick={() => { selectProfession('software_engineer'); rerender(); }}
                  disabled={false}
                />
                {comingSoon.map(cs => (
                  <ProfessionCard
                    key={cs.id}
                    icon={cs.icon}
                    title={cs.title}
                    subtitle="Coming Soon"
                    active={false}
                    onClick={() => {}}
                    disabled={true}
                  />
                ))}
              </div>
            </div>
          )}

          {page === 2 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Experience</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 28px' }}>
                Choose your current level
              </p>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {EXPERIENCE_LEVELS.map(level => {
                  const selected = state.experienceLevel === level;
                  return (
                    <button
                      key={level}
                      onClick={() => { setExperience(level); rerender(); }}
                      style={{
                        padding: '20px 24px',
                        borderRadius: 20,
                        border: selected ? '2px solid #FF6B6B' : '1px solid rgba(255,255,255,0.08)',
                        background: selected ? 'rgba(255,107,107,0.12)' : 'rgba(255,255,255,0.04)',
                        color: '#fff',
                        fontSize: 17,
                        fontWeight: selected ? 600 : 400,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                        transform: selected ? 'scale(1.05)' : 'scale(1)',
                        minHeight: 60,
                      }}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {page === 3 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Your Mission</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 28px' }}>
                Select all that apply
              </p>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {MISSION_OPTIONS.map(goal => {
                  const selected = state.goals.includes(goal);
                  return (
                    <button
                      key={goal}
                      onClick={() => { toggleGoal(goal); rerender(); }}
                      style={{
                        padding: '20px 24px',
                        borderRadius: 20,
                        border: selected ? '2px solid #FF6B6B' : '1px solid rgba(255,255,255,0.08)',
                        background: selected ? 'rgba(255,107,107,0.12)' : 'rgba(255,255,255,0.04)',
                        color: '#fff',
                        fontSize: 17,
                        fontWeight: selected ? 600 : 400,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                        minHeight: 60,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <span style={{
                        width: 24,
                        height: 24,
                        borderRadius: 8,
                        border: selected ? 'none' : '2px solid rgba(255,255,255,0.2)',
                        background: selected ? '#FF6B6B' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        flexShrink: 0,
                      }}>
                        {selected ? '✓' : ''}
                      </span>
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {page === 4 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Timeline</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 28px' }}>
                When do you want to achieve your goal?
              </p>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {TIMELINE_OPTIONS.map(option => {
                  const selected = state.timeline === option;
                  return (
                    <button
                      key={option}
                      onClick={() => { setTimeline(option); rerender(); }}
                      style={{
                        padding: '20px 24px',
                        borderRadius: 20,
                        border: selected ? '2px solid #FF6B6B' : '1px solid rgba(255,255,255,0.08)',
                        background: selected ? 'rgba(255,107,107,0.12)' : 'rgba(255,255,255,0.04)',
                        color: '#fff',
                        fontSize: 17,
                        fontWeight: selected ? 600 : 400,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                        transform: selected ? 'scale(1.05)' : 'scale(1)',
                        minHeight: 60,
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {page === 5 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Preferences</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 28px' }}>
                Select all that apply
              </p>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PREFERENCE_OPTIONS.map(pref => {
                  const selected = state.preferences.includes(pref);
                  return (
                    <button
                      key={pref}
                      onClick={() => { togglePreference(pref); rerender(); }}
                      style={{
                        padding: '20px 24px',
                        borderRadius: 20,
                        border: selected ? '2px solid #FF6B6B' : '1px solid rgba(255,255,255,0.08)',
                        background: selected ? 'rgba(255,107,107,0.12)' : 'rgba(255,255,255,0.04)',
                        color: '#fff',
                        fontSize: 17,
                        fontWeight: selected ? 600 : 400,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 200ms ease',
                        minHeight: 60,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <span style={{
                        width: 24,
                        height: 24,
                        borderRadius: 8,
                        border: selected ? 'none' : '2px solid rgba(255,255,255,0.2)',
                        background: selected ? '#FF6B6B' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        flexShrink: 0,
                      }}>
                        {selected ? '✓' : ''}
                      </span>
                      {pref}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {page === 6 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 24px', textAlign: 'center' }}>
                Your Journey
              </h2>
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                justifyContent: 'center',
              }}>
                {reviewItems.map(item => (
                  <div key={item.label} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 20px',
                    borderRadius: 16,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <span style={{ fontSize: 28 }}>{item.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom controls */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px',
        paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
        display: 'flex',
        gap: 12,
        zIndex: 10,
      }}>
        {page > 0 && (
          <button
            onClick={handleBack}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: 16,
              cursor: 'pointer',
              minHeight: 54,
              fontWeight: 500,
            }}
          >
            Back
          </button>
        )}
        {!isLastPage ? (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            style={{
              flex: 2,
              padding: '16px',
              borderRadius: 16,
              border: 'none',
              background: !canProceed() ? 'rgba(255,107,107,0.3)' : 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              cursor: !canProceed() ? 'not-allowed' : 'pointer',
              minHeight: 54,
              transition: 'opacity 200ms',
            }}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleFinish}
            style={{
              flex: 2,
              padding: '16px',
              borderRadius: 16,
              border: 'none',
              background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: 54,
            }}
          >
            Start Journey →
          </button>
        )}
      </div>

      <style>{`
        @keyframes onboardingSlideIn {
          from {
            opacity: 0;
            transform: translateX(60px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes onboardingSlideInBack {
          from {
            opacity: 0;
            transform: translateX(-60px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function ProfessionCard({
  icon,
  title,
  subtitle,
  active,
  onClick,
  disabled,
}: {
  icon: string;
  title: string;
  subtitle: string;
  active: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        padding: '20px 24px',
        borderRadius: 20,
        border: active ? '2px solid #FF6B6B' : '1px solid rgba(255,255,255,0.08)',
        background: active
          ? 'rgba(255,107,107,0.12)'
          : disabled
          ? 'rgba(255,255,255,0.02)'
          : 'rgba(255,255,255,0.04)',
        color: '#fff',
        fontSize: 17,
        fontWeight: active ? 600 : 400,
        textAlign: 'left',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 200ms ease',
        opacity: disabled ? 0.4 : 1,
        minHeight: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        borderStyle: disabled ? 'dashed' : active ? 'solid' : 'solid',
      }}
    >
      <span style={{ fontSize: 32 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: active ? 600 : 400 }}>{title}</div>
        <div style={{
          fontSize: 13,
          color: active ? '#FF8E8E' : 'rgba(255,255,255,0.35)',
          marginTop: 2,
        }}>
          {subtitle}
        </div>
      </div>
    </button>
  );
}
