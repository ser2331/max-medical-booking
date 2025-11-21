import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useGetSpecialtiesQuery } from '@/api/services/lpus-controller/lpus-controller.ts';

import { Flex, Line } from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { STEPS_CONFIG } from '@/components/DoctorAppointmentMake/DistrictBooking/steps-config.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';
import styled from 'styled-components';
import { RadioBtnCard } from '@/components/ui/RadioBtnCard/RadioBtnCard.tsx';

const Wrapper = styled(Flex).attrs({
  $direction: 'column',
  $align: 'flex-start',
  $justifyContent: 'flex-start',
  $gap: 16,
})`
  width: 100%;
`;

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
    <Wrapper>
      {specialties?.map(specialty => (
        <Wrapper key={specialty.id}>
          <RadioBtnCard
            id={specialty.id}
            name={specialty.name}
            availableTop={{ label: 'Доступно врачей', value: specialty.countFreeParticipant }}
            availableBottom={{ label: 'Свободно талонов', value: specialty.countFreeTicket }}
            onClick={handleDoctorSelect}
            checked={specialty.id === selectedSpecialty}
            register={register('specialty', { required: 'Выберите специальность врача' })}
          />
          <Line $marginBottom={0} $marginTop={0} />
        </Wrapper>
      ))}
    </Wrapper>
  );
};
