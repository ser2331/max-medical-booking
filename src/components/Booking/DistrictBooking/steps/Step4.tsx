import React, { useState, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ErrorMessage, LoadingSpinner } from '@/components/ui/StyledComponents.tsx';
import { Section } from '@/components/ui/CommonComponents.tsx';
import { useGetAppointmentsQuery } from '@/api/services/lpus-controller/lpus-controller.ts';
import { IAppointment } from '@/api/services/lpus-controller/lpus-controller.types.ts';
import { Calendar } from '@/components/Calendar.tsx';

const AppointmentsTitle = styled.h4`
  margin: 0;
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

const AppointmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const AppointmentCard = styled.button<{ $isSelected?: boolean }>`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid
    ${props => (props.$isSelected ? props.theme.colors.primary : props.theme.colors.border.primary)};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props =>
    props.$isSelected ? props.theme.colors.primary + '10' : props.theme.colors.background.card};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: ${props =>
      props.$isSelected ? props.theme.colors.primary : props.theme.colors.border.accent};
  }
`;

const AppointmentTime = styled.div`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const AppointmentDetails = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
`;

const AppointmentRoom = styled.span`
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const NoAppointmentsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.medium};
`;

const ValidationError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.error}10;
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.error}20;
  text-align: center;
`;

// Вспомогательные функции
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatAppointmentTime = (start: string, end: string): string => {
  return `${formatTime(start)} - ${formatTime(end)}`;
};

export const Step4: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedDoctor = watch('doctor');
  const selectedDate = watch('date');
  const selectedAppointment = watch('appointment');

  // Получаем данные о записях
  const {
    data: appointments,
    error,
    isLoading,
  } = useGetAppointmentsQuery(
    {
      lpuId: '1', // Замени на актуальный lpuId из формы
      doctorId: selectedDoctor, // Используем выбранного врача
    },
    {
      skip: !selectedDoctor, // Запрос выполняется только когда выбран врач
    },
  );

  const [currentDate, setCurrentDate] = useState(new Date());

  // Группируем записи по датам и получаем доступные даты
  const { appointmentsByDate, availableDates } = useMemo(() => {
    if (!appointments) return { appointmentsByDate: {}, availableDates: new Set<string>() };

    const byDate: Record<string, IAppointment[]> = {};
    const dates = new Set<string>();

    appointments.forEach(appointment => {
      const date = appointment.visitStart.split('T')[0];
      if (!byDate[date]) {
        byDate[date] = [];
      }
      byDate[date].push(appointment);
      dates.add(date);
    });

    return { appointmentsByDate: byDate, availableDates: dates };
  }, [appointments]);

  // Получаем записи для выбранной даты
  const selectedDateAppointments = useMemo(() => {
    if (!selectedDate || !appointmentsByDate[selectedDate]) return [];
    return appointmentsByDate[selectedDate].sort(
      (a, b) => new Date(a.visitStart).getTime() - new Date(b.visitStart).getTime(),
    );
  }, [selectedDate, appointmentsByDate]);

  const handleDateSelect = (date: string) => {
    console.log('handleDateSelect date', date);

    setValue('date', date, { shouldValidate: true });
    setValue('appointment', '', { shouldValidate: true }); // Сбрасываем выбранную запись
  };

  const handleAppointmentSelect = (appointmentId: string) => {
    setValue('appointment', appointmentId, { shouldValidate: true });
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage>Ошибка загрузки доступных записей</ErrorMessage>;
  }

  console.log('selectedDate', selectedDate);
  console.log('availableDates', availableDates);
  return (
    <Section>
      <Section>
        <Calendar
          currentDate={currentDate}
          availableDates={availableDates}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
        />
      </Section>

      <Section>
        <AppointmentsTitle>
          {selectedDate
            ? `Доступные записи на ${new Date(selectedDate).toLocaleDateString('ru-RU')}`
            : 'Выберите дату'}
        </AppointmentsTitle>

        {!selectedDate ? (
          <NoAppointmentsMessage>
            Пожалуйста, выберите дату для просмотра доступных записей
          </NoAppointmentsMessage>
        ) : selectedDateAppointments.length === 0 ? (
          <NoAppointmentsMessage>На выбранную дату нет доступных записей</NoAppointmentsMessage>
        ) : (
          <AppointmentsList>
            {selectedDateAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                type="button"
                $isSelected={selectedAppointment === appointment.id}
                onClick={() => handleAppointmentSelect(appointment.id)}
              >
                <AppointmentTime>
                  {formatAppointmentTime(appointment.visitStart, appointment.visitEnd)}
                </AppointmentTime>
                <AppointmentDetails>
                  {appointment.room && (
                    <span>
                      Кабинет: <AppointmentRoom>{appointment.room}</AppointmentRoom>
                    </span>
                  )}
                  {appointment.number && <span>Номер: {appointment.number}</span>}
                </AppointmentDetails>
              </AppointmentCard>
            ))}
          </AppointmentsList>
        )}
      </Section>

      {/* Скрытые поля для формы */}
      <input type="hidden" {...register('date', { required: 'Выберите дату' })} />
      <input type="hidden" {...register('appointment', { required: 'Выберите время записи' })} />

      {(errors.date || errors.appointment) && (
        <ValidationError>
          {(errors.date?.message as string) ||
            (errors.appointment?.message as string) ||
            'Выберите дату и время записи'}
        </ValidationError>
      )}
    </Section>
  );
};
