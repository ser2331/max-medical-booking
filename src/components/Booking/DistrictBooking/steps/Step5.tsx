import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import { Section } from '@/components/ui/CommonComponents.tsx';
import { Card } from '@/components/ui/StyledComponents.tsx';
const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FieldWrapper = styled.div`
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.tertiary};
  }

  &:disabled {
    background: ${props => props.theme.colors.background.secondary};
    color: ${props => props.theme.colors.text.tertiary};
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.tertiary};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.border.primary};
`;

const Checkbox = styled.input`
  margin-top: 2px;
  accent-color: ${props => props.theme.colors.primary};
`;

const CheckboxLabel = styled.label`
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: 1.4;
  cursor: pointer;

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;

const ValidationError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-top: ${props => props.theme.spacing.xs};
`;

const RequiredField = styled.span`
  color: ${props => props.theme.colors.error};
`;

export const Step5: React.FC = () => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const phoneValue = useWatch({
    control,
    name: 'patientPhone',
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 0) {
      value = value.substring(0, 11);
      let formattedValue = '+7';

      if (value.length > 1) {
        formattedValue += ` (${value.substring(1, 4)}`;
      }
      if (value.length >= 5) {
        formattedValue += `) ${value.substring(4, 7)}`;
      }
      if (value.length >= 8) {
        formattedValue += `-${value.substring(7, 9)}`;
      }
      if (value.length >= 10) {
        formattedValue += `-${value.substring(9, 11)}`;
      }

      setValue('patientPhone', formattedValue, { shouldValidate: true });
    } else {
      setValue('patientPhone', '', { shouldValidate: true });
    }
  };

  return (
    <Section>
      <Card>
        <Section>
          <FieldsGrid>
            <FieldWrapper>
              <Label>
                Фамилия <RequiredField>*</RequiredField>
              </Label>
              <Input
                type="text"
                placeholder="Иванов"
                {...register('patientLastName', {
                  required: 'Введите фамилию',
                  minLength: {
                    value: 2,
                    message: 'Фамилия должна содержать минимум 2 символа',
                  },
                })}
              />
              {errors.patientLastName && (
                <ValidationError>{errors.patientLastName.message as string}</ValidationError>
              )}
            </FieldWrapper>

            <FieldWrapper>
              <Label>
                Имя <RequiredField>*</RequiredField>
              </Label>
              <Input
                type="text"
                placeholder="Иван"
                {...register('patientFirstName', {
                  required: 'Введите имя',
                  minLength: {
                    value: 2,
                    message: 'Имя должно содержать минимум 2 символа',
                  },
                })}
              />
              {errors.patientFirstName && (
                <ValidationError>{errors.patientFirstName.message as string}</ValidationError>
              )}
            </FieldWrapper>

            <FieldWrapper>
              <Label>Отчество</Label>
              <Input type="text" placeholder="Иванович" {...register('patientMiddleName')} />
            </FieldWrapper>

            <FieldWrapper>
              <Label>
                Дата рождения <RequiredField>*</RequiredField>
              </Label>
              <Input
                type="date"
                {...register('patientBirthDate', {
                  required: 'Введите дату рождения',
                  validate: value => {
                    const birthDate = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - birthDate.getFullYear();
                    return (age >= 0 && age <= 120) || 'Введите корректную дату рождения';
                  },
                })}
              />
              {errors.patientBirthDate && (
                <ValidationError>{errors.patientBirthDate.message as string}</ValidationError>
              )}
            </FieldWrapper>
          </FieldsGrid>

          <FieldsGrid>
            <FieldWrapper>
              <Label>
                Телефон <RequiredField>*</RequiredField>
              </Label>
              <Input
                type="tel"
                placeholder="+7 (999) 999-99-99"
                value={phoneValue || ''}
                onInput={handlePhoneChange}
                {...register('patientPhone', {
                  required: 'Введите телефон',
                  validate: value => {
                    const numbers = value?.replace(/\D/g, '') || '';
                    return numbers.length === 11 || 'Номер должен содержать 11 цифр';
                  },
                })}
              />
              {errors.patientPhone && (
                <ValidationError>{errors.patientPhone.message as string}</ValidationError>
              )}
            </FieldWrapper>

            <FieldWrapper>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@mail.ru"
                {...register('patientEmail', {
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Введите корректный email',
                  },
                })}
              />
              {errors.patientEmail && (
                <ValidationError>{errors.patientEmail.message as string}</ValidationError>
              )}
            </FieldWrapper>
          </FieldsGrid>

          <FieldWrapper>
            <Label>Комментарий</Label>
            <TextArea
              placeholder="Дополнительная информация..."
              {...register('comments')}
              rows={3}
            />
          </FieldWrapper>

          <FieldWrapper>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                {...register('consentAgreement', {
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
            {errors.consentAgreement && (
              <ValidationError>{errors.consentAgreement.message as string}</ValidationError>
            )}
          </FieldWrapper>
        </Section>
      </Card>
    </Section>
  );
};
