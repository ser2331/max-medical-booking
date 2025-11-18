import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useGetLpusQuery } from '@/api/services/lpus-controller/lpus-controller.ts';
import { ErrorMessage, Flex } from '@/components/ui/StyledComponents.tsx';
import styled from 'styled-components';
import { Accordion } from '@/components/ui/Accordion/Accordion.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { RadioButton } from '@/components/ui/RadioButton/RadioButton.tsx';
import { STEPS_CONFIG } from '@/components/Booking/DistrictBooking/steps-config.tsx';

export const LpuContent = styled(Flex).attrs({ $direction: 'column' })`
  flex: 1;
  gap: ${props => props.theme.spacing.xs};
`;

export const LpuName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const LpuAddress = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.black};
  line-height: 1.4;
`;

export const LpuContact = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.black};
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

export const LpuMeta = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.black};
  margin-top: ${props => props.theme.spacing.xs};
  line-height: 1.3;
`;

export const ValidationError = styled.div`
  color: ${props => props.theme.colors.red};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.red}10;
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.red}20;
  text-align: center;
`;

const LpuCard = styled(Flex)`
  &:nth-child(1) {
    margin-top: 16px;
  }
  &:not(&:nth-last-child(1)) {
    border-bottom: 1px solid ${props => props.theme.colors.grey1};
    padding-bottom: ${props => props.theme.spacing.md};
  }
`;
export const Step1: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { data: lpusData, error, isLoading } = useGetLpusQuery({ districtId: '' });
  const stepFields = STEPS_CONFIG[0].fields;
  const [districtField, lpuField] = stepFields;
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
    setValue(lpuField, lpuId.toString(), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue(districtField, district, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  if (isLoading) {
    return <AppSpin />;
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
        <Flex $direction={'column'} $align={'stretch'} $gap={16}>
          {lpusByDistrict[district].map(lpu => (
            <LpuCard $gap={8} key={lpu.id} onClick={() => handleLpuSelect(lpu.id, district)}>
              <RadioButton
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
            </LpuCard>
          ))}
        </Flex>
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
