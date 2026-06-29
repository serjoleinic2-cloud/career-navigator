import { useState, useCallback } from 'react';

interface UseMissionStepsReturn {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  isLastStep: boolean;
  canSubmit: boolean;
  progress: number;
}

export function useMissionSteps(totalSteps: number): UseMissionStepsReturn {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = useCallback(() => {
    setCurrentStep(s => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep(s => Math.max(s - 1, 0));
  }, []);

  const isLastStep = currentStep === totalSteps - 1;
  const canSubmit = currentStep === totalSteps - 1;
  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    isLastStep,
    canSubmit,
    progress,
  };
}
