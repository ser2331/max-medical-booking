import { FC } from 'react';
import styled from 'styled-components';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { useAppSelector } from '@/store/redux-hooks.ts';
import { CheckIcon } from '@/assets/icons/CheckIcon.tsx';

const connectorGap = 4;
const StepsContainer = styled(Flex).attrs({ $gap: connectorGap })`
  width: 100%;
  position: relative;
`;

const StepWrapper = styled(Flex).attrs({ $gap: connectorGap })`
  position: relative;
  z-index: 1;
`;

const StyledConnector = styled.div<{ $isCompleted: boolean }>`
  flex: 1;
  height: 0;
  border: 2px solid
    ${props => (props.$isCompleted ? props.theme.colors.blue : props.theme.colors.grey1)};
  border-radius: 8px;
  margin: 0 8px;
  transition: border-color 0.3s ease;
`;

const StepDot = styled(Flex)<{
  $isActive: boolean;
  $isCompleted: boolean;
}>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => {
    if (props.$isActive) return props.theme.colors.blueLight;
    if (props.$isCompleted) return props.theme.colors.blue;
    return props.theme.colors.white;
  }};
  border: 1px solid
    ${props => {
      if (props.$isCompleted) return props.theme.colors.blue;
      if (props.$isActive) return props.theme.colors.blue;
      return props.theme.colors.grey3;
    }};
  color: ${props => {
    if (props.$isCompleted) return props.theme.colors.white;
    if (props.$isActive) return props.theme.colors.blue;
    return props.theme.colors.grey2;
  }};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all 0.3s ease;
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
    <StepsContainer $justifyContent="space-between">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <StepWrapper
            key={step.id}
            style={{ flex: index === steps.length - 1 ? '0 0 auto' : '1' }}
          >
            <StepDot $isActive={isActive} $isCompleted={isCompleted} title={step.title}>
              {isCompleted ? <CheckIcon /> : index + 1}
            </StepDot>

            {index < steps.length - 1 && <StyledConnector $isCompleted={isCompleted} />}
          </StepWrapper>
        );
      })}
    </StepsContainer>
  );
};
