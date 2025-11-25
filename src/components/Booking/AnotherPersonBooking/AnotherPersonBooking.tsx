import { FC, useState } from 'react';

import { Stepper } from '@/components/stepper/Stepper.tsx';
import {
  getDefaultValues,
  STEPS_CONFIG,
} from '@/components/Booking/AnotherPersonBooking/steps-config.tsx';
import { AppointmentFormData } from '@/components/Booking/PersonalBooking/steps-config.tsx';
import { RecordingConfirmationModal } from '@/components/Booking/RecordingConfirmationModal/RecordingConfirmationModal.tsx';
import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';

export const AnotherPersonBooking: FC<{ onFinish: (formData: AppointmentFormData) => void }> = ({
  onFinish,
}) => {
  const { user, hapticFeedback } = useMaxBridgeContext();
  const [formData, setFormData] = useState<AppointmentFormData | null>(null);

  const handleSubmit = (data: AppointmentFormData) => {
    console.log('data', data);
    hapticFeedback('selection', 'medium').then(() => {
      setFormData(data);
    });
  };

  const handleStepChange = (currentStep: number, previousStep: number) => {
    hapticFeedback('selection', 'medium').then(() => {
      console.log(`Переход с шага ${previousStep} на шаг ${currentStep}`);
    });
  };

  const handleComplete = () => {
    if (formData) {
      hapticFeedback('selection', 'medium').then(() => {
        onFinish(formData);
      });
    }
  };
  const defaultValues: AppointmentFormData = getDefaultValues();
  defaultValues.firstName = user?.first_name || '';
  defaultValues.lastName = user?.last_name || '';
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
