import { FC } from 'react';
import styled from 'styled-components';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { useAppSelector } from '@/store/redux-hooks.ts';

const StepperHeader = styled(Flex)`
  height: auto;
  padding: ${props => props.theme.spacing.lg};
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

interface IStepperDotsProps {
  steps: {
    id: string;
    title: string;
  }[];
}

export const StepperDots: FC<IStepperDotsProps> = ({ steps }) => {
  const { step: currentStep } = useAppSelector(state => state.stepper);

  return (
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
              // onClick={() => handleStepClick(index)}
              title={step.title}
            />
          );
        })}
      </StepsContainer>
    </StepperHeader>
  );
};
