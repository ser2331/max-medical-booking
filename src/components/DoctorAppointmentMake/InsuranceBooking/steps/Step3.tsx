import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin-bottom: 16px;
`;

const DateContainer = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const DateInput = styled.input`
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

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const TimeLabel = styled.label`
  padding: 12px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #2d5bff;
    background-color: #f8f9ff;
  }

  input:checked + & {
    border-color: #2d5bff;
    background-color: #2d5bff;
    color: white;
  }
`;

const RadioInput = styled.input`
  display: none;
`;

export const Step3: React.FC = () => {
  const { register } = useFormContext();

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <Container>
      <Title>Выберите дату и время</Title>

      <DateContainer>
        <Label>Дата приема:</Label>
        <DateInput type="date" {...register('date', { required: 'Выберите дату' })} />
      </DateContainer>

      <div>
        <Label>Время приема:</Label>
        <TimeGrid>
          {timeSlots.map(time => (
            <TimeLabel key={time}>
              <RadioInput
                type="radio"
                value={time}
                {...register('time', { required: 'Выберите время' })}
              />
              {time}
            </TimeLabel>
          ))}
        </TimeGrid>
      </div>
    </Container>
  );
};
