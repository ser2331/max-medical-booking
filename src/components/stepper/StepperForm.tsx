import { FieldValues, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { useStepper } from '@/components/stepper/useStepper.tsx';
import { useStepValidation } from '@/components/stepper/useStepValidation.tsx';

import { Flex } from '@/components/ui/StyledComponents.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { StepperProps } from '@/components/stepper/Stepper.types.ts';

const StepperHeader = styled(Flex)`
  height: 20px;
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
`;
const CurrentStepTitle = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.black};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;
const StepsContainer = styled(Flex)`
  width: 100%;
`;
const StepDot = styled.div<{ $isActive: boolean; $isCompleted: boolean; $isClickable: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    if (props.$isCompleted) return props.theme.colors.green;
    if (props.$isActive) return props.theme.colors.blue;
    return props.theme.colors.grey3;
  }};
  cursor: ${props => (props.$isClickable ? 'pointer' : 'default')};
  transition: all 0.3s ease;
  position: relative;

  ${props =>
    props.$isActive &&
    `
    transform: scale(1.5);
    box-shadow: ${props.theme.shadows.medium};
  `}

  ${props =>
    props.$isCompleted &&
    `
    transform: scale(1.2);
  `}

  &:hover {
    ${props =>
      props.$isClickable &&
      !props.$isActive &&
      `
      transform: scale(1.3);
      background: ${props.theme.colors.blueHover};
    `}
  }
`;
const NavigationContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} 0 0;
  background: ${props => props.theme.colors.mainBackgroundColor};

  ${props => props.theme.breakpoints.md} {
    margin-top: ${props => props.theme.spacing.lg};
    padding: ${props => props.theme.spacing.sm};
    gap: ${props => props.theme.spacing.sm};
  }

  ${props => props.theme.breakpoints.xs} {
    margin-top: ${props => props.theme.spacing.md};
    padding: ${props => props.theme.spacing.xs};
    gap: ${props => props.theme.spacing.xs};
    flex-direction: column;
  }
`;
const StepContent = styled.div`
  overflow-y: auto;
  flex: 1;
  border-radius: ${props => props.theme.borderRadius.large};
  height: 100%;
  width: 100%;
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
  const { currentStep, next, prev, goToStep, isFirstStep, isLastStep } = useStepper(steps.length);
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

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      const previousStep = currentStep;
      goToStep(stepIndex);
      onStepChange?.(stepIndex, previousStep);
    }
  };

  const renderStepperHeader = () => (
    <StepperHeader $direction="column">
      <CurrentStepTitle>{steps[currentStep].title}</CurrentStepTitle>
      <StepsContainer $align="center" $justifyContent="space-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isClickable = index <= currentStep;

          return (
            <StepDot
              key={step.id}
              $isActive={isActive}
              $isCompleted={isCompleted}
              $isClickable={isClickable}
              onClick={() => handleStepClick(index)}
              title={step.title}
            />
          );
        })}
      </StepsContainer>
    </StepperHeader>
  );

  const renderNavigation = () => (
    <NavigationContainer>
      {!isFirstStep && (
        <NavigationBtn variant="outline-default" onClick={handlePrev}>
          Назад
        </NavigationBtn>
      )}

      {!isLastStep ? (
        <NavigationBtn disabled={!isCurrentStepValid} variant="primary" onClick={handleNext}>
          Далее
        </NavigationBtn>
      ) : (
        <NavigationBtn disabled={!isCurrentStepValid} variant="primary" type="submit">
          Завершить
        </NavigationBtn>
      )}
    </NavigationContainer>
  );

  return (
    <>
      {renderStepperHeader()}

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <StepContent>
          <CurrentStepComponent />
        </StepContent>

        {renderNavigation()}
      </form>
    </>
  );
};
