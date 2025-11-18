import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import {
  Card,
  ErrorMessage,
  HeaderRow,
  Section,
  SpecialtyContent,
  SpecialtyName,
  SpecialtyStats,
} from '@/components/ui/StyledComponents.tsx';
import { RadioInput } from '@/components/RadioInput.tsx';
import { Accordion } from '@/components/ui/Accordion/Accordion.tsx';

import {
  useGetDoctorsQuery,
  useLazyGetTimetableQuery,
} from '@/api/services/lpus-controller/lpus-controller.ts';

import { HorizontalSlider } from '@/components/HorizontalSlider.tsx';
import { ITimeTable } from '@/api/services/lpus-controller/lpus-controller.types.ts';
import { AppSpin } from '@/components/ui/AppSpin.tsx';

const DoctorCard = styled(Card)`
  padding: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: flex-start;
`;

const StatItem = styled.div<{ $type?: 'participant' | 'ticket' }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => {
    switch (props.$type) {
      case 'participant':
        return props.theme.colors.green;
      case 'ticket':
        return props.theme.colors.red;
      default:
        return props.theme.colors.black;
    }
  }};
`;

const StatValue = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.black};
`;

const DayCard = styled.div<{ $isAvailable: boolean; $isSelected?: boolean }>`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid
    ${props => {
      if (props.$isSelected) return props.theme.colors.black;
      return props.$isAvailable ? props.theme.colors.black : props.theme.colors.black;
    }};
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => {
    if (props.$isSelected) return props.theme.colors.black + '10';
    return props.$isAvailable
      ? props.theme.colors.mainBackgroundColor
      : props.theme.colors.mainBackgroundColor;
  }};
  cursor: ${props => (props.$isAvailable ? 'pointer' : 'not-allowed')};
  transition: all 0.2s ease;
  height: 100%;
`;

const DayDate = styled.div<{ $isAvailable: boolean }>`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => (props.$isAvailable ? props.theme.colors.black : props.theme.colors.black)};
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-bottom: ${props => props.theme.spacing.xs};
  text-align: center;
`;

const DayStatus = styled.div<{ $isAvailable: boolean }>`
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props =>
    props.$isAvailable ? props.theme.colors.green + '20' : props.theme.colors.red + '20'};
  color: ${props => (props.$isAvailable ? props.theme.colors.green : props.theme.colors.red)};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const DayTime = styled.div<{ $isAvailable: boolean }>`
  font-size: 11px;
  color: ${props => (props.$isAvailable ? props.theme.colors.black : props.theme.colors.black)};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const DayReason = styled.div<{ $isAvailable: boolean }>`
  font-size: 10px;
  color: ${props => (props.$isAvailable ? props.theme.colors.black : props.theme.colors.black)};
  text-align: center;
  line-height: 1.2;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

// Новые стили для записей
const AppointmentsSection = styled.div`
  margin-top: ${props => props.theme.spacing.xs};
  padding-top: ${props => props.theme.spacing.xs};
  border-top: 1px solid ${props => props.theme.colors.black};
`;

const AppointmentsTitle = styled.div`
  font-size: 9px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.black};
  text-align: center;
  margin-bottom: 4px;
`;

const AppointmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 60px;
  overflow-y: auto;

  /* Тонкий скроллбар для списка записей */
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.black};
    border-radius: 1px;
  }
`;

const AppointmentItem = styled.div<{ $isAvailable?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 4px;
  border-radius: 4px;
  background: ${props =>
    props.$isAvailable ? props.theme.colors.green + '10' : props.theme.colors.mainBackground};
  font-size: 8px;
  line-height: 1;
`;

const AppointmentTime = styled.span<{ $isAvailable?: boolean }>`
  color: ${props => (props.$isAvailable ? props.theme.colors.green : props.theme.colors.black)};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const AppointmentRoom = styled.span`
  color: ${props => props.theme.colors.black};
  font-size: 7px;
`;

const NoSlotsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ScheduleLoading = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ValidationError = styled.div`
  color: ${props => props.theme.colors.red};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.red}10;
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.red}20;
  text-align: center;
`;

// Тип для хранения расписания врачей
interface IDoctorSchedule {
  [doctorId: string]: ITimeTable[];
}

// Форматирование даты
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('ru-RU', { month: 'short' });
  const weekday = date.toLocaleDateString('ru-RU', { weekday: 'short' });
  return `${day} ${month}, ${weekday}`;
};

// Получение временного интервала
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

  const selectedDoctor = watch('doctor');

  const { data: doctors, error, isLoading } = useGetDoctorsQuery({ lpuId: '', specialityId: '' });
  const [getTimeData] = useLazyGetTimetableQuery();

  const [expandedDoctors, setExpandedDoctors] = useState<Set<string>>(new Set());
  const [doctorSchedules, setDoctorSchedules] = useState<IDoctorSchedule>({});
  const [loadingSchedules, setLoadingSchedules] = useState<Set<string>>(new Set());

  // Функция для загрузки расписания врача
  const loadDoctorSchedule = async (doctorId: string) => {
    if (doctorSchedules[doctorId]) return;

    setLoadingSchedules(prev => new Set(prev).add(doctorId));

    try {
      const scheduleData = await getTimeData({
        lpuId: '',
        doctorId: doctorId,
      }).unwrap();

      setDoctorSchedules(prev => ({
        ...prev,
        [doctorId]: scheduleData,
      }));
    } catch (error) {
      console.error(`Ошибка загрузки расписания для врача ${doctorId}:`, error);
    } finally {
      setLoadingSchedules(prev => {
        const newSet = new Set(prev);
        newSet.delete(doctorId);
        return newSet;
      });
    }
  };

  const toggleDoctor = async (doctorId: string, isExpanded: boolean) => {
    const newExpanded = new Set(expandedDoctors);

    if (isExpanded) {
      newExpanded.add(doctorId);
      await loadDoctorSchedule(doctorId);
      setValue('doctor', doctorId, { shouldValidate: true });
    } else {
      newExpanded.delete(doctorId);
      setValue('date', '', { shouldValidate: true });
    }

    setExpandedDoctors(newExpanded);
  };

  if (isLoading) {
    return <AppSpin />;
  }

  if (error) {
    return <ErrorMessage>Ошибка загрузки данных врачей</ErrorMessage>;
  }

  const accordionItems =
    doctors?.map(doctor => {
      const isExpanded = expandedDoctors.has(doctor.id);
      const isSelected = selectedDoctor === doctor.id;
      const isLoadingSchedule = loadingSchedules.has(doctor.id);
      const schedule = doctorSchedules[doctor.id] || [];

      return {
        key: doctor.id,
        header: (
          <DoctorCard $isSelected={isSelected}>
            <RadioInput
              value={doctor.id}
              register={register('doctor', { required: 'Выберите врача' })}
              checked={isSelected}
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
          </DoctorCard>
        ),
        children:
          isExpanded &&
          (isLoadingSchedule ? (
            <ScheduleLoading>Загрузка расписания...</ScheduleLoading>
          ) : schedule.length === 0 ? (
            <NoSlotsMessage>Расписание врача временно недоступно</NoSlotsMessage>
          ) : (
            <HorizontalSlider
              slideWidth={140}
              gap={8}
              showNavigation={schedule.length > 2}
              showDots={schedule.length > 3}
            >
              {schedule.map((day, index) => (
                <DayCard
                  key={index}
                  $isAvailable={day.recordableDay}
                  // $isSelected={isDaySelected(doctor.id, day)}
                  // onClick={() => handleDaySelect(doctor.id, day)}
                >
                  <DayDate $isAvailable={day.recordableDay}>{formatDate(day.visitStart)}</DayDate>
                  <DayStatus $isAvailable={day.recordableDay}>
                    {day.recordableDay ? '✓' : '✗'}
                  </DayStatus>
                  <DayTime $isAvailable={day.recordableDay}>
                    {getTimeRange(day.visitStart, day.visitEnd)}
                  </DayTime>
                  <DayReason $isAvailable={day.recordableDay}>{day.denyCause}</DayReason>

                  {/* Блок с записями */}
                  {day.appointments.length > 0 && (
                    <AppointmentsSection>
                      <AppointmentsTitle>Доступные записи:</AppointmentsTitle>
                      <AppointmentList>
                        {day.appointments.map(appointment => (
                          <AppointmentItem key={appointment.id}>
                            <AppointmentTime>
                              {formatAppointmentTime(appointment.visitStart, appointment.visitEnd)}
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
          )),
      };
    }) || [];
  return (
    <Section>
      <Accordion items={accordionItems} allowMultiple={false} onItemToggle={toggleDoctor} />

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
