import React from 'react';
import styled from 'styled-components';

interface StepperNavigationProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const NavigationContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PrevButton = styled(Button)`
  border: 1px solid #2d5bff;
  background-color: transparent;
  color: #2d5bff;

  &:hover {
    background-color: #f0f4ff;
  }
`;

const NextButton = styled(Button)`
  border: none;
  background-color: #2d5bff;
  color: white;

  &:hover {
    background-color: #1a4ae0;
  }

  &:disabled {
    background-color: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const StepperNavigation: React.FC<StepperNavigationProps> = ({
  currentStep,
  isFirstStep,
  isLastStep,
  onPrev,
  onNext,
}) => {
  console.log('StepperNavigation', currentStep);

  return (
    <NavigationContainer>
      {!isFirstStep && (
        <PrevButton type="button" onClick={onPrev}>
          Назад
        </PrevButton>
      )}

      <NextButton type={isLastStep ? 'submit' : 'button'} onClick={isLastStep ? undefined : onNext}>
        {isLastStep ? 'Завершить' : 'Далее'}
      </NextButton>
    </NavigationContainer>
  );
};
