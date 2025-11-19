import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import {
  useGetDoctorsQuery,
  useGetTimetableQuery,
} from '@/api/services/lpus-controller/lpus-controller.ts';

import {
  ErrorMessage,
  Flex,
  HeaderRow,
  Section,
  SpecialtyContent,
  SpecialtyName,
  SpecialtyStats,
  StatItem,
  StatValue,
  ValidationError,
} from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { Card } from '@/components/ui/Cart.tsx';
import { RadioButton } from '@/components/ui/RadioButton/RadioButton.tsx';
import { HorizontalSlider } from '@/components/HorizontalSlider.tsx';
import { STEPS_CONFIG } from '@/components/Booking/DistrictBooking/steps-config.tsx';

interface WithAvailability {
  $isAvailable: boolean;
}
// Карточка дня
export const DayCard = styled(Flex).attrs({
  $direction: 'column',
  $justifyContent: 'flex-start',
})<WithAvailability>`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.grey3};
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props =>
    props.$isAvailable ? props.theme.colors.white : props.theme.colors.grey1};
  cursor: ${props => (props.$isAvailable ? 'pointer' : 'not-allowed')};
  transition: all 0.2s ease;
  min-height: 120px;
  height: 100%;
  box-sizing: border-box;

  &:hover {
    ${props =>
      props.$isAvailable &&
      `
      border-color: ${props.theme.colors.blue};
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.small};
    `}
  }
`;

// Текст с состоянием доступности
export const AvailabilityText = styled.div<WithAvailability>`
  color: ${props => (props.$isAvailable ? props.theme.colors.black : props.theme.colors.grey3)};
  text-align: center;
`;

// Статус доступности
export const AvailabilityStatus = styled.div<WithAvailability>`
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props =>
    props.$isAvailable ? props.theme.colors.greenLight : props.theme.colors.redLight};
  color: ${props => (props.$isAvailable ? props.theme.colors.green : props.theme.colors.red)};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

// Секция с записями
export const AppointmentsSection = styled.div`
  margin-top: ${props => props.theme.spacing.xs};
  padding-top: ${props => props.theme.spacing.xs};
  border-top: 1px solid ${props => props.theme.colors.grey1};
  width: 100%;
`;

export const AppointmentsTitle = styled.div`
  font-size: 9px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.grey2};
  text-align: center;
  margin-bottom: 4px;
`;

export const AppointmentList = styled(Flex).attrs({
  $direction: 'column',
})`
  gap: 2px;
  height: 60px;
  overflow-y: auto;
`;

export const AppointmentItem = styled(Flex).attrs({
  $justifyContent: 'space-between',
})`
  padding: 2px 4px;
  border-radius: 4px;
  background: ${props => props.theme.colors.greenLight};
  font-size: 8px;
  line-height: 1;
  width: 100%;
`;

export const AppointmentTime = styled.span`
  color: ${props => props.theme.colors.green};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

export const AppointmentRoom = styled.span`
  color: ${props => props.theme.colors.grey2};
  font-size: 7px;
`;

// Локальные стили только для этого компонента
const NoSlotsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.grey2};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ScheduleContainer = styled.div`
  min-height: 100px;
  margin-top: ${props => props.theme.spacing.md};
`;

// Вспомогательные функции
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

const getFormatedTime = (time: string) => {
  const dateTime = new Date(time);
  return `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`;
};

const formatAppointmentTime = (start: string, end: string): string => {
  return `${getFormatedTime(start)} - ${getFormatedTime(end)}`;
};

export const Step3: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const stepFields = STEPS_CONFIG[2].fields;
  const [doctor] = stepFields;
  const selectedDoctor = watch('doctor');

  const { data: doctors, error, isLoading } = useGetDoctorsQuery({ lpuId: '', specialityId: '' });
  const {
    data: timeData = [],
    isLoading: isLoadingSchedule,
    error: scheduleError,
  } = useGetTimetableQuery({ lpuId: '', doctorId: selectedDoctor }, { skip: !selectedDoctor });

  const handleDoctorSelect = async (doctorId: string) => {
    setValue(doctor, doctorId, {
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

  return (
    <Section>
      {doctors?.map(doctor => {
        const isSelected = selectedDoctor === doctor.id;

        return (
          <Card
            style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
            key={doctor.id}
            onClick={() => handleDoctorSelect(doctor.id)}
          >
            <Flex $direction={'row'} $gap={16}>
              <RadioButton
                value={doctor.id}
                register={register('doctor', { required: 'Выберите врача' })}
                checked={isSelected}
                onChange={() => handleDoctorSelect(doctor.id)}
              />
              <SpecialtyContent>
                <HeaderRow>
                  <SpecialtyName>{doctor.name}</SpecialtyName>
                </HeaderRow>

                <SpecialtyStats>
                  <StatItem $type="participant">
                    <span>👥 Записей:</span>
                    <StatValue>{doctor.freeParticipantCount}</StatValue>
                  </StatItem>
                  <StatItem $type="ticket">
                    <span>🎫 Талонов:</span>
                    <StatValue>{doctor.freeTicketCount}</StatValue>
                  </StatItem>
                </SpecialtyStats>
              </SpecialtyContent>
            </Flex>

            {/* Расписание врача */}
            {isSelected && (
              <ScheduleContainer>
                {isLoadingSchedule ? (
                  <AppSpin />
                ) : timeData.length === 0 || scheduleError ? (
                  <NoSlotsMessage>Расписание врача временно недоступно</NoSlotsMessage>
                ) : (
                  <HorizontalSlider
                    gap={8}
                    showNavigation={timeData.length > 2}
                    showDots={timeData.length > 3}
                  >
                    {timeData.map((day, index) => (
                      <DayCard key={index} $isAvailable={day.recordableDay}>
                        <AvailabilityText $isAvailable={day.recordableDay}>
                          {formatDate(day.visitStart)}
                        </AvailabilityText>
                        <AvailabilityStatus $isAvailable={day.recordableDay}>
                          {day.recordableDay ? 'Доступно' : 'Недоступно'}
                        </AvailabilityStatus>
                        <AvailabilityText $isAvailable={day.recordableDay}>
                          {getTimeRange(day.visitStart, day.visitEnd)}
                        </AvailabilityText>
                        {day.denyCause && (
                          <AvailabilityText $isAvailable={day.recordableDay}>
                            {day.denyCause}
                          </AvailabilityText>
                        )}

                        {/* Блок с записями */}
                        {day.recordableDay && day.appointments.length > 0 && (
                          <AppointmentsSection>
                            <AppointmentsTitle>Доступные записи:</AppointmentsTitle>
                            <AppointmentList>
                              {day.appointments.map(appointment => (
                                <AppointmentItem key={appointment.id}>
                                  <AppointmentTime>
                                    {formatAppointmentTime(
                                      appointment.visitStart,
                                      appointment.visitEnd,
                                    )}
                                  </AppointmentTime>
                                  {appointment.room && (
                                    <AppointmentRoom>каб. {appointment.room}</AppointmentRoom>
                                  )}
                                </AppointmentItem>
                              ))}
                            </AppointmentList>
                          </AppointmentsSection>
                        )}
                      </DayCard>
                    ))}
                  </HorizontalSlider>
                )}
              </ScheduleContainer>
            )}
          </Card>
        );
      })}

      {(errors.doctor || errors.date) && (
        <ValidationError>
          {(errors.doctor?.message as string) ||
            (errors.date?.message as string) ||
            'Выберите врача и дату приема'}
        </ValidationError>
      )}
    </Section>
  );
};
