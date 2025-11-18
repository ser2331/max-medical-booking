import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import moment from 'moment';
import { ErrorMessage, Flex, Section } from '@/components/ui/StyledComponents.tsx';
import { useGetAppointmentsQuery } from '@/api/services/lpus-controller/lpus-controller.ts';
import { IAppointment } from '@/api/services/lpus-controller/lpus-controller.types.ts';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { CustomDatePicker } from '@/components/ui/DateTimePicker/DateTimePicker.tsx';
import { STEPS_CONFIG } from '@/components/Booking/DistrictBooking/steps-config.tsx';

const AppointmentsTitle = styled.h4`
  margin: 0;
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

const AppointmentsList = styled(Flex).attrs({ $direction: 'column' })`
  width: 100%;
  gap: ${props => props.theme.spacing.sm};
`;

const AppointmentCard = styled.button<{ $isSelected?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: ${props =>
    props.$isSelected ? `1px solid ${props.theme.colors.blueHighlight}` : 'none'};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props =>
    props.$isSelected ? props.theme.colors.blueLight : props.theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
`;

const AppointmentTime = styled.div`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const AppointmentDetails = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const AppointmentRoom = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const NoAppointmentsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
  background: ${props => props.theme.colors.mainBackgroundColor};
  border-radius: ${props => props.theme.borderRadius.medium};
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

// Вспомогательные функции с использованием moment
const formatTime = (dateString: string): string => {
  return moment(dateString).format('HH:mm');
};

const formatAppointmentTime = (start: string, end: string): string => {
  return `${formatTime(start)} - ${formatTime(end)}`;
};

const formatDateToDisplay = (dateString: string): string => {
  return moment(dateString).format('DD.MM.YYYY');
};

export const Step4: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const stepFields = STEPS_CONFIG[3].fields;
  const [appointment, date] = stepFields;

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
      lpuId: '1',
      doctorId: selectedDoctor,
    },
    {
      skip: !selectedDoctor,
    },
  );

  // Группируем записи по датам и получаем доступные даты
  const { appointmentsByDate, availableDates } = useMemo(() => {
    if (!appointments) return { appointmentsByDate: {}, availableDates: new Set<string>() };

    const byDate: Record<string, IAppointment[]> = {};
    const dates = new Set<string>();

    appointments.forEach(appointment => {
      const date = moment(appointment.visitStart).format('YYYY-MM-DD');
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
      (a, b) => moment(a.visitStart).valueOf() - moment(b.visitStart).valueOf(),
    );
  }, [selectedDate, appointmentsByDate]);

  const handleDateSelect = (_date: Date | string | null) => {
    const formattedDate = moment(_date).format('YYYY-MM-DD') as string;
    setValue(appointment, '', { shouldValidate: true });
    setValue(date, formattedDate, { shouldValidate: true });
  };

  const handleAppointmentSelect = (appointmentId: string) => {
    setValue('appointment', appointmentId, { shouldValidate: true });
  };

  if (isLoading) {
    return <AppSpin />;
  }

  if (error) {
    return <ErrorMessage>Ошибка загрузки доступных записей</ErrorMessage>;
  }

  return (
    <Section>
      <Section>
        <CustomDatePicker
          availableDates={Array.from(availableDates)}
          onChange={handleDateSelect}
          value={selectedDate ? moment(selectedDate).toDate() : null}
          outputFormat="YYYY-MM-DD"
        />
      </Section>

      <Section style={{ width: '100%' }}>
        <AppointmentsTitle>
          {selectedDate
            ? `Доступные записи на ${formatDateToDisplay(selectedDate)}`
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
