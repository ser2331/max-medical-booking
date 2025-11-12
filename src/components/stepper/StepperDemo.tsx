import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useStepper } from '@/hooks/useStepper.ts';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { StepperProgress } from './StepperProgress';
import { StepperNavigation } from './StepperNavigation';
import styled from 'styled-components';

interface FormData {
  service: string;
  doctor: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  comments: string;
}

const steps = [
  { id: 'service', title: 'Услуга', component: Step1 },
  { id: 'doctor', title: 'Специалист', component: Step2 },
  { id: 'datetime', title: 'Дата и время', component: Step3 },
  { id: 'patient', title: 'Данные пациента', component: Step4 },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
  padding: 0;
  margin: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FormContainer = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StepContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 16px;
`;

const NavigationWrapper = styled.div`
  padding: 16px;
  border-top: 1px solid #e9ecef;
  background: white;
`;

export const StepperDemo: React.FC = () => {
  const methods = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      service: '',
      doctor: '',
      date: '',
      time: '',
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      comments: '',
    },
  });

  const { currentStep, next, prev, isFirstStep, isLastStep } = useStepper({
    totalSteps: steps.length,
  });

  const CurrentStepComponent = steps[currentStep].component;

  const handleSubmit = (data: FormData) => {
    console.log('Форма отправлена:', data);
    alert('Запись успешно создана!');
  };

  const onNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      next();
    }
  };

  return (
    <Container>
      <FormProvider {...methods}>
        <ContentWrapper>
          <StepperProgress steps={steps} currentStep={currentStep} />

          <FormContainer onSubmit={methods.handleSubmit(handleSubmit)}>
            <StepContent>
              <CurrentStepComponent />
            </StepContent>

            <NavigationWrapper>
              <StepperNavigation
                currentStep={currentStep}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                onPrev={prev}
                onNext={onNext}
              />
            </NavigationWrapper>
          </FormContainer>
        </ContentWrapper>
      </FormProvider>
    </Container>
  );
};
