import { Modal } from '@/components/Modal.tsx';
import { FC } from 'react';

import { CustomButton } from '@/components/ui/Button/Button.tsx';
import styled from 'styled-components';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { AppointmentFormData } from '@/components/Booking/PersonalBooking/steps-config.tsx';
import moment from 'moment';

const Title = styled.div`
  width: 100%;
  text-align: left;
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  line-height: ${props => props.theme.typography.fontSize.xxl};
`;
const Description = styled(Title)`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
`;
const DataInfo = styled(Title)`
  font-size: ${props => props.theme.typography.fontSize.md};
`;
interface IProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: AppointmentFormData | null;
}
export const RecordingConfirmationModal: FC<IProps> = ({ open, onClose, onConfirm, formData }) => {
  const formatAppointmentDate = (dateStartString: string, dateEndString: string) => {
    const date = moment(dateStartString);
    const endDate = moment(dateEndString);
    const startTime = date.format('HH:mm');
    const endTime = endDate.format('HH:mm');
    return `${date.format('D MMMM YYYY')} ${startTime}-${endTime}`;
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      footer={
        <>
          <CustomButton onClick={onClose}>Отменить</CustomButton>
          <CustomButton variant={'primary'} onClick={onConfirm}>
            Подтвердить
          </CustomButton>
        </>
      }
    >
      <Flex $direction={'column'} $gap={16} style={{ width: '100%' }} $align={'flex-start'}>
        <Title>Подтверждение записи</Title>
        <Flex $direction={'column'} $gap={8} $align={'flex-start'} style={{ width: '100%' }}>
          <Description>Пожалуйста, подтвердите запись:</Description>
          <DataInfo>
            {formData?.appointment?.visitStart
              ? formatAppointmentDate(
                  formData.appointment.visitStart,
                  formData.appointment.visitEnd,
                )
              : 'Дата не указана'}
          </DataInfo>
          <DataInfo>{`${formData?.specialty?.name}, ${formData?.doctor?.name}`}</DataInfo>
        </Flex>
      </Flex>
    </Modal>
  );
};
