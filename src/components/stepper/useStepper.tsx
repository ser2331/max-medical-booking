import { useAppDispatch, useAppSelector } from '@/store/redux-hooks.ts';
import { onChangeStep } from '@/store/slices/stepperSlice.ts';

export const useStepper = (totalSteps: number) => {
  const dispatch = useAppDispatch();
  const { step: currentStep } = useAppSelector(state => state.stepper);

  const setCurrentStep = (step: number) => {
    dispatch(onChangeStep(step));
  };
  const next = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  return {
    currentStep,
    next,
    prev,
    goToStep,
    isFirstStep: !currentStep,
    isLastStep: currentStep === totalSteps - 1,
    totalSteps,
  };
};
