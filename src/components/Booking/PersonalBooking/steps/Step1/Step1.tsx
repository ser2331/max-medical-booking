import React, { useCallback, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAppSelector } from '@/store/redux-hooks.ts';

import { useGetLpusByUserQuery } from '@/api/services/booking-dictionary-controller/booking-dictionary-controller.ts';

import { useDebounce } from '@/hooks/useDebounce.ts';

import { Flex } from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';
import { STEPS_CONFIG } from '@/components/Booking/PersonalBooking/steps-config.tsx';
import { CustomInput } from '@/components/ui/CustomInput/CustomInput.tsx';
import { LpuCardItem } from '@/components/Booking/PersonalBooking/steps/Step1/LpuCardItem.tsx';
import { ILpus } from '@/api/services/booking-dictionary-controller/booking-dictionary-controller.types.ts';
import { getLpuParams } from '@/helpers/heplers.tsx';

export const Step1: React.FC = () => {
  const { register, watch, setValue, getValues } = useFormContext();
  const { step: currentStep } = useAppSelector(state => state.stepper);

  const queryParams = useMemo(() => getLpuParams(getValues), [getValues]);

  const {
    data: lpusData = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetLpusByUserQuery(queryParams);

  const stepFields = STEPS_CONFIG[currentStep].fields;
  const [lpuField] = stepFields;
  const [searchText, setSearchText] = useState('');
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
          lpu.districtName.toLowerCase().includes(searchLower),
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
  console.log('lpusData', lpusData);
  console.log('error', error);
  if (!error && !lpusData.length) {
    return (
      <ErrorMessage onTryAgain={() => refetch()}>
        Не удалось получить информацию о прикреплении по полису ОМС к медицинским организациям.
        Убедитесь, что данные полиса введены корректно и повторите попытку. Если данные введены
        корректно, обратитесь в регистратуру медорганизации
      </ErrorMessage>
    );
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
