import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/store/redux-hooks.ts';

import { PageLayout } from '../components/layout/PageLayout';
import { StepperDots } from '@/components/stepper/StepperDots.tsx';
import { PersonalBooking } from '@/components/Booking/PersonalBooking/PersonalBooking.tsx';
import {
  AppointmentFormData,
  STEPS_CONFIG,
} from '@/components/Booking/PersonalBooking/steps-config.tsx';
import { FinishCard } from '@/components/Booking/FinishCard.tsx';
import { StepContent, StepContentCard } from '@/components/ui/StyledComponents.tsx';
import { useCreateAppointmentMutation } from '@/api/services/booking-controller/booking-controller.ts';

export const PersonalBookingPage: FC = () => {
  const navigate = useNavigate();
  const { step } = useAppSelector(state => state.stepper);
  const [finishData, setFinishData] = useState<AppointmentFormData | null>(null);
  const [onCreateAppointment] = useCreateAppointmentMutation();

  const handleSetFinishData = (data: AppointmentFormData | null) => {
    if (data?.lpu?.id && data?.lpu?.id && data?.appointment?.id) {
      onCreateAppointment({
        lpuId: data?.lpu?.id,
        patientId: data?.lpu?.id.toString(),
        appointmentId: data.appointment.id,
      })
        .unwrap()
        .then(() => {
          setFinishData(data);
        });
    }
  };

  return (
    <PageLayout
      title={finishData ? '' : STEPS_CONFIG[step].title}
      headerComponent={!finishData && <StepperDots steps={STEPS_CONFIG} />}
      showBackButton={true}
      onBack={() => navigate('/')}
    >
      <StepContent $withPadding={!finishData} className={'scroll-container'}>
        <StepContentCard>
          {finishData ? (
            <FinishCard onFinish={() => handleSetFinishData(null)} finishData={finishData} />
          ) : (
            <PersonalBooking onFinish={handleSetFinishData} />
          )}
        </StepContentCard>
      </StepContent>
    </PageLayout>
  );
};
