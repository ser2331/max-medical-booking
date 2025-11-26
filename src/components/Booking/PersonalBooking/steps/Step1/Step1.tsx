import React, { useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetLpusByDistrictQuery } from '@/api/services/lpus-controller/lpus-controller.ts';

import { useDebounce } from '@/hooks/useDebounce.ts';

import { Flex } from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';
import { STEPS_CONFIG } from '@/components/Booking/PersonalBooking/steps-config.tsx';
import { CustomInput } from '@/components/ui/CustomInput/CustomInput.tsx';
import { LpuCardItem } from '@/components/Booking/PersonalBooking/steps/Step1/LpuCardItem.tsx';
import { ILpus } from '@/api/services/lpus-controller/lpus-controller.types.ts';

export const Step1: React.FC = () => {
  const { register, watch, setValue } = useFormContext();
  const {
    data: lpusData = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetLpusByDistrictQuery({ districtId: '' });
  const stepFields = STEPS_CONFIG[0].fields;
  const [searchText, setSearchText] = useState('');
  const [lpuField] = stepFields;
  const selectedLpu = watch('lpu');
  const debouncedSearchText = useDebounce(searchText, 300);

  // фильтрация и сортировка
  const filteredLpus = useMemo(() => {
    if (!debouncedSearchText.trim()) {
      return lpusData;
    }

    const searchLower = debouncedSearchText.toLowerCase();

    return lpusData
      .filter(
        lpu =>
          lpu.lpuFullName.toLowerCase().includes(searchLower) ||
          lpu.districtName.toLowerCase().includes(searchLower) ||
          lpu.address.toLowerCase().includes(searchLower),
      )
      .sort();
  }, [lpusData, debouncedSearchText]);

  // обработчик выбора ЛПУ
  const handleLpuSelect = useCallback(
    (lpu: ILpus) => {
      setValue(lpuField, lpu, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue, lpuField],
  );

  // обработчик поиска
  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);
  if (isLoading || isFetching) {
    return <AppSpin />;
  }

  if (error) {
    return (
      <ErrorMessage onTryAgain={() => refetch()}>
        Мы не смогли получить информацию по районам с сервера
      </ErrorMessage>
    );
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
      <Flex $direction={'column'} $align={'flex-start'} $gap={16}>
        {filteredLpus?.map(lpu => (
          <LpuCardItem
            key={lpu.id}
            lpu={lpu}
            district={lpu.districtName}
            isSelected={selectedLpu?.id === lpu.id}
            onSelect={handleLpuSelect}
          />
        ))}
      </Flex>
      <input
        type="hidden"
        {...register('district', {
          required: 'Выберите район',
        })}
      />
    </Flex>
  );
};
