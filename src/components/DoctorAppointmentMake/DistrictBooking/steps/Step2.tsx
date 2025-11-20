import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useGetSpecialtiesQuery } from '@/api/services/lpus-controller/lpus-controller.ts';

import {
  CheckCardDescription,
  CheckCardName,
  Flex,
  Line,
  StatValue,
} from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { RadioButton } from '@/components/ui/RadioButton/RadioButton.tsx';
import { STEPS_CONFIG } from '@/components/DoctorAppointmentMake/DistrictBooking/steps-config.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';

export const Step2: React.FC = () => {
  const { register, watch, setValue } = useFormContext();
  const selectedSpecialty = watch('specialty');
  const { data: specialties, error, isLoading } = useGetSpecialtiesQuery({ lpuId: '' });
  const stepFields = STEPS_CONFIG[1].fields;
  const [specialty] = stepFields;
  const handleDoctorSelect = (specialtyId: string) => {
    setValue(specialty, specialtyId, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  if (isLoading) {
    return <AppSpin />;
  }

  if (error) {
    return <ErrorMessage>Ошибка загрузки специальностей</ErrorMessage>;
  }

  return (
    <Flex
      $direction={'column'}
      $align={'flex-start'}
      $justifyContent={'flex-start'}
      $gap={16}
      style={{ width: '100%' }}
    >
      {specialties?.map(specialty => (
        <>
          <Flex
            key={specialty.id}
            onClick={() => handleDoctorSelect(specialty.id)}
            $direction={'row'}
            $align={'center'}
            $justifyContent={'flex-start'}
            $gap={12}
            style={{ width: '100%' }}
          >
            <RadioButton
              value={specialty.id}
              register={register('doctor', { required: 'Выберите специальность врача' })}
              checked={selectedSpecialty === specialty.id}
              onChange={() => handleDoctorSelect(specialty.id)}
            />
            <Flex
              $direction={'column'}
              style={{ width: '100%', flex: 1 }}
              $align={'flex-start'}
              $gap={4}
            >
              <CheckCardName>{specialty.name}</CheckCardName>

              <Flex
                $direction={'column'}
                $align={'flex-start'}
                $justifyContent={'flex-start'}
                style={{ width: '100%' }}
              >
                <CheckCardDescription>
                  <span>Доступно врачей:</span>
                  <StatValue $available={!!specialty.countFreeParticipant}>
                    {' '}
                    {specialty.countFreeParticipant}
                  </StatValue>
                </CheckCardDescription>
                <CheckCardDescription>
                  <span>Свободных талонов:</span>
                  <StatValue $available={!!specialty.countFreeTicket}>
                    {' '}
                    {specialty.countFreeTicket}
                  </StatValue>
                </CheckCardDescription>
              </Flex>
            </Flex>
          </Flex>
          <Line marginBottom={0} marginTop={0} />
        </>
      ))}
    </Flex>
  );
};
