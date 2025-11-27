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
    onCreateAppointment({
      // esiaId: string;
      lpuId: data?.lpu?.id || 0,
      // patientId: number;
      appointmentId: data?.appointment?.id ? Number(data.appointment.id) : 0,
      // referralId: number;
      visitDate: data?.appointment?.visitStart || '',
      ipmpiCardId: 0,
      recipientEmail: '',
      patientLastName: data?.lastName || '',
      patientFirstName: data?.firstName || '',
      patientMiddleName: data?.middleName || '',
      patientBirthdate: data?.birthDate || '',
      // num: string;
      room: data?.appointment?.room || '',
      address: data?.appointment?.address || '',
      // userFullName: string;
      userSnils: data?.snils || '',
      // userBirthDate: string,
    })
      .unwrap()
      .then(() => {
        setFinishData(data);
      });
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
