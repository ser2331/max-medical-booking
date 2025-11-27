import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateAppointmentMutation } from '@/api/services/booking-controller/booking-controller.ts';
import { useAppSelector } from '@/store/redux-hooks.ts';

import { PageLayout } from '../components/layout/PageLayout';

import { StepperDots } from '@/components/stepper/StepperDots.tsx';
import { STEPS_CONFIG } from '@/components/Booking/AnotherPersonBooking/steps-config.tsx';
import { FinishCard } from '@/components/Booking/FinishCard.tsx';
import { AnotherPersonBooking } from '@/components/Booking/AnotherPersonBooking/AnotherPersonBooking.tsx';
import { AppointmentFormData } from '@/components/Booking/PersonalBooking/steps-config.tsx';
import { StepContent, StepContentCard } from '@/components/ui/StyledComponents.tsx';

export const AnotherBookingPage: FC = () => {
  const navigate = useNavigate();
  const { step } = useAppSelector(state => state.stepper);
  const [onCreateAppointment] = useCreateAppointmentMutation();

  const [finishData, setFinishData] = useState<AppointmentFormData | null>(null);

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
      title={STEPS_CONFIG[step].title}
      headerComponent={!finishData && <StepperDots steps={STEPS_CONFIG} />}
      showBackButton={true}
      onBack={() => navigate('/')}
    >
      <StepContent $withPadding={!finishData}>
        <StepContentCard>
          {finishData ? (
            <FinishCard onFinish={() => handleSetFinishData(null)} finishData={finishData} />
          ) : (
            <AnotherPersonBooking onFinish={handleSetFinishData} />
          )}
        </StepContentCard>
      </StepContent>
    </PageLayout>
  );
};
