import { useState, useEffect } from 'react';
import {
  startOnboarding,
  getOnboardingState,
  selectProfession,
  setSituation,
  setEmotion,
  setApplicationsCount,
  setInterviewsCount,
  setConfidenceLevel,
  toggleFear,
  nextStep,
  previousStep,
  finishOnboarding,
} from '@/core/onboarding/onboarding_engine';
import type { CurrentSituation, EmotionalState } from '@/core/onboarding/onboarding_state';
import { startJourney } from '@/core/runtime/runtime_controller';

interface Props {
  onComplete: () => void;
}

const FEARS = [
  'Rejection',
  'Interviews',
  'Lack of experience',
  'Competition',
  'English',
  'Salary negotiation',
];

const SITUATIONS: { value: CurrentSituation; label: string }[] = [
  { value: 'no_job', label: 'No job right now' },
  { value: 'unsatisfied', label: 'Working but unhappy' },
  { value: 'higher_salary', label: 'Want higher salary' },
  { value: 'career_change', label: 'Changing profession' },
  { value: 'remote_work', label: 'Looking for remote work' },
];

const EMOTIONS: { value: EmotionalState; label: string; emoji: string }[] = [
  { value: 'confident', label: 'Confident', emoji: '💪' },
  { value: 'unsure', label: 'Unsure', emoji: '🤔' },
  { value: 'frustrated', label: 'Frustrated', emoji: '😤' },
  { value: 'exhausted', label: 'Exhausted', emoji: '😮‍💨' },
  { value: 'lost', label: 'Lost', emoji: '😶' },
];

export default function OnboardingScreen({ onComplete }: Props) {
  const [initialized, setInitialized] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!initialized) {
      startOnboarding();
      setInitialized(true);
    }
  }, [initialized]);

  const state = getOnboardingState();
  if (!state || !initialized) return null;

  const rerender = () => setTick(v => v + 1);

  const handleNext = () => {
    const result = nextStep();
    if (result.success) {
      rerender();
    } else {
      alert(result.error || 'Please fill required fields');
    }
  };

  const handleBack = () => {
    previousStep();
    rerender();
  };

  const handleFinish = () => {
    const finalState = finishOnboarding();
    if (!finalState) {
      console.error('[Onboarding] finishOnboarding() returned null — professionId:', getOnboardingState()?.professionId);
      alert('Please complete all steps');
      return;
    }
    console.log('[Onboarding] Starting journey with:', finalState.professionId);
    try {
      startJourney(finalState);
      console.log('[Onboarding] Journey started, calling onComplete');
      onComplete();
    } catch (err) {
      console.error('[Onboarding] startJourney threw:', err);
      alert('Failed to start journey. Check console.');
    }
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: 480,
    margin: '0 auto',
    padding: '24px 20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: '#071320',
    color: '#ffffff',
  };

  const optionStyle = (selected: boolean): React.CSSProperties => ({
    display: 'block',
    width: '100%',
    padding: '16px 20px',
    marginBottom: 10,
    borderRadius: 14,
    border: selected ? '2px solid #48BB78' : '1px solid rgba(255,255,255,0.1)',
    background: selected ? 'rgba(72,187,120,0.15)' : 'rgba(255,255,255,0.05)',
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'left' as const,
    cursor: 'pointer',
    transition: '180ms ease',
  });

  const renderStep = () => {
    switch (state.step) {
      case 0:
        return (
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 16px' }}>Welcome to Career Navigator</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.6, margin: '0 0 12px' }}>
              Your guided path to a software engineering career in the US market.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.6 }}>
              We'll help you build your resume, LinkedIn, applications, interview skills, and negotiation strategy.
            </p>
          </div>
        );

      case 1:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 8px' }}>What's your situation?</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '0 0 24px' }}>Choose the one that fits best</p>
            {SITUATIONS.map(({ value, label }) => (
              <button
                key={value}
                style={optionStyle(state.situation === value)}
                onClick={() => { setSituation(value); rerender(); }}
              >
                {label}
              </button>
            ))}
          </div>
        );

      case 2:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 8px' }}>How are you feeling?</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '0 0 24px' }}>Your emotional state helps us calibrate your journey</p>
            {EMOTIONS.map(({ value, label, emoji }) => (
              <button
                key={value}
                style={optionStyle(state.emotion === value)}
                onClick={() => { setEmotion(value); rerender(); }}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        );

      case 3:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 8px' }}>Choose your profession</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '0 0 24px' }}>Your journey will be built for this career path</p>
            <button
              style={optionStyle(state.professionId === 'software_engineer')}
              onClick={() => { selectProfession('software_engineer'); rerender(); }}
            >
              💻 Software Engineer
            </button>
            <button
              style={{ ...optionStyle(false), opacity: 0.4, cursor: 'not-allowed' }}
              disabled
            >
              📊 Data Analyst (coming soon)
            </button>
            <button
              style={{ ...optionStyle(false), opacity: 0.4, cursor: 'not-allowed' }}
              disabled
            >
              🛡 Cybersecurity (coming soon)
            </button>
            <button
              style={{ ...optionStyle(false), opacity: 0.4, cursor: 'not-allowed' }}
              disabled
            >
              📣 Digital Marketing (coming soon)
            </button>
            <button
              style={{ ...optionStyle(false), opacity: 0.4, cursor: 'not-allowed' }}
              disabled
            >
              🎧 Customer Support (coming soon)
            </button>
          </div>
        );

      case 4: {
        const appCount = state.applicationsCount ?? 0;
        const intCount = state.interviewsCount ?? 0;
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 8px' }}>Your job search history</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '0 0 28px' }}>Approximate numbers are fine</p>

            <label style={{ display: 'block', marginBottom: 24 }}>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: 12 }}>
                Applications sent: <strong style={{ color: '#48BB78' }}>{appCount}</strong>
              </span>
              <input
                type="range"
                min={0}
                max={200}
                step={5}
                value={appCount}
                onChange={e => { setApplicationsCount(Number(e.target.value)); rerender(); }}
                style={{ width: '100%', accentColor: '#48BB78' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                <span>0</span><span>100</span><span>200+</span>
              </div>
            </label>

            <label style={{ display: 'block' }}>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: 12 }}>
                Interviews attended: <strong style={{ color: '#4A90D9' }}>{intCount}</strong>
              </span>
              <input
                type="range"
                min={0}
                max={50}
                step={1}
                value={intCount}
                onChange={e => { setInterviewsCount(Number(e.target.value)); rerender(); }}
                style={{ width: '100%', accentColor: '#4A90D9' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                <span>0</span><span>25</span><span>50+</span>
              </div>
            </label>
          </div>
        );
      }

      case 5: {
        const level = state.confidenceLevel ?? 5;
        const levelLabels: Record<number, string> = {
          1: 'Very low', 2: 'Low', 3: 'Low', 4: 'Below average',
          5: 'Average', 6: 'Average', 7: 'Good', 8: 'Good',
          9: 'High', 10: 'Very high',
        };
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 8px' }}>Confidence level</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '0 0 32px' }}>How ready do you feel for interviews right now?</p>

            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span style={{ fontSize: 64, fontWeight: 700, color: '#48BB78' }}>{level}</span>
              <span style={{ fontSize: 24, color: 'rgba(255,255,255,0.4)' }}>/10</span>
              <p style={{ margin: '8px 0 0', fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>{levelLabels[level]}</p>
            </div>

            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={level}
              onChange={e => { setConfidenceLevel(Number(e.target.value)); rerender(); }}
              style={{ width: '100%', accentColor: '#48BB78' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
              <span>Not ready</span><span>Ready</span>
            </div>
          </div>
        );
      }

      case 6:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 8px' }}>Your biggest fears</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, margin: '0 0 24px' }}>Select all that apply — we'll address them in your journey</p>
            {FEARS.map(fear => {
              const selected = state.fears.includes(fear);
              return (
                <button
                  key={fear}
                  style={optionStyle(selected)}
                  onClick={() => { toggleFear(fear); rerender(); }}
                >
                  {selected ? '✓ ' : ''}{fear}
                </button>
              );
            })}
          </div>
        );

      case 7:
        return (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 24px' }}>Your journey is ready</h2>
            {[
              { label: 'Profession', value: state.professionId?.replace('_', ' ') || '—' },
              { label: 'Situation', value: SITUATIONS.find(s => s.value === state.situation)?.label || '—' },
              { label: 'Confidence', value: state.confidenceLevel ? `${state.confidenceLevel}/10` : '—' },
              { label: 'Applications sent', value: state.applicationsCount ?? 0 },
              { label: 'Interviews attended', value: state.interviewsCount ?? 0 },
              { label: 'Fears to address', value: state.fears.length > 0 ? state.fears.join(', ') : 'None selected' },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px 16px',
                marginBottom: 8,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 12,
                fontSize: 14,
              }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                <span style={{ color: '#ffffff', fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>{String(value)}</span>
              </div>
            ))}
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  const totalSteps = 8;
  const progress = ((state.step + 1) / totalSteps) * 100;
  const isLastStep = state.step === 7;

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: 32 }}>
        <div style={{
          height: 3,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: '#48BB78',
            borderRadius: 2,
            transition: '300ms ease',
          }} />
        </div>
        <p style={{ margin: '8px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          Step {state.step + 1} of {totalSteps}
        </p>
      </div>

      <div style={{ flex: 1 }}>
        {renderStep()}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {state.step > 0 && (
          <button
            onClick={handleBack}
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#ffffff',
              fontSize: 16,
              cursor: 'pointer',
              minHeight: 54,
            }}
          >
            Back
          </button>
        )}
        {!isLastStep ? (
          <button
            onClick={handleNext}
            style={{
              flex: 2,
              padding: '16px',
              borderRadius: 14,
              border: 'none',
              background: '#48BB78',
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: 54,
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
              borderRadius: 14,
              border: 'none',
              background: '#48BB78',
              color: '#ffffff',
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
    </div>
  );
}
