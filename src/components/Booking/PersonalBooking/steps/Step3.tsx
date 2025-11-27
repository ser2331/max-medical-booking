import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetDoctorsQuery } from '@/api/services/booking-dictionary-controller/booking-dictionary-controller.ts';
import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';

import { Flex, Line } from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';
import { STEPS_CONFIG } from '@/components/Booking/PersonalBooking/steps-config.tsx';
import { RadioBtnCard } from '@/components/ui/RadioBtnCard/RadioBtnCard.tsx';
import { IDoctor } from '@/api/services/booking-dictionary-controller/booking-dictionary-controller.types.ts';

export const Step3: React.FC = () => {
  const { hapticFeedback } = useMaxBridgeContext();
  const { register, watch, setValue } = useFormContext();
  const stepFields = STEPS_CONFIG[2].fields;
  const [doctor] = stepFields;
  const selectedDoctor = watch('doctor');
  const selectedLpu = watch('lpu');
  const selectedSpeciality = watch('specialty');

  const {
    data: doctors = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetDoctorsQuery(
    { lpuId: selectedLpu?.id, specialityId: selectedSpeciality?.id },
    { skip: !selectedSpeciality?.id || !selectedLpu?.id },
  );

  const handleDoctorSelect = async (currentDoctor: IDoctor) => {
    hapticFeedback('impact', 'light').then(() => {
      setValue(doctor, currentDoctor, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    });
  };

  if (isLoading || isFetching) {
    return <AppSpin />;
  }

  if (error) {
    return <ErrorMessage onTryAgain={() => refetch()}>Ошибка загрузки данных врачей</ErrorMessage>;
  }
  return (
    <Flex
      $direction={'column'}
      $align={'flex-start'}
      $justifyContent={'flex-start'}
      $gap={16}
      style={{ width: '100%' }}
    >
      {doctors?.map(doctor => {
        const isSelected = selectedDoctor?.id === doctor.id;

        return (
          <Flex
            key={doctor.id}
            $direction={'column'}
            $align={'flex-start'}
            style={{ width: '100%' }}
            $gap={16}
          >
            <RadioBtnCard
              id={doctor.id}
              name={doctor.name}
              availableTop={{ label: 'Записей', value: doctor.freeParticipantCount }}
              availableBottom={{ label: 'Талонов', value: doctor.freeTicketCount }}
              onClick={() => handleDoctorSelect(doctor)}
              checked={isSelected}
              register={register('doctor', { required: 'Выберите врача' })}
            />
            <Line $marginBottom={0} $marginTop={0} />
          </Flex>
        );
      })}
    </Flex>
  );
};
