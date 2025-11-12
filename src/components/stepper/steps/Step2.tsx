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

const DoctorsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DoctorLabel = styled.label<{ $isSelected: boolean }>`
  padding: 16px;
  border: 2px solid ${props => (props.$isSelected ? '#2d5bff' : '#e9ecef')};
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => (props.$isSelected ? '#f0f4ff' : 'white')};
  transition: all 0.2s ease;

  &:hover {
    border-color: #2d5bff;
    background-color: #f8f9ff;
  }
`;

const RadioInput = styled.input`
  margin-right: 12px;
`;

const DoctorName = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const DoctorInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

export const Step2: React.FC = () => {
  const { register, watch } = useFormContext();
  const selectedDoctor = watch('doctor');

  const doctors = [
    { id: 'ivanov', name: 'Иванов А.П.', specialty: 'Терапевт', experience: '15 лет' },
    { id: 'petrova', name: 'Петрова М.В.', specialty: 'Хирург', experience: '10 лет' },
    { id: 'sidorov', name: 'Сидоров И.С.', specialty: 'Педиатр', experience: '8 лет' },
  ];

  return (
    <Container>
      <Title>Выберите специалиста</Title>
      <DoctorsList>
        {doctors.map(doctor => (
          <DoctorLabel key={doctor.id} $isSelected={selectedDoctor === doctor.id}>
            <RadioInput
              type="radio"
              value={doctor.id}
              {...register('doctor', { required: 'Выберите врача' })}
            />
            <div>
              <DoctorName>{doctor.name}</DoctorName>
              <DoctorInfo>
                {doctor.specialty} • {doctor.experience}
              </DoctorInfo>
            </div>
          </DoctorLabel>
        ))}
      </DoctorsList>
    </Container>
  );
};
