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
const DataLabel = styled(Title)`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.grey2};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
`;
const DataValue = styled(Title)`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
`;
interface IProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: AppointmentFormData | null;
}
export const RecordingConfirmationModal: FC<IProps> = ({ open, onClose, onConfirm, formData }) => {
  const formatAppointmentDate = (dateStartString?: string) => {
    if (!dateStartString) return '-';
    const date = moment(dateStartString);
    const startTime = date.format('HH:mm');
    return `${date.format('D MMMM YYYY')} в ${startTime}`;
  };

  const data = [
    { label: 'Пациент', value: formData?.firstName },
    { label: 'Медучреждение', value: formData?.lpu?.lpuFullName },
    { label: 'Врач', value: `${formData?.doctor?.name}, ${formData?.specialty?.name}` },
    {
      label: 'Дата и время записи',
      value: formatAppointmentDate(formData?.appointment?.visitStart),
    },
  ];

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      footer={
        <Flex $direction={'column'} $gap={8} style={{ width: '100%' }}>
          <CustomButton variant={'primary'} onClick={onConfirm}>
            Записаться
          </CustomButton>
          <CustomButton onClick={onClose}>Отменить</CustomButton>
        </Flex>
      }
    >
      <Flex $direction={'column'} $gap={16} style={{ width: '100%' }} $align={'flex-start'}>
        <Title>Пожалуйста, подтвердите запись</Title>
        <Flex $direction={'column'} $gap={8} $align={'flex-start'} style={{ width: '100%' }}>
          {data.map((d, index) => (
            <Flex
              key={index}
              $direction={'column'}
              $gap={8}
              $align={'flex-start'}
              style={{ width: '100%' }}
            >
              <DataLabel>{d.label || '-'}:</DataLabel>
              <DataValue>{d.value || '-'}</DataValue>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Modal>
  );
};
