import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useAppSelector } from '@/store/redux-hooks.ts';

import { Flex } from '@/components/ui/StyledComponents.tsx';
import { CustomInput } from '@/components/ui/CustomInput/CustomInput.tsx';
import { CustomTextarea } from '@/components/ui/CustomTextarea/CustomTextarea.tsx';
import { STEPS_CONFIG } from '@/components/Booking/AnotherPersonBooking/steps-config.tsx';
import {
  CustomSelect,
  SelectOption,
  SelectValue,
} from '@/components/ui/CustomSelect/CustomSelect.tsx';
import {
  formatPolisNumber,
  formatPolisSeries,
  formatSNILS,
  validateBirthDate,
  validateEmail,
  validatePolisNumber,
  validateSNILS,
  validationPatterns,
} from '@/helpers/validateHelpers.ts';
import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { testUser } from '@/constants.ts';

type GenderOption = SelectOption & { value: '1' | '0' };

const genderOptions: GenderOption[] = [
  { label: 'Мужской', value: '1' },
  { label: 'Женский', value: '0' },
];

export const Step5: React.FC = () => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  const { step: currentStep } = useAppSelector(state => state.stepper);
  const stepFields = STEPS_CONFIG[currentStep].fields;
  const [lastName, firstName, birthDate, polisN] = stepFields;

  const phoneValue = useWatch({ control, name: 'phoneField' });
  const genderValue = useWatch({ control, name: 'gender' });
  const snilsValue = useWatch({ control, name: 'snils' });
  const polisNumberValue = useWatch({ control, name: polisN });
  const polisSeriesValue = useWatch({ control, name: 'polisS' });

  const handlePhoneChange = (value: string) => {
    let formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length > 0) {
      formattedValue = formattedValue.substring(0, 11);
      let result = '+7';

      if (formattedValue.length > 1) {
        result += ` (${formattedValue.substring(1, 4)}`;
      }
      if (formattedValue.length >= 5) {
        result += `) ${formattedValue.substring(4, 7)}`;
      }
      if (formattedValue.length >= 8) {
        result += `-${formattedValue.substring(7, 9)}`;
      }
      if (formattedValue.length >= 10) {
        result += `-${formattedValue.substring(9, 11)}`;
      }

      setValue('phoneField', result, { shouldValidate: true });
    } else {
      setValue('phoneField', '', { shouldValidate: true });
    }
  };

  const handleSNILSChange = (value: string) => {
    const formattedValue = formatSNILS(value);
    setValue('snils', formattedValue, { shouldValidate: true });
  };

  const handlePolisNumberChange = (value: string) => {
    const formattedValue = formatPolisNumber(value);
    setValue(polisN, formattedValue, { shouldValidate: true });
  };

  const handlePolisSeriesChange = (value: string) => {
    const formattedValue = formatPolisSeries(value);
    setValue('polisS', formattedValue, { shouldValidate: true });
  };

  const handleChangeGender = (value: SelectValue | null) => {
    setValue('gender', value, { shouldValidate: true });
  };

  const handleAutoSubmit = () => {
    // Заполняем все поля разом
    Object.entries(testUser).forEach(([fieldName, value]) => {
      setValue(fieldName, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    });
  };

  return (
    <Flex $direction={'column'} $gap={16}>
      {/* Основные поля пациента */}
      <CustomInput
        title="Фамилия"
        placeholder="Иванов"
        register={register(lastName, {
          required: 'Введите фамилию',
          minLength: {
            value: 2,
            message: 'Фамилия должна содержать минимум 2 символа',
          },
          maxLength: {
            value: 50,
            message: 'Фамилия слишком длинная',
          },
          pattern: {
            value: validationPatterns.name,
            message: 'Фамилия должна содержать только русские буквы, дефисы и пробелы',
          },
        })}
        required
        showErrorText
        error={errors?.[lastName]?.message}
      />

      <CustomInput
        title="Имя"
        placeholder="Иван"
        register={register(firstName, {
          required: 'Введите имя',
          minLength: {
            value: 2,
            message: 'Имя должно содержать минимум 2 символа',
          },
          maxLength: {
            value: 50,
            message: 'Имя слишком длинное',
          },
          pattern: {
            value: validationPatterns.name,
            message: 'Имя должно содержать только русские буквы, дефисы и пробелы',
          },
        })}
        required
        showErrorText
        error={errors?.[firstName]?.message}
      />

      <CustomInput
        title="Отчество"
        placeholder="Иванович"
        register={register('middleName', {
          minLength: {
            value: 2,
            message: 'Отчество должно содержать минимум 2 символа',
          },
          maxLength: {
            value: 50,
            message: 'Отчество слишком длинное',
          },
          pattern: {
            value: validationPatterns.name,
            message: 'Отчество должно содержать только русские буквы, дефисы и пробелы',
          },
        })}
      />

      <CustomInput
        title="Дата рождения"
        type="date"
        register={register(birthDate, {
          required: 'Введите дату рождения',
          validate: validateBirthDate,
        })}
        required
        showErrorText
        error={errors?.[birthDate]?.message}
      />

      <CustomSelect
        title="Пол"
        placeholder={'Выберите пол'}
        options={genderOptions}
        value={genderValue}
        onChange={handleChangeGender}
        isClearable={false}
        isSearchable={false}
        cyName="gender-select"
      />

      <CustomInput
        title="СНИЛС"
        placeholder="XXX-XXX-XXX XX"
        value={snilsValue || ''}
        onChange={handleSNILSChange}
        register={register('snils', {
          required: 'Введите СНИЛС',
          validate: validateSNILS,
        })}
        // required
        // showErrorText
        // error={errors?.['snils']?.message}
      />

      <CustomInput
        title="Номер полиса ОМС"
        placeholder="XXXX XXXXXX XXXXXX"
        value={polisNumberValue || ''}
        onChange={handlePolisNumberChange}
        register={register(polisN, {
          required: 'Введите номер полиса ОМС',
          validate: validatePolisNumber,
        })}
        required
        showErrorText
        error={errors?.[polisN]?.message}
      />

      <CustomInput
        title="Серия полиса ОМС"
        placeholder="XXXXXX"
        value={polisSeriesValue || ''}
        onChange={handlePolisSeriesChange}
        register={register('polisS', {
          pattern: {
            value: validationPatterns.polisSeries,
            message: 'Серия полиса должна содержать 6 цифр',
          },
        })}
      />

      {/* Контактные данные */}
      <CustomInput
        title="Телефон"
        placeholder="+7 (999) 999-99-99"
        value={phoneValue || ''}
        onChange={handlePhoneChange}
        register={register('phoneField', {
          required: 'Введите номер телефона',
          pattern: {
            value: validationPatterns.phone,
            message: 'Введите номер в формате +7 (999) 999-99-99',
          },
          validate: value => {
            const numbers = value?.replace(/\D/g, '') || '';
            return numbers.length === 11 || 'Номер должен содержать 11 цифр';
          },
        })}
        // required
        // showErrorText
        // error={errors?.['phoneField']?.message}
      />

      <CustomInput
        title="Электронная почта"
        type="email"
        placeholder="example@mail.ru"
        register={register('mail', {
          required: 'Введите email',
          validate: validateEmail,
        })}
        // required
        // showErrorText
        // error={errors?.['mail']?.message}
      />

      {/* Комментарий */}
      <CustomTextarea
        title="Комментарий"
        placeholder="Дополнительная информация..."
        rows={3}
        register={register('comments', {
          maxLength: {
            value: 500,
            message: 'Комментарий не должен превышать 500 символов',
          },
        })}
      />

      <div style={{ marginBottom: '16px' }}>
        <CustomButton onClick={handleAutoSubmit}>АВТОЗАПОЛНЕНИЕ</CustomButton>
      </div>
    </Flex>
  );
};
