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
  const { hapticFeedback } = useMaxBridgeContext();
  const [formData, setFormData] = useState<AppointmentFormData | null>(null);

  const handleSubmit = (data: AppointmentFormData) => {
    hapticFeedback('selection', 'medium').then(() => {
      setFormData(data);
    });
  };

  const handleStepChange = (_currentStep: number, _previousStep: number) => {
    hapticFeedback('selection', 'medium').then(() => {});
  };

  const handleComplete = () => {
    if (formData) {
      hapticFeedback('selection', 'medium').then(() => {
        onFinish(formData);
      });
    }
  };
  const defaultValues: AppointmentFormData = getDefaultValues();

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
