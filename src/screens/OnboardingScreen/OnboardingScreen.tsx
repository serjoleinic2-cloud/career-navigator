import { useState } from 'react';
import { startJourney } from '@/core/runtime/runtime_controller';

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);

  const handleComplete = () => {
    startJourney({
      situation: 'no_job',
      emotion: 'confident',
      applicationsCount: 0,
      interviewsCount: 0,
      professionId: 'software_engineer',
      confidenceLevel: 50,
      fears: [],
    });
    window.location.reload();
  };

  return (
    <div>
      <h1>Welcome to Career Navigator</h1>
      <p>Step {step + 1} of 7</p>
      <button onClick={() => setStep(s => s + 1)}>Next</button>
      {step === 6 && <button onClick={handleComplete}>Start Journey</button>}
    </div>
  );
}
