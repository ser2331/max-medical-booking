import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import { Flex, Section } from '@/components/ui/StyledComponents.tsx';
import { CustomInput } from '@/components/ui/CustomInput/CustomInput.tsx';
import { Card } from '@/components/ui/Cart.tsx';
import { CustomTextarea } from '@/components/ui/CustomTextarea/CustomTextarea.tsx';
import { STEPS_CONFIG } from '@/components/Booking/DistrictBooking/steps-config.tsx';

const CheckboxContainer = styled(Flex).attrs({ $align: 'flex-start' })`
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.grey3};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.blueHover};
  }

  &:focus-within {
    border-color: ${props => props.theme.colors.blue};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.blueLight};
  }
`;

const Checkbox = styled.input`
  margin-top: 2px;
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:checked {
    accent-color: ${props => props.theme.colors.blue};
  }
`;

const CheckboxLabel = styled.label`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: 1.4;
  cursor: pointer;
  flex: 1;

  a {
    color: ${props => props.theme.colors.blue};
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.blueHover};
      text-decoration: none;
    }
  }
`;

const ValidationError = styled.div`
  color: ${props => props.theme.colors.red};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.redLight};
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.red}20;
`;

export const Step5: React.FC = () => {
  const {
    register,
    setValue,
    control,
    formState: { errors, touchedFields },
  } = useFormContext();
  const stepFields = STEPS_CONFIG[4].fields;
  const [lastName, firstName, birthdate, phoneField, mail, consentAgreement] = stepFields;
  const phoneValue = useWatch({
    control,
    name: phoneField,
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

  const phonePattern = {
    value: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
    message: 'Введите номер в формате +7 (999) 999-99-99',
  };

  const shouldShowError = (fieldName: string) => {
    return errors[fieldName] && touchedFields[fieldName];
  };

  return (
    <Section>
      <Card style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Основные поля пациента */}
        <CustomInput
          title="Фамилия"
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
          register={register(birthdate, {
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
          title="Email"
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

        {/* Согласие на обработку данных */}
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            {...register(consentAgreement, {
              required: 'Необходимо согласие на обработку персональных данных',
            })}
          />
          <CheckboxLabel htmlFor="consentAgreement">
            Я даю согласие на обработку моих персональных данных в соответствии с{' '}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              политикой конфиденциальности
            </a>
          </CheckboxLabel>
        </CheckboxContainer>

        {shouldShowError(consentAgreement) && (
          <ValidationError>{errors[consentAgreement]?.message as string}</ValidationError>
        )}
      </Card>
    </Section>
  );
};
