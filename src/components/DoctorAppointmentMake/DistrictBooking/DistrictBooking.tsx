import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMessageToast } from '@/hooks/useMessageToast.ts';

import {
  AppointmentFormData,
  getDefaultValues,
  STEPS_CONFIG,
} from '@/components/DoctorAppointmentMake/DistrictBooking/steps-config.tsx';
import { Stepper } from '@/components/stepper/Stepper.tsx';

const defaultValues: AppointmentFormData = getDefaultValues();

export const DistrictBooking: FC = () => {
  const navigate = useNavigate();
  const messageToast = useMessageToast();

  const handleSubmit = (data: AppointmentFormData) => {
    console.log('Форма отправлена:', data);
    messageToast('Форма заполнена успешно');
    navigate('/');
  };

  const handleStepChange = (currentStep: number, previousStep: number) => {
    console.log(`Переход с шага ${previousStep} на шаг ${currentStep}`);
  };

  return (
    <Stepper<AppointmentFormData>
      steps={STEPS_CONFIG}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onStepChange={handleStepChange}
      mode="onChange"
    />
  );
};
