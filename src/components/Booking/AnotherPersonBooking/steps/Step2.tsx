import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useGetSpecialtiesQuery } from '@/api/services/booking-dictionary-controller/booking-dictionary-controller.ts';
import { useAppSelector } from '@/store/redux-hooks.ts';

import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';

import { Flex, Line } from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { STEPS_CONFIG } from '@/components/Booking/AnotherPersonBooking/steps-config.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';
import styled from 'styled-components';
import { RadioBtnCard } from '@/components/ui/RadioBtnCard/RadioBtnCard.tsx';
import { ISpecialty } from '@/api/services/booking-dictionary-controller/booking-dictionary-controller.types.ts';

const Wrapper = styled(Flex).attrs({
  $direction: 'column',
  $align: 'flex-start',
  $justifyContent: 'flex-start',
  $gap: 16,
})`
  width: 100%;
`;

export const Step2: React.FC = () => {
  const { hapticFeedback } = useMaxBridgeContext();
  const { register, watch, setValue } = useFormContext();
  const { step: currentStep } = useAppSelector(state => state.stepper);
  const selectedSpecialty = watch('specialty');
  const selectedLpu = watch('lpu');

  const {
    data: specialties,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetSpecialtiesQuery({ lpuId: selectedLpu?.id }, { skip: !selectedLpu?.id });

  const stepFields = STEPS_CONFIG[currentStep].fields;
  const [specialty] = stepFields;

  const handleDoctorSelect = (currentSpecialty: ISpecialty) => {
    hapticFeedback('impact', 'light').then(() => {
      setValue(specialty, currentSpecialty, {
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
    return <ErrorMessage onTryAgain={() => refetch()}>Ошибка загрузки специальностей</ErrorMessage>;
  }

  return (
    <Wrapper>
      {specialties?.map(specialty => (
        <Wrapper key={specialty.id + specialty.ferId}>
          <RadioBtnCard
            id={specialty.id}
            name={specialty.name}
            availableTop={{ label: 'Доступно врачей', value: specialty.countFreeParticipant }}
            availableBottom={{ label: 'Свободно талонов', value: specialty.countFreeTicket }}
            onClick={() => handleDoctorSelect(specialty)}
            checked={
              specialty.id === selectedSpecialty?.id && specialty.ferId === selectedSpecialty?.ferId
            }
            register={register('specialty', { required: 'Выберите специальность врача' })}
          />
          <Line $marginBottom={0} $marginTop={0} />
        </Wrapper>
      ))}
    </Wrapper>
  );
};
