import { FC } from 'react';

import { Stepper } from '@/components/stepper/Stepper.tsx';
import {
  AppointmentFormData,
  getDefaultValues,
  STEPS_CONFIG,
} from '@/components/DoctorAppointmentMake/DistrictBooking/steps-config.tsx';

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
