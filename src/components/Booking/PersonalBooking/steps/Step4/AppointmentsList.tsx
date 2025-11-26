import { FC } from 'react';
import moment from 'moment/moment';
import styled from 'styled-components';

import { Flex, Line } from '@/components/ui/StyledComponents.tsx';
import { IAppointment } from '@/api/services/lpus-controller/lpus-controller.types.ts';

const StyledAppointmentsList = styled(Flex).attrs({ $direction: 'column' })`
  width: 100%;
  gap: ${props => props.theme.spacing.sm};
`;

const AppointmentsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
  gap: 8px;
  width: 100%;
`;

const AppointmentRoom = styled(Flex)<{
  $isSelected: boolean;
}>`
  max-width: 100px;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  outline: 1px solid ${props => (props.$isSelected ? '#BADCF4' : props.theme.colors.grey3)};
  background: ${props => (props.$isSelected ? '#E3F1FA' : props.theme.colors.white)};
  padding: ${props => `${props.theme.spacing.xs} ${props.theme.spacing.md}`};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
`;

const Date = styled.h4`
  margin: 0;
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

// Вспомогательные функции с использованием moment
const formatTime = (dateString: string): string => {
  return moment(dateString).format('HH:mm');
};

const formatAppointmentTime = (start: string): string => {
  return `${formatTime(start)}`;
};

interface AppointmentsListProps {
  appointmentsByDate: Record<string, IAppointment[]>;
  onChange: (appointment: IAppointment) => void;
  selectedAppointment: IAppointment;
}

export const AppointmentsList: FC<AppointmentsListProps> = ({
  appointmentsByDate,
  onChange,
  selectedAppointment,
}) => {
  return (
    <StyledAppointmentsList>
      {Object.entries(appointmentsByDate).map(([date, appointments]) => (
        <Flex
          key={date}
          $direction={'column'}
          $justifyContent={'flex-start'}
          $align={'flex-start'}
          style={{ width: '100%' }}
          $gap={16}
        >
          <Date>{date}</Date>
          <AppointmentsContainer>
            {appointments.map(appointment => (
              <AppointmentRoom
                $isSelected={selectedAppointment?.id === appointment.id}
                key={appointment.id}
                onClick={() => onChange(appointment)}
              >
                {formatAppointmentTime(appointment.visitStart)}
              </AppointmentRoom>
            ))}
          </AppointmentsContainer>
          <Line $marginBottom={0} $marginTop={0} />
        </Flex>
      ))}
    </StyledAppointmentsList>
  );
};
