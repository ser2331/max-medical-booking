import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { useGetSpecialtiesQuery } from '@/api/services/lpus-controller/lpus-controller.ts';
import { ErrorMessage, LoadingSpinner } from '@/components/ui/StyledComponents.tsx';
import { media } from '@/styles/mixins.ts';
import { RadioInput } from '@/components/RadioInput.tsx';
import {
  HeaderRow,
  Section,
  SpecialtyContent,
  SpecialtyName,
  SpecialtyStats,
  StatItem,
} from '@/components/ui/CommonComponents.tsx';

const SpecialtyLabel = styled.label<{ $isSelected: boolean }>`
  padding: ${props => props.theme.spacing.lg};
  border: 2px solid
    ${props => (props.$isSelected ? props.theme.colors.primary : props.theme.colors.border.primary)};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  background-color: ${props =>
    props.$isSelected ? props.theme.colors.primary + '10' : props.theme.colors.background.card};
  transition: all 0.2s ease;
  display: flex;
  align-items: flex-start;

  &:hover {
    border-color: ${props =>
      props.$isSelected ? props.theme.colors.primary : props.theme.colors.border.accent};
    background-color: ${props =>
      props.$isSelected
        ? props.theme.colors.primary + '15'
        : props.theme.colors.background.secondary};
  }

  ${media.md} {
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.small};
  }
`;

const StatValue = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
`;

const ValidationError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.error}10;
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.error}20;
  text-align: center;
`;

export const Step2: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const selectedSpecialty = watch('doctor');
  const { data: specialties, error, isLoading } = useGetSpecialtiesQuery({ lpuId: '' });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage>Ошибка загрузки специальностей</ErrorMessage>;
  }

  return (
    <Section>
      {specialties?.map(specialty => (
        <SpecialtyLabel key={specialty.id} $isSelected={selectedSpecialty === specialty.id}>
          <RadioInput
            value={specialty.id}
            register={register('doctor', { required: 'Выберите специальность врача' })}
            checked={selectedSpecialty === specialty.id}
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
        </SpecialtyLabel>
      ))}

      {errors.doctor && <ValidationError>{errors.doctor.message as string}</ValidationError>}
    </Section>
  );
};
