import { FC } from 'react';

import {
  AppointmentFormData,
  getDefaultValues,
  STEPS_CONFIG,
} from '@/components/Booking/DistrictBooking/steps-config.tsx';
import { Stepper } from '@/components/stepper/Stepper.tsx';

const defaultValues: AppointmentFormData = getDefaultValues();

export const InsuranceBooking: FC = () => {
  const handleSubmit = (data: AppointmentFormData) => {
    console.log('Форма отправлена:', data);
    alert('Запись успешно создана!');
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
