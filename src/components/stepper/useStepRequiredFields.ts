import { useAppSelector } from '@/store/redux-hooks.ts';
import { STEPS_CONFIG } from '@/components/Booking/AnotherPersonBooking/steps-config.tsx';
import { useMemo } from 'react';
import { AppointmentFormData } from '@/components/Booking/PersonalBooking/steps-config.tsx';

export const useStepRequiredFields = () => {
  const { step: currentStep } = useAppSelector(state => state.stepper);
  const stepFields = STEPS_CONFIG[currentStep].fields;

  return useMemo(() => {
    const fieldsMap: { [key in keyof AppointmentFormData]: key } = {} as {
      [key in keyof AppointmentFormData]: key;
    };

    stepFields.forEach(field => {
      if (field) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fieldsMap[field] = field;
      }
    });

    return fieldsMap;
  }, [stepFields]);
};
