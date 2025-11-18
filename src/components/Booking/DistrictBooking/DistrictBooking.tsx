import { FC } from 'react';

import {
  AppointmentFormData,
  getDefaultValues,
  STEPS_CONFIG,
} from '@/components/Booking/DistrictBooking/steps-config.tsx';
import { Stepper } from '@/components/stepper/Stepper.tsx';
import { useNavigate } from 'react-router-dom';

const defaultValues: AppointmentFormData = getDefaultValues();

export const DistrictBooking: FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: AppointmentFormData) => {
    console.log('Форма отправлена:', data);
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
