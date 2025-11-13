import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useStepper } from '@/hooks/useStepper.ts';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import styled from 'styled-components';
import { StepperNavigation } from '@/components/stepper/StepperNavigation.tsx';
import { Stepper } from '@/components/stepper/Stepper.tsx';

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
  overflow: hidden;
  flex: 1;
`;

const StepContent = styled.div`
  overflow-y: auto;
  padding: 16px;
  height: 100%;
`;

export const InsuranceBooking: FC = () => {
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
        <Stepper
          steps={steps.map(step => ({ id: step.title, title: step.title }))}
          currentStep={currentStep}
        />
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}
        >
          <StepContent>
            <CurrentStepComponent />
          </StepContent>

          <StepperNavigation
            currentStep={currentStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            onPrev={prev}
            onNext={onNext}
          />
        </form>
      </FormProvider>
    </Container>
  );
};
