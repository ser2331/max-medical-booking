import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
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
} from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { Card } from '@/components/ui/Cart.tsx';
import { RadioButton } from '@/components/ui/RadioButton/RadioButton.tsx';

const StatValue = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.black};
`;

const ValidationError = styled.div`
  color: ${props => props.theme.colors.red};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.red}10;
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.red}20;
  text-align: center;
`;

export const Step2: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedSpecialty = watch('doctor');
  const { data: specialties, error, isLoading } = useGetSpecialtiesQuery({ lpuId: '' });
  const handleDoctorSelect = (doctor: string) => {
    setValue('doctor', doctor, {
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
