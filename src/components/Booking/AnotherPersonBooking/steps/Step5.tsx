import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import styled from 'styled-components';

import { Flex } from '@/components/ui/StyledComponents.tsx';
import { CustomInput } from '@/components/ui/CustomInput/CustomInput.tsx';
import { CustomTextarea } from '@/components/ui/CustomTextarea/CustomTextarea.tsx';
import { STEPS_CONFIG } from '@/components/Booking/AnotherPersonBooking/steps-config.tsx';
import {
  CustomSelect,
  SelectOption,
  SelectValue,
} from '@/components/ui/CustomSelect/CustomSelect.tsx';
type GenderOption = SelectOption & { value: 'm' | 'f' };

const PageTitle = styled.span`
  width: 100%;
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.black};
  text-align: left;
`;

const genderOptions: GenderOption[] = [
  { label: 'Мужской', value: 'm' },
  { label: 'Женский', value: 'f' },
];

export const Step5: React.FC = () => {
  const { register, setValue, control } = useFormContext();
  const stepFields = STEPS_CONFIG[0].fields;
  const [lastName, firstName, birthDate, snils, polisN, phoneField, mail] = stepFields;

  const phoneValue = useWatch({
    control,
    name: phoneField,
  });

  const genderValue = useWatch({
    control,
    name: 'gender',
  });

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

      setValue(phoneField, result, { shouldValidate: true });
    } else {
      setValue(phoneField, '', { shouldValidate: true });
    }
  };
  const handleChangeGender = (value: SelectValue | null) => {
    setValue('gender', value, { shouldValidate: true });
  };

  const phonePattern = {
    value: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
    message: 'Введите номер в формате +7 (999) 999-99-99',
  };

  return (
    <Flex $direction={'column'} $gap={16}>
      {/*Title*/}
      <PageTitle>Данные пациента</PageTitle>
      {/* Основные поля пациента */}
      <CustomInput
        title="Фамилия"
        placeholder="Иванов"
        required
        showErrorText
        register={register(lastName, {
          required: 'Введите фамилию',
          minLength: {
            value: 2,
            message: 'Фамилия должна содержать минимум 2 символа',
          },
        })}
      />

      <CustomInput
        title="Имя"
        placeholder="Иван"
        required
        showErrorText
        register={register(firstName, {
          required: 'Введите имя',
          minLength: {
            value: 2,
            message: 'Имя должно содержать минимум 2 символа',
          },
        })}
      />

      <CustomInput title="Отчество" placeholder="Иванович" register={register('middleName')} />

      <CustomInput
        title="Дата рождения"
        required
        type="date"
        showErrorText
        register={register(birthDate, {
          required: 'Введите дату рождения',
          validate: value => {
            if (!value) return true;
            const birthDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            return (age >= 0 && age <= 120) || 'Введите корректную дату рождения';
          },
        })}
      />

      <CustomSelect
        title="Пол"
        options={genderOptions}
        value={genderValue}
        onChange={handleChangeGender}
        isClearable={false}
        cyName="gender-select"
      />

      <CustomInput
        title="СНИЛС"
        placeholder=""
        required
        showErrorText
        register={register(snils, {
          required: 'Введите СНИЛС',
          minLength: {
            value: 2,
            message: 'СНИЛС должен содержать минимум 2 символа',
          },
        })}
      />
      <CustomInput
        title="Номер полиса ОМС"
        placeholder=""
        required
        showErrorText
        register={register(polisN, {
          required: 'Введите Номер полиса ОМС',
          minLength: {
            value: 2,
            message: 'Номер полиса ОМС должен содержать минимум 2 символа',
          },
        })}
      />
      <CustomInput title="Серия полиса ОМС" register={register('polisS')} />
      {/* Контактные данные */}
      <CustomInput
        title="Телефон"
        required
        placeholder="+7 (999) 999-99-99"
        value={phoneValue || ''}
        onChange={handlePhoneChange}
        register={register(phoneField, {
          required: 'Введите номер телефона',
          pattern: phonePattern,
          validate: value => {
            const numbers = value?.replace(/\D/g, '') || '';
            return numbers.length === 11 || 'Номер должен содержать 11 цифр';
          },
        })}
        showErrorText
      />

      <CustomInput
        title="Электронная почта"
        type="email"
        placeholder="example@mail.ru"
        required
        showErrorText
        register={register(mail, {
          required: 'Введите email',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Введите корректный email',
          },
        })}
      />

      {/* Комментарий */}
      <CustomTextarea
        title="Комментарий"
        placeholder="Дополнительная информация..."
        rows={3}
        register={register('comments')}
      />
    </Flex>
  );
};
