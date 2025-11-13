import React from 'react';
import styled from 'styled-components';
import { Flex } from '@maxhub/max-ui';

interface Step {
  id: string;
  title: string;
}

interface StepperProgressProps {
  steps: Step[];
  currentStep: number;
}

const Container = styled(Flex)`
  height: 60px;
  width: 100%;
  background: ${props => props.theme.colors.background.primary};
`;

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const StepDot = styled.button<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => {
    if (props.$isCompleted) return props.theme.colors.success;
    if (props.$isActive) return props.theme.colors.primary;
    return props.theme.colors.border.primary;
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  ${props =>
    props.$isActive &&
    `
    transform: scale(1.5);
  `}

  ${props =>
    props.$isCompleted &&
    `
    transform: scale(1.2);
  `}
`;

const StepTooltip = styled.div`
  background: ${props => props.theme.colors.background.primary};
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  color: ${props => props.theme.colors.text.primary};
  white-space: nowrap;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.small};
`;

const StepWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Stepper: React.FC<StepperProgressProps> = ({ steps, currentStep }) => {
  const current = steps[currentStep];
  return (
    <Container gap={4} direction={'column'} align={'center'} justify={'center'}>
      <StepTooltip>{current.title}</StepTooltip>

      <StepsContainer>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <StepWrapper key={step.id}>
              <StepDot $isActive={isActive} $isCompleted={isCompleted} title={step.title} />
            </StepWrapper>
          );
        })}
      </StepsContainer>
    </Container>
  );
};
