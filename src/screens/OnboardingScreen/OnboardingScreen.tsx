import { useState } from 'react';
import {
  startOnboarding,
  getOnboardingState,
  selectProfession,
  setExperience,
  toggleGoal,
  setTimeline,
  togglePreference,
  nextStep,
  previousStep,
  finishOnboarding,
} from '@/core/onboarding/onboarding_engine';
import { startJourney } from '@/core/runtime/runtime_controller';

startOnboarding();

export default function OnboardingScreen() {
  const [, setTick] = useState(0);
  const state = getOnboardingState()!;

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
    if (finalState) {
      startJourney(finalState);
      window.location.reload();
    } else {
      alert('Please complete all steps');
    }
  };

  const renderStep = () => {
    switch (state.step) {
      case 0:
        return (
          <div>
            <h1>Welcome to Career Navigator</h1>
            <p>Your guided path to a Software Engineering career in the US market.</p>
            <p>We'll help you build your resume, LinkedIn, applications, interview skills, and negotiation strategy.</p>
          </div>
        );

      case 1:
        return (
          <div>
            <h2>Choose Your Profession</h2>
            <select
              value={state.professionId || ''}
              onChange={e => { selectProfession(e.target.value); rerender(); }}
            >
              <option value="">Select profession...</option>
              <option value="software_engineer">Software Engineer</option>
            </select>
            <p>More professions coming soon.</p>
          </div>
        );

      case 2:
        return (
          <div>
            <h2>Experience Level</h2>
            {['Junior', 'Middle', 'Senior'].map(level => (
              <label key={level}>
                <input
                  type="radio"
                  name="experience"
                  checked={state.experienceLevel === level}
                  onChange={() => { setExperience(level); rerender(); }}
                />
                {level}
              </label>
            ))}
          </div>
        );

      case 3:
        return (
          <div>
            <h2>Your Goals</h2>
            {['Get first job', 'Switch career', 'Improve skills', 'Prepare for interview'].map(goal => (
              <label key={goal}>
                <input
                  type="checkbox"
                  checked={state.goals.includes(goal)}
                  onChange={() => { toggleGoal(goal); rerender(); }}
                />
                {goal}
              </label>
            ))}
          </div>
        );

      case 4:
        return (
          <div>
            <h2>Timeline</h2>
            {['1 month', '3 months', '6 months', '1 year'].map(t => (
              <label key={t}>
                <input
                  type="radio"
                  name="timeline"
                  checked={state.timeline === t}
                  onChange={() => { setTimeline(t); rerender(); }}
                />
                {t}
              </label>
            ))}
          </div>
        );

      case 5:
        return (
          <div>
            <h2>Preferences</h2>
            {['Remote', 'On-site', 'Hybrid', 'US market', 'EU market'].map(pref => (
              <label key={pref}>
                <input
                  type="checkbox"
                  checked={state.preferences.includes(pref)}
                  onChange={() => { togglePreference(pref); rerender(); }}
                />
                {pref}
              </label>
            ))}
          </div>
        );

      case 6:
        return (
          <div>
            <h2>Review & Start</h2>
            <p><strong>Profession:</strong> {state.professionId}</p>
            <p><strong>Experience:</strong> {state.experienceLevel}</p>
            <p><strong>Goals:</strong> {state.goals.join(', ') || 'None selected'}</p>
            <p><strong>Timeline:</strong> {state.timeline}</p>
            <p><strong>Preferences:</strong> {state.preferences.join(', ') || 'None selected'}</p>
          </div>
        );

      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <progress value={state.step + 1} max={7} style={{ width: '100%' }} />
        <p>Step {state.step + 1} of 7</p>
      </div>

      {renderStep()}

      <div style={{ marginTop: 30, display: 'flex', gap: 10 }}>
        {state.step > 0 && state.step < 6 && (
          <button onClick={handleBack}>Back</button>
        )}

        {state.step < 6 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleFinish}>Start Journey</button>
        )}
      </div>
    </div>
  );
}
