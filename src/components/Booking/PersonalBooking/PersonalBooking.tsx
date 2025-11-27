import { FC, useState } from 'react';

import {
  AppointmentFormData,
  getDefaultValues,
  STEPS_CONFIG,
} from '@/components/Booking/PersonalBooking/steps-config.tsx';
import { Stepper } from '@/components/stepper/Stepper.tsx';
import { RecordingConfirmationModal } from '@/components/Booking/RecordingConfirmationModal/RecordingConfirmationModal.tsx';
import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';

export const PersonalBooking: FC<{ onFinish: (formData: AppointmentFormData) => void }> = ({
  onFinish,
}) => {
  const { user, hapticFeedback } = useMaxBridgeContext();

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
  defaultValues.firstName = user?.first_name || '';
  defaultValues.lastName = user?.last_name || '';
  //username
  //first_name
  //last_name

  // lastName: string;
  // firstName: string;
  // birthDate: string;
  // snils: string;
  // polisN: string;
  // phone: string;
  // mail: string;

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
