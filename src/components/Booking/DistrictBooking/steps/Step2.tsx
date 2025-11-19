import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useGetSpecialtiesQuery } from '@/api/services/lpus-controller/lpus-controller.ts';

import {
  ErrorMessage,
  Flex,
  HeaderRow,
  Section,
  SpecialtyContent,
  SpecialtyName,
  SpecialtyStats,
  StatItem,
  StatValue,
  ValidationError,
} from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { Card } from '@/components/ui/Cart.tsx';
import { RadioButton } from '@/components/ui/RadioButton/RadioButton.tsx';
import { STEPS_CONFIG } from '@/components/Booking/DistrictBooking/steps-config.tsx';

export const Step2: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
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
    <Section>
      {specialties?.map(specialty => (
        <Card key={specialty.id} onClick={() => handleDoctorSelect(specialty.id)}>
          <Flex $direction={'row'} $gap={16}>
            <RadioButton
              value={specialty.id}
              register={register('doctor', { required: 'Выберите специальность врача' })}
              checked={selectedSpecialty === specialty.id}
              onChange={() => handleDoctorSelect(specialty.id)}
            />
            <SpecialtyContent>
              <HeaderRow>
                <SpecialtyName>{specialty.name}</SpecialtyName>
              </HeaderRow>

              <SpecialtyStats>
                <StatItem $type="participant">
                  <span>👥 Доступно врачей:</span>
                  <StatValue>{specialty.countFreeParticipant}</StatValue>
                </StatItem>
                <StatItem $type="ticket">
                  <span>🎫 Свободных талонов:</span>
                  <StatValue>{specialty.countFreeTicket}</StatValue>
                </StatItem>
              </SpecialtyStats>
            </SpecialtyContent>
          </Flex>
        </Card>
      ))}

      {errors.doctor && <ValidationError>{errors.doctor.message as string}</ValidationError>}
    </Section>
  );
};
