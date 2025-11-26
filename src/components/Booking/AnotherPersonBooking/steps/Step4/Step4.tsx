import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import moment from 'moment';

import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';

import { useGetAppointmentsQuery } from '@/api/services/lpus-controller/lpus-controller.ts';
import { IAppointment } from '@/api/services/lpus-controller/lpus-controller.types.ts';

import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { Section } from '@/components/ui/StyledComponents.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';
import { STEPS_CONFIG } from '@/components/Booking/AnotherPersonBooking/steps-config.tsx';
import { AppointmentsList } from '@/components/Booking/AnotherPersonBooking/steps/Step4/AppointmentsList.tsx';
import { CustomDateInput } from '@/components/ui/CustomDateInput/CustomDateInput.tsx';

const FORMAT = 'DD.MM.YYYY';
const NoAppointmentsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
  background: ${props => props.theme.colors.mainBackgroundColor};
  border-radius: ${props => props.theme.borderRadius.medium};
`;

export const Step4: React.FC = () => {
  const { hapticFeedback } = useMaxBridgeContext();
  const { register, watch, setValue } = useFormContext();
  const stepFields = STEPS_CONFIG[3].fields;
  const [appointment] = stepFields;

  const selectedLpu = watch('lpu');
  const selectedDoctor = watch('doctor');
  const selectedDate = watch('date');
  const selectedAppointment = watch('appointment');

  // Получаем данные о записях
  const {
    data: appointments = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetAppointmentsQuery(
    {
      lpuId: selectedLpu?.id,
      doctorId: selectedDoctor?.id,
    },
    {
      skip: !selectedDoctor?.id || !selectedLpu?.id,
    },
  );

  // Группируем записи по датам и получаем доступные даты
  const { appointmentsByDate, availableDates } = useMemo(() => {
    if (!appointments) return { appointmentsByDate: {}, availableDates: new Set<string>() };

    const byDate: Record<string, IAppointment[]> = {};
    const dates = new Set<string>();

    appointments.forEach(appointment => {
      const date = moment(appointment.visitStart).format(FORMAT);
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
    if (!selectedDate || !appointmentsByDate[selectedDate]) return appointmentsByDate;
    return {
      [selectedDate]: appointmentsByDate[selectedDate].sort(
        (a, b) => moment(a.visitStart).valueOf() - moment(b.visitStart).valueOf(),
      ),
    };
  }, [selectedDate, appointmentsByDate]);

  const handleDateSelect = (date: string) => {
    setValue(appointment, null, { shouldValidate: true });
    setValue('date', date, { shouldValidate: false });
  };

  const handleAppointmentSelect = (appointment: IAppointment) => {
    hapticFeedback('impact', 'light').then(() => {
      setValue('appointment', appointment, { shouldValidate: true });
    });
  };

  if (isLoading || isFetching) {
    return <AppSpin />;
  }

  if (error) {
    return (
      <ErrorMessage onTryAgain={() => refetch()}>Ошибка загрузки доступных записей</ErrorMessage>
    );
  }

  return (
    <Section>
      <CustomDateInput
        onChange={handleDateSelect}
        availableDates={Array.from(availableDates)}
        value={selectedDate || ''}
        outputFormat={FORMAT}
        inputFormat={FORMAT}
      />

      <Section style={{ width: '100%' }}>
        {selectedDateAppointments?.[selectedDate]?.length === 0 ? (
          <NoAppointmentsMessage>На выбранную дату нет доступных записей</NoAppointmentsMessage>
        ) : (
          <AppointmentsList
            appointmentsByDate={selectedDateAppointments}
            onChange={handleAppointmentSelect}
            selectedAppointment={selectedAppointment}
          />
        )}
      </Section>

      {/* Скрытые поля для формы */}
      <input type="hidden" {...register('appointment', { required: 'Выберите время записи' })} />
    </Section>
  );
};
