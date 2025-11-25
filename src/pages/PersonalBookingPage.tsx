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

// const mock = {
//   lpu: {
//     id: 1,
//     address: '191002, Санкт-Петербург, ул. Достоевского, д. 42',
//     lpuShortName: 'ГП №1',
//     lpuFullName: 'СПб ГБУЗ "Городская поликлиника №1"',
//     districtName: 'Центральный',
//     phone: '(812) 312-45-67',
//     email: 'gp1@zdrav.spb.ru',
//     latitude: '59.928474',
//     longitude: '30.347269',
//     covidVaccination: true,
//     inDepthExamination: true,
//     isActive: true,
//   },
//   specialty: {
//     id: '2',
//     ferId: '2',
//     name: 'Педиатр',
//     countFreeParticipant: 1,
//     countFreeTicket: 223,
//     lastDate: '2025-11-28T00:00:00',
//     nearestDate: '2025-11-14T00:00:00',
//   },
//   doctor: {
//     id: '2',
//     name: 'Петрова М.В.',
//     ariaType: null,
//     comment: null,
//     freeParticipantCount: 0,
//     freeTicketCount: 0,
//     firstName: null,
//     lastDate: '2025-11-21T13:50:00',
//     lastName: null,
//     middleName: null,
//     nearestDate: '2025-11-19T12:20:00',
//     ariaNumber: '',
//   },
//   appointment: {
//     id: '8237793',
//     visitStart: '2025-11-25T13:10:00',
//     visitEnd: '2025-11-25T13:20:00',
//     address: null,
//     number: null,
//     room: '4',
//   },
//   lastName: 'ДДДД',
//   firstName: 'СССС',
//   birthDate: '2025-11-06',
//   snils: 'sacsa23red23dfwq',
//   polisN: 'wefewfwef',
//   phone: '+7 (234) 234-23-42',
//   mail: 'ssss@mail.com',
//   district: '',
//   date: '2025-11-25',
//   middleName: 'ewfwef',
//   polisS: '',
//   comments: '',
//   gender: 'f',
// };
export const PersonalBookingPage: FC = () => {
  const navigate = useNavigate();
  const { step } = useAppSelector(state => state.stepper);
  const [finishData, setFinishData] = useState<AppointmentFormData | null>(null);

  const handleSetFinishData = (data: AppointmentFormData | null) => {
    setFinishData(data);
  };

  return (
    <PageLayout
      title={finishData ? '' : STEPS_CONFIG[step].title}
      headerComponent={!finishData && <StepperDots steps={STEPS_CONFIG} />}
      showBackButton={true}
      onBack={() => navigate('/')}
    >
      <StepContent $withPadding={!finishData}>
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
