import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useGetLpusQuery } from '@/api/services/lpus-controller/lpus-controller.ts';
import { ErrorMessage, LoadingSpinner } from '@/components/ui/StyledComponents.tsx';
import { media } from '@/styles/mixins.ts';
import styled from 'styled-components';
import { Accordion } from '@/components/Accordion.tsx';
import { RadioInput } from '@/components/RadioInput.tsx';

export const LpuItem = styled.label<{ $isSelected: boolean }>`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid
    ${props => (props.$isSelected ? props.theme.colors.primary : props.theme.colors.border.primary)};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  background: ${props =>
    props.$isSelected ? props.theme.colors.primary + '10' : props.theme.colors.background.card};
  transition: all 0.2s ease;
  display: flex;
  align-items: flex-start;

  &:hover {
    border-color: ${props =>
      props.$isSelected ? props.theme.colors.primary : props.theme.colors.border.accent};
    background: ${props =>
      props.$isSelected
        ? props.theme.colors.primary + '15'
        : props.theme.colors.background.secondary};
  }

  ${media.md} {
    padding: ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius};
  }
`;

export const LpuContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

export const LpuName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const LpuAddress = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.4;
`;

export const LpuContact = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

export const LpuMeta = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.text.tertiary};
  margin-top: ${props => props.theme.spacing.xs};
  line-height: 1.3;
`;

export const ValidationError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.error}10;
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.error}20;
  text-align: center;
`;

export const Step1: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { data: lpusData, error, isLoading } = useGetLpusQuery({ districtId: '' });

  const selectedLpu = watch('lpu');
  const selectedDistrict = watch('district');

  const lpusByDistrict = React.useMemo(() => {
    if (!lpusData) return {};

    return lpusData.reduce((acc: Record<string, typeof lpusData>, lpu) => {
      const district = lpu.districtName;
      if (!acc[district]) {
        acc[district] = [];
      }
      acc[district].push(lpu);
      return acc;
    }, {});
  }, [lpusData]);

  const handleLpuSelect = (lpuId: number, district: string) => {
    setValue('lpu', lpuId.toString(), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue('district', district, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage>Ошибка загрузки данных</ErrorMessage>;
  }

  const accordionItems = Object.keys(lpusByDistrict)
    .sort()
    .map(district => ({
      key: district,
      header: district,
      defaultExpanded: district === selectedDistrict,
      children: (
        <>
          {lpusByDistrict[district].map(lpu => (
            <LpuItem key={lpu.id} $isSelected={selectedLpu === lpu.id.toString()}>
              <RadioInput
                value={lpu.id}
                register={register('lpu', {
                  required: 'Выберите медицинское учреждение',
                })}
                checked={selectedLpu === lpu.id.toString()}
                onChange={() => handleLpuSelect(lpu.id, district)}
              />
              <LpuContent>
                <LpuName>{lpu.lpuFullName}</LpuName>
                <LpuAddress>{lpu.address}</LpuAddress>
                {lpu.phone && <LpuContact>📞 {lpu.phone}</LpuContact>}
                {lpu.email && <LpuContact>✉️ {lpu.email}</LpuContact>}
                <LpuMeta>
                  {lpu.lpuShortName}
                  {lpu.covidVaccination && ' • 💉 COVID-вакцинация'}
                  {lpu.inDepthExamination && ' • 🩺 Диспансеризация'}
                </LpuMeta>
              </LpuContent>
            </LpuItem>
          ))}
        </>
      ),
    }));

  return (
    <div>
      <Accordion items={accordionItems} allowMultiple={true} />

      <input
        type="hidden"
        {...register('district', {
          required: 'Выберите район',
        })}
      />

      {/* Валидация */}
      {(errors.lpu || errors.district) && (
        <ValidationError>
          {(errors.lpu?.message as string) ||
            (errors.district?.message as string) ||
            'Пожалуйста, выберите медицинское учреждение'}
        </ValidationError>
      )}
    </div>
  );
};
