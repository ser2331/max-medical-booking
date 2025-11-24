import React, { useState, useMemo, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetLpusQuery } from '@/api/services/lpus-controller/lpus-controller.ts';

import { useDebounce } from '@/hooks/useDebounce.ts';

import { Flex } from '@/components/ui/StyledComponents.tsx';
import { Accordion } from '@/components/ui/Accordion/Accordion.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';
import { STEPS_CONFIG } from '@/components/DoctorAppointmentMake/DistrictBooking/steps-config.tsx';
import { CustomInput } from '@/components/ui/CustomInput/CustomInput.tsx';
import { LpuCardItem } from '@/components/DoctorAppointmentMake/DistrictBooking/steps/Step1/LpuCardItem.tsx';

export const Step1: React.FC = () => {
  const { register, watch, setValue } = useFormContext();
  const { data: lpusData, error, isLoading } = useGetLpusQuery({ districtId: '' });
  const stepFields = STEPS_CONFIG[0].fields;
  const [searchText, setSearchText] = useState('');
  const [districtField, lpuField] = stepFields;
  const selectedLpu = watch('lpu');
  const selectedDistrict = watch('district');

  const debouncedSearchText = useDebounce(searchText, 300);

  // группировка по районам
  const lpusByDistrict = useMemo(() => {
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

  // фильтрация и сортировка
  const filteredDistricts = useMemo(() => {
    const districts = Object.keys(lpusByDistrict);

    if (!debouncedSearchText.trim()) {
      return districts.sort();
    }

    const searchLower = debouncedSearchText.toLowerCase();

    return districts
      .filter(district => {
        // Проверяем название района
        if (district.toLowerCase().includes(searchLower)) {
          return true;
        }

        // Проверяем ЛПУ в этом районе
        return lpusByDistrict[district].some(lpu =>
          lpu.lpuFullName.toLowerCase().includes(searchLower),
        );
      })
      .sort();
  }, [lpusByDistrict, debouncedSearchText]);

  // обработчик выбора ЛПУ
  const handleLpuSelect = useCallback(
    (lpuId: number, district: string) => {
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
    },
    [setValue, lpuField, districtField],
  );

  // обработчик поиска
  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  // элементы аккордеона
  const accordionItems = useMemo(() => {
    return filteredDistricts.map(district => ({
      key: district,
      header: district,
      defaultExpanded: district === selectedDistrict || debouncedSearchText.length > 0,
      children: (
        <Flex $direction={'column'} $align={'flex-start'} $gap={16}>
          {lpusByDistrict[district].map(lpu => (
            <LpuCardItem
              key={lpu.id}
              lpu={lpu}
              district={district}
              isSelected={selectedLpu === lpu.id.toString()}
              onSelect={handleLpuSelect}
            />
          ))}
        </Flex>
      ),
    }));
  }, [
    filteredDistricts,
    lpusByDistrict,
    selectedDistrict,
    selectedLpu,
    handleLpuSelect,
    debouncedSearchText,
  ]);

  if (isLoading) {
    return <AppSpin />;
  }

  if (error) {
    return <ErrorMessage>Мы не смогли получить информацию по районам с сервера</ErrorMessage>;
  }

  return (
    <Flex $direction={'column'} $align={'flex-start'} $gap={16}>
      <CustomInput
        type={'search'}
        clearable={false}
        onChange={handleSearch}
        value={searchText}
        placeholder="Поиск..."
      />
      <Accordion items={accordionItems} allowMultiple={true} />

      <input
        type="hidden"
        {...register('district', {
          required: 'Выберите район',
        })}
      />
    </Flex>
  );
};
