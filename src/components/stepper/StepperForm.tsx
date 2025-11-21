import { FieldValues, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { useStepper } from '@/components/stepper/useStepper.tsx';
import { useStepValidation } from '@/components/stepper/useStepValidation.tsx';

import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { StepperProps } from '@/components/stepper/Stepper.types.ts';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { media } from '@/assets/style/mixins.ts';

const NavigationContainer = styled(Flex)`
  position: fixed;
  bottom: 16px;
  left: 16px;
  opacity: 1;
  z-index: 99;
  width: calc(100% - 32px);
  gap: ${props => props.theme.spacing.xs};
  padding: 0;
  flex-direction: row-reverse;

  ${props => props.theme.breakpoints.md} {
    margin-top: ${props => props.theme.spacing.lg};
    padding: ${props => props.theme.spacing.sm};
    gap: ${props => props.theme.spacing.sm};
  }

  ${props => props.theme.breakpoints.xs} {
    margin-top: ${props => props.theme.spacing.md};
    padding: ${props => props.theme.spacing.xs};
    gap: ${props => props.theme.spacing.xs};
  }

  ${media.md} {
    flex-direction: column;
  }
`;

const NavigationBtn = styled(CustomButton)`
  width: 100%;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

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
          onClick={handleSubmit(onSubmit)}
        >
          Завершить
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
    <form>
      <CurrentStepComponent />

      {renderNavigation()}
    </form>
  );
};
