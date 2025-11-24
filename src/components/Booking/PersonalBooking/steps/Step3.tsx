import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import {
  useGetDoctorsQuery,
  useGetTimetableQuery,
} from '@/api/services/lpus-controller/lpus-controller.ts';

import { Flex, Line } from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { HorizontalSlider } from '@/components/HorizontalSlider.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';
import { STEPS_CONFIG } from '@/components/Booking/PersonalBooking/steps-config.tsx';
import { RadioBtnCard } from '@/components/ui/RadioBtnCard/RadioBtnCard.tsx';
import { IDoctor } from '@/api/services/lpus-controller/lpus-controller.types.ts';

interface WithAvailability {
  $isAvailable: boolean;
}
// Карточка дня
export const DayCard = styled(Flex).attrs({
  $direction: 'column',
  $justifyContent: 'flex-start',
  $gap: 16,
})`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.grey3};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.grey1};
  transition: all 0.2s ease;
  height: 140px;
  box-sizing: border-box;
`;

// Текст с состоянием доступности
export const AvailabilityText = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  color: ${props => props.theme.colors.black};
`;

// Статус доступности
export const AvailabilityStatus = styled.div<WithAvailability>`
  padding: 2px 12px;
  border-radius: 4px;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  background: ${props =>
    props.$isAvailable ? props.theme.colors.greenLight : props.theme.colors.redLight};
  color: ${props => (props.$isAvailable ? props.theme.colors.green : props.theme.colors.red)};
  border: 1px solid
    ${props => (props.$isAvailable ? props.theme.colors.green : props.theme.colors.red)};
  text-align: center;
`;

const NoSlotsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.grey2};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ScheduleContainer = styled.div`
  width: 100%;
  height: 124px;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('ru-RU', { month: 'short' });
  const weekday = date.toLocaleDateString('ru-RU', { weekday: 'short' });
  return `${day} ${month}, ${weekday}`;
};

const getTimeRange = (start: string, end: string): string => {
  if (start === end) return 'Выходной';

  const startTime = new Date(start);
  const endTime = new Date(end);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return `${formatTime(startTime)}-${formatTime(endTime)}`;
};

export const Step3: React.FC = () => {
  const { register, watch, setValue } = useFormContext();
  const stepFields = STEPS_CONFIG[2].fields;
  const [doctor] = stepFields;
  const selectedDoctor = watch('doctor');
  const selectedLpu = watch('lpu');
  const selectedSpeciality = watch('specialty');

  const {
    data: doctors = [],
    error,
    isLoading,
  } = useGetDoctorsQuery(
    { lpuId: selectedLpu?.id, specialityId: selectedSpeciality?.id },
    { skip: !selectedSpeciality?.id || !selectedLpu?.id },
  );
  const {
    data: timeData = [],
    isLoading: isLoadingSchedule,
    error: scheduleError,
  } = useGetTimetableQuery(
    { lpuId: selectedLpu, doctorId: selectedDoctor },
    { skip: !selectedDoctor },
  );

  const handleDoctorSelect = async (currentDoctor: IDoctor) => {
    setValue(doctor, currentDoctor, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  if (isLoading) {
    return <AppSpin />;
  }

  if (error) {
    return <ErrorMessage>Ошибка загрузки данных врачей</ErrorMessage>;
  }
  console.log('selectedDoctor', selectedDoctor);

  return (
    <Flex
      $direction={'column'}
      $align={'flex-start'}
      $justifyContent={'flex-start'}
      $gap={16}
      style={{ width: '100%' }}
    >
      {doctors?.map(doctor => {
        const isSelected = selectedDoctor?.id === doctor.id;

        return (
          <Flex
            key={doctor.id}
            $direction={'column'}
            $align={'flex-start'}
            style={{ width: '100%' }}
            $gap={16}
          >
            <RadioBtnCard
              id={doctor.id}
              name={doctor.name}
              availableTop={{ label: 'Записей', value: doctor.freeParticipantCount }}
              availableBottom={{ label: 'Талонов', value: doctor.freeTicketCount }}
              onClick={() => handleDoctorSelect(doctor)}
              checked={isSelected}
              register={register('doctor', { required: 'Выберите врача' })}
            />

            {/* Расписание врача */}
            {isSelected && (
              <ScheduleContainer>
                {isLoadingSchedule ? (
                  <AppSpin />
                ) : timeData.length === 0 || scheduleError ? (
                  <NoSlotsMessage>Расписание врача временно недоступно</NoSlotsMessage>
                ) : (
                  <HorizontalSlider gap={8} showNavigation={timeData.length > 2} showDots={false}>
                    {timeData.map((day, index) => (
                      <DayCard key={index}>
                        <AvailabilityText>{formatDate(day.visitStart)}</AvailabilityText>

                        <AvailabilityText>
                          {getTimeRange(day.visitStart, day.visitEnd)}
                        </AvailabilityText>

                        <AvailabilityStatus $isAvailable={day.recordableDay}>
                          {day.recordableDay ? 'Доступно' : 'Недоступно'}
                        </AvailabilityStatus>
                      </DayCard>
                    ))}
                  </HorizontalSlider>
                )}
              </ScheduleContainer>
            )}

            <Line $marginBottom={0} $marginTop={0} />
          </Flex>
        );
      })}
    </Flex>
  );
};
