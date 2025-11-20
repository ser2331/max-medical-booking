import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import {
  useGetDoctorsQuery,
  useGetTimetableQuery,
} from '@/api/services/lpus-controller/lpus-controller.ts';

import {
  CheckCardDescription,
  Flex,
  Line,
  SpecialtyName,
  StatValue,
} from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { RadioButton } from '@/components/ui/RadioButton/RadioButton.tsx';
import { HorizontalSlider } from '@/components/HorizontalSlider.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';
import { STEPS_CONFIG } from '@/components/DoctorAppointmentMake/DistrictBooking/steps-config.tsx';

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
  font-size: 10px;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  background: ${props =>
    props.$isAvailable ? props.theme.colors.greenLight : props.theme.colors.redLight};
  color: ${props => (props.$isAvailable ? props.theme.colors.green : props.theme.colors.red)};
  border: 1px solid
    ${props => (props.$isAvailable ? props.theme.colors.green : props.theme.colors.red)};
  text-align: center;
`;

// Секция с записями
// export const AppointmentsSection = styled.div`
//   margin-top: ${props => props.theme.spacing.xs};
//   padding-top: ${props => props.theme.spacing.xs};
//   border-top: 1px solid ${props => props.theme.colors.grey1};
//   width: 100%;
// `;
//
// export const AppointmentsTitle = styled.div`
//   font-size: 9px;
//   font-weight: ${props => props.theme.typography.fontWeight.medium};
//   color: ${props => props.theme.colors.grey2};
//   text-align: center;
//   margin-bottom: 4px;
// `;
//
// export const AppointmentList = styled(Flex).attrs({
//   $direction: 'column',
// })`
//   gap: 2px;
//   height: 60px;
//   overflow-y: auto;
// `;
//
// export const AppointmentItem = styled(Flex).attrs({
//   $justifyContent: 'space-between',
// })`
//   padding: 2px 4px;
//   border-radius: 4px;
//   background: ${props => props.theme.colors.greenLight};
//   font-size: 8px;
//   line-height: 1;
//   width: 100%;
// `;
//
// export const AppointmentTime = styled.span`
//   color: ${props => props.theme.colors.green};
//   font-weight: ${props => props.theme.typography.fontWeight.medium};
// `;
//
// export const AppointmentRoom = styled.span`
//   color: ${props => props.theme.colors.grey2};
//   font-size: 7px;
// `;

// Локальные стили только для этого компонента
const NoSlotsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.grey2};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ScheduleContainer = styled.div`
  width: 100%;
  height: 124px;
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

// const getFormatedTime = (time: string) => {
//   const dateTime = new Date(time);
//   return `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`;
// };

// const formatAppointmentTime = (start: string, end: string): string => {
//   return `${getFormatedTime(start)} - ${getFormatedTime(end)}`;
// };

export const Step3: React.FC = () => {
  const { register, watch, setValue } = useFormContext();
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
    <Flex
      $direction={'column'}
      $align={'flex-start'}
      $justifyContent={'flex-start'}
      $gap={16}
      style={{ width: '100%' }}
    >
      {doctors?.map(doctor => {
        const isSelected = selectedDoctor === doctor.id;

        return (
          <Flex
            key={doctor.id}
            $direction={'column'}
            $align={'flex-start'}
            style={{ width: '100%' }}
            $gap={16}
          >
            <Flex
              key={doctor.id}
              onClick={() => handleDoctorSelect(doctor.id)}
              $direction={'row'}
              $align={'center'}
              $justifyContent={'flex-start'}
              $gap={12}
              style={{ width: '100%' }}
            >
              <RadioButton
                value={doctor.id}
                register={register('doctor', { required: 'Выберите врача' })}
                checked={isSelected}
                onChange={() => handleDoctorSelect(doctor.id)}
              />
              <Flex
                $direction={'column'}
                style={{ width: '100%', flex: 1 }}
                $align={'flex-start'}
                $gap={4}
              >
                <SpecialtyName>{doctor.name}</SpecialtyName>

                <Flex
                  $direction={'column'}
                  $align={'flex-start'}
                  $justifyContent={'flex-start'}
                  style={{ width: '100%' }}
                >
                  <CheckCardDescription>
                    <span>Доступно врачей:</span>
                    <StatValue $available={!!doctor.freeParticipantCount}>
                      {' '}
                      {doctor.freeParticipantCount}
                    </StatValue>
                  </CheckCardDescription>
                  <CheckCardDescription>
                    <span>Свободных талонов:</span>
                    <StatValue $available={!!doctor.freeTicketCount}>
                      {' '}
                      {doctor.freeTicketCount}
                    </StatValue>
                  </CheckCardDescription>
                </Flex>
              </Flex>
            </Flex>

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
                        {/*{day.denyCause && (*/}
                        {/*  <AvailabilityText $isAvailable={day.recordableDay}>*/}
                        {/*    {day.denyCause}*/}
                        {/*  </AvailabilityText>*/}
                        {/*)}*/}

                        {/* Блок с записями */}
                        {/*{day.recordableDay && day.appointments.length > 0 && (*/}
                        {/*  <AppointmentsSection>*/}
                        {/*    <AppointmentsTitle>Доступные записи:</AppointmentsTitle>*/}
                        {/*    <AppointmentList>*/}
                        {/*      {day.appointments.map(appointment => (*/}
                        {/*        <AppointmentItem key={appointment.id}>*/}
                        {/*          <AppointmentTime>*/}
                        {/*            {formatAppointmentTime(*/}
                        {/*              appointment.visitStart,*/}
                        {/*              appointment.visitEnd,*/}
                        {/*            )}*/}
                        {/*          </AppointmentTime>*/}
                        {/*          {appointment.room && (*/}
                        {/*            <AppointmentRoom>каб. {appointment.room}</AppointmentRoom>*/}
                        {/*          )}*/}
                        {/*        </AppointmentItem>*/}
                        {/*      ))}*/}
                        {/*    </AppointmentList>*/}
                        {/*  </AppointmentsSection>*/}
                        {/*)}*/}
                      </DayCard>
                    ))}
                  </HorizontalSlider>
                )}
              </ScheduleContainer>
            )}

            <Line marginBottom={0} />
          </Flex>
        );
      })}
    </Flex>
  );
};
