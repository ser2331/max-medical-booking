import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { useGetLpusQuery } from '@/api/services/lpus-controller/lpus-controller.ts';

import { CheckCardDescription, CheckCardName, Flex } from '@/components/ui/StyledComponents.tsx';
import { Accordion } from '@/components/ui/Accordion/Accordion.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { RadioButton } from '@/components/ui/RadioButton/RadioButton.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';
import { STEPS_CONFIG } from '@/components/DoctorAppointmentMake/DistrictBooking/steps-config.tsx';

const LpuCard = styled(Flex).attrs({ $align: 'flex-start' })`
  &:nth-child(1) {
    margin-top: 16px;
  }
  &:not(&:nth-last-child(1)) {
    border-bottom: 1px solid ${props => props.theme.colors.grey1};
    padding-bottom: ${props => props.theme.spacing.md};
  }
`;

export const Step1: React.FC = () => {
  const { register, watch, setValue } = useFormContext();
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
    return <ErrorMessage />;
  }

  const accordionItems = Object.keys(lpusByDistrict)
    .sort()
    .map(district => ({
      key: district,
      header: district,
      defaultExpanded: district === selectedDistrict,
      children: (
        <Flex $direction={'column'} $align={'flex-start'} $gap={16}>
          {lpusByDistrict[district].map(lpu => (
            <LpuCard $gap={12} key={lpu.id} onClick={() => handleLpuSelect(lpu.id, district)}>
              <RadioButton
                value={lpu.id}
                register={register('lpu', {
                  required: 'Выберите медицинское учреждение',
                })}
                checked={selectedLpu === lpu.id.toString()}
                onChange={() => handleLpuSelect(lpu.id, district)}
              />
              <Flex $direction={'column'} $align={'flex-start'} $gap={4}>
                <CheckCardName>{lpu.lpuFullName}</CheckCardName>
                <CheckCardDescription>{lpu.address}</CheckCardDescription>
                {lpu.phone && <CheckCardDescription>{lpu.phone}</CheckCardDescription>}
                {lpu.email && <CheckCardDescription>{lpu.email}</CheckCardDescription>}
                {/*<LpuMeta>*/}
                {/*  {lpu.lpuShortName}*/}
                {/*  {lpu.covidVaccination && ' • 💉 COVID-вакцинация'}*/}
                {/*  {lpu.inDepthExamination && ' • 🩺 Диспансеризация'}*/}
                {/*</LpuMeta>*/}
              </Flex>
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
    </div>
  );
};
