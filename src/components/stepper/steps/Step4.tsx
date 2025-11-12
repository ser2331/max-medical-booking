import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin-bottom: 16px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2d5bff;
    box-shadow: 0 0 0 2px rgba(45, 91, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  resize: vertical;
  font-size: 14px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2d5bff;
    box-shadow: 0 0 0 2px rgba(45, 91, 255, 0.1);
  }
`;

export const Step4: React.FC = () => {
  const { register, setValue, control } = useFormContext();
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
    <Container>
      <Title>Данные пациента</Title>

      <FormContainer>
        <FieldContainer>
          <Label>ФИО пациента:</Label>
          <Input
            type="text"
            placeholder="Иванов Иван Иванович"
            {...register('patientName', { required: 'Введите ФИО' })}
          />
        </FieldContainer>

        <FieldContainer>
          <Label>Телефон:</Label>
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
        </FieldContainer>

        <FieldContainer>
          <Label>Email:</Label>
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
        </FieldContainer>

        <FieldContainer>
          <Label>Комментарий:</Label>
          <TextArea placeholder="Дополнительная информация..." {...register('comments')} rows={3} />
        </FieldContainer>
      </FormContainer>
    </Container>
  );
};
