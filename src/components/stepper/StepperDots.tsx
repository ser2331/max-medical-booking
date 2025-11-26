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

const StyledConnector = styled.div<{ $status: 'empty' | 'half' | 'full' }>`
  flex: 1;
  height: 2px;
  background: ${props => props.theme.colors.grey1};
  border-radius: 8px;
  margin: 0 8px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props =>
      props.$status === 'full' ? '100%' : props.$status === 'half' ? '50%' : '0%'};
    background: ${props => props.theme.colors.blue};
    transition: width 0.3s ease;
    border-radius: 6px;
  }
`;

const StepDot = styled(Flex)<{
  $isActive: boolean;
  $isCompleted: boolean;
}>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => {
    if (props.$isCompleted) return props.theme.colors.blueDark;
    return props.theme.colors.white;
  }};
  border: 1px solid
    ${props => {
      if (props.$isCompleted) return props.theme.colors.blueDark;
      if (props.$isActive) return props.theme.colors.blueDark;
      return props.theme.colors.grey3;
    }};
  color: ${props => {
    if (props.$isCompleted) return props.theme.colors.white;
    if (props.$isActive) return props.theme.colors.blueDark;
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
        const connectorStatus = isCompleted ? 'full' : isActive ? 'half' : 'empty';

        return (
          <StepWrapper
            key={step.id}
            style={{ flex: index === steps.length - 1 ? '0 0 auto' : '1' }}
          >
            <StepDot $isActive={isActive} $isCompleted={isCompleted} title={step.title}>
              {isCompleted ? <CheckIcon /> : index + 1}
            </StepDot>

            {index < steps.length - 1 && <StyledConnector $status={connectorStatus} />}
          </StepWrapper>
        );
      })}
    </StepsContainer>
  );
};
