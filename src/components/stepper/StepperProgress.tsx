import React from 'react';
import styled from 'styled-components';
import { Flex } from '@maxhub/max-ui';
import { Stepper } from 'react-form-stepper';

interface Step {
  id: string;
  title: string;
}

interface StepperProgressProps {
  steps: Step[];
  currentStep: number;
}

const Container = styled(Flex)`
  width: 100%;
  background: #ffffff;

  #RFS-StepperContainer {
    padding: 0;
  }
`;

export const StepperProgress: React.FC<StepperProgressProps> = ({ steps, currentStep }) => {
  const styleConfig = {
    // Активный шаг
    activeBgColor: '#2d5bff',
    activeTextColor: '#ffffff',

    // Завершенный шаг
    completedBgColor: '#28a745',
    completedTextColor: '#ffffff',

    // Неактивный шаг
    inactiveBgColor: '#e9ecef',
    inactiveTextColor: '#6c757d',

    // Размеры
    size: '32px',
    circleFontSize: '14px',
    labelFontSize: '12px',
    borderRadius: '50%',
    fontWeight: 600,
  };

  const connectorStyleConfig = {
    // Цвета соединительных линий
    disabledColor: '#e9ecef',
    activeColor: '#2d5bff',
    completedColor: '#28a745',

    // Размеры
    size: 2,
    stepSize: '32px',
    style: 'solid',
  };

  return (
    <Container align={'center'} justify={'center'}>
      <Stepper
        steps={steps.map(step => ({ label: step.title }))}
        activeStep={currentStep}
        connectorStateColors={true}
        styleConfig={styleConfig}
        connectorStyleConfig={connectorStyleConfig}
      />
    </Container>
  );
};
