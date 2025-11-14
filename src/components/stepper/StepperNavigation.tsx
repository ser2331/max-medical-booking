import React from 'react';
import styled from 'styled-components';
import { CompactButton, SecondaryButton } from '../ui/StyledComponents.tsx'; // Импортируем ваши

interface StepperNavigationProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const NavigationContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.xs} 0;
  background: ${props => props.theme.colors.background.primary};

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

const StyledSecondaryButton = styled(SecondaryButton)`
  flex: 1;
  min-height: 44px;

  ${props => props.theme.breakpoints.md} {
    min-height: 40px;
  }

  ${props => props.theme.breakpoints.xs} {
    min-height: 36px;
  }
`;

const StyledCompactButton = styled(CompactButton)`
  flex: 1;
  min-height: 44px;

  ${props => props.theme.breakpoints.md} {
    min-height: 40px;
  }

  ${props => props.theme.breakpoints.xs} {
    min-height: 36px;
  }
`;

const FinishButton = styled(StyledCompactButton)`
  && {
    background: ${props => props.theme.colors.success};
    border-color: ${props => props.theme.colors.success};

    &:hover:not(:disabled) {
      background: ${props => props.theme.colors.success};
      border-color: ${props => props.theme.colors.success};
      filter: brightness(0.9);
    }
  }
`;

export const StepperNavigation: React.FC<StepperNavigationProps> = ({
  isFirstStep,
  isLastStep,
  onPrev,
  onNext,
}) => {
  const renderNextButton = () => {
    if (isLastStep) {
      return <FinishButton type="submit">Завершить</FinishButton>;
    }

    return (
      <StyledCompactButton type="button" onClick={onNext}>
        Далее
      </StyledCompactButton>
    );
  };

  return (
    <NavigationContainer>
      {!isFirstStep && (
        <StyledSecondaryButton type="button" onClick={onPrev}>
          Назад
        </StyledSecondaryButton>
      )}

      {renderNextButton()}
    </NavigationContainer>
  );
};
