import { FC, useState } from 'react';

import { Stepper } from '@/components/stepper/Stepper.tsx';
import {
  getDefaultValues,
  STEPS_CONFIG,
} from '@/components/Booking/AnotherPersonBooking/steps-config.tsx';
import { AppointmentFormData } from '@/components/Booking/PersonalBooking/steps-config.tsx';
import { RecordingConfirmationModal } from '@/components/Booking/RecordingConfirmationModal/RecordingConfirmationModal.tsx';

const defaultValues: AppointmentFormData = getDefaultValues();

export const AnotherPersonBooking: FC<{ onFinish: (formData: AppointmentFormData) => void }> = ({
  onFinish,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData | null>(null);

  const handleSubmit = (data: AppointmentFormData) => {
    setFormData(data);
  };

  const handleStepChange = (currentStep: number, previousStep: number) => {
    console.log(`Переход с шага ${previousStep} на шаг ${currentStep}`);
  };

  const handleComplete = () => {
    console.log('Форма отправлена:', formData);
    if (formData) {
      onFinish(formData);
    }
  };

  return (
    <>
      <Stepper<AppointmentFormData>
        steps={STEPS_CONFIG}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onStepChange={handleStepChange}
        mode="onChange"
      />
      <RecordingConfirmationModal
        open={!!formData}
        formData={formData}
        onClose={() => setFormData(null)}
        onConfirm={handleComplete}
      />
    </>
  );
};
