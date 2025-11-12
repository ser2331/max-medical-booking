import { useState, useCallback } from 'react';

interface UseStepperProps {
  totalSteps: number;
  initialStep?: number;
}

export const useStepper = ({ totalSteps, initialStep = 0 }: UseStepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const next = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const prev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goTo = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps],
  );

  const reset = useCallback(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  return {
    currentStep,
    next,
    prev,
    goTo,
    reset,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    totalSteps,
  };
};
