import { FieldValues, useFormContext } from 'react-hook-form';

import { useStepper } from '@/components/stepper/useStepper.tsx';
import { useStepValidation } from '@/components/stepper/useStepValidation.tsx';

import { StepperProps } from '@/components/stepper/Stepper.types.ts';
import { NavigationBtn, NavigationContainer } from '@/components/ui/StyledComponents.tsx';

export const StepperForm = <TFieldValues extends FieldValues>({
  steps,
  onSubmit,
  onStepChange,
}: Pick<StepperProps<TFieldValues>, 'steps' | 'onSubmit' | 'onStepChange'>) => {
  const { handleSubmit } = useFormContext<TFieldValues>();
  const { currentStep, next, prev, isFirstStep, isLastStep } = useStepper(steps.length);
  const { validateCurrentStep, arePreviousStepsValid, isCurrentStepValid } = useStepValidation(
    currentStep,
    steps,
  );

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = async () => {
    const isStepValid = await validateCurrentStep();
    const previousValid = arePreviousStepsValid();

    if (isStepValid && previousValid) {
      const previousStep = currentStep;
      next();
      onStepChange?.(currentStep + 1, previousStep);
    }
  };

  const handlePrev = () => {
    const previousStep = currentStep;
    prev();
    onStepChange?.(currentStep - 1, previousStep);
  };

  const renderNavigation = () => (
    <NavigationContainer>
      {!isLastStep ? (
        <NavigationBtn disabled={!isCurrentStepValid} variant="primary" onClick={handleNext}>
          Далее
        </NavigationBtn>
      ) : (
        <NavigationBtn
          disabled={!isCurrentStepValid}
          variant="primary"
          onClick={!isCurrentStepValid ? handleSubmit(onSubmit) : () => console.log()}
        >
          Подтвердить
        </NavigationBtn>
      )}

      {!isFirstStep && !isFirstStep && (
        <NavigationBtn variant="outline-default" onClick={handlePrev}>
          Назад
        </NavigationBtn>
      )}
    </NavigationContainer>
  );

  return (
    <form style={{ height: '100%', width: '100%' }}>
      <CurrentStepComponent />

      {renderNavigation()}
    </form>
  );
};
