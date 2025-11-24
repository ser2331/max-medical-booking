import { FC } from 'react';
import { AppointmentFormData } from '@/components/Booking/PersonalBooking/steps-config.tsx';
import { onChangeBookingType, onChangeStep } from '@/store/slices/stepperSlice.ts';
import { useAppDispatch } from '@/store/redux-hooks.ts';
import { useNavigate } from 'react-router-dom';
import {
  CheckCardDescription,
  ContactLink,
  Flex,
  Line,
  NavigationBtn,
  NavigationContainer,
  Section,
} from '@/components/ui/StyledComponents.tsx';
import { CheckBoxIcon } from '@/assets/icons/CheckBoxIcon.tsx';
import styled from 'styled-components';
import moment from 'moment/moment';
import { Card } from '@/components/ui/Cart.tsx';
import {
  formatPhoneForDisplay,
  formatPhoneForLink,
  handleEmailClick,
  handlePhoneClick,
} from '@/helpers/heplers.tsx';

const Title = styled.span`
  width: 100%;
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  line-height: ${props => props.theme.typography.fontSize.xxl};
  text-align: left;
`;
const IconWrapper = styled(Flex)`
  background: ${props => props.theme.colors.green};
  border-radius: 50%;
  min-width: ${props => props.theme.spacing.lg};
  width: ${props => props.theme.spacing.lg};
  height: ${props => props.theme.spacing.lg};
`;
const InfoWrapper = styled(Flex).attrs({ $gap: 16 })`
  background: ${props => props.theme.colors.grey4};
  border-radius: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  width: 100%;
  height: 100%;
  min-height: ${props => props.theme.spacing.xxxl};
`;
const Speciality = styled('span')``;
const Info = styled('span')`
  color: ${props => props.theme.colors.grey2};
`;

interface FinishCardProps {
  onFinish: () => void;
  finishData: AppointmentFormData;
}
const formatAppointmentDate = (dateStartString: string) => {
  const date = moment(dateStartString);
  const startTime = date.format('HH:mm');
  return `${date.format('D MMMM YYYY')} ${startTime}`;
};
export const FinishCard: FC<FinishCardProps> = ({ onFinish, finishData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const finish = () => {
    navigate('/');
    dispatch(onChangeStep(0));
    dispatch(onChangeBookingType(false));
    onFinish();
  };
  const onCancel = () => {};

  return (
    <Card $vertical className={'finish'} style={{ flex: 1 }}>
      <Section>
        <Flex $gap={12} style={{ width: '100%' }}>
          <IconWrapper>
            <CheckBoxIcon />
          </IconWrapper>
          <Title>Вы успешно записаны на прием к врачу</Title>
        </Flex>
        <InfoWrapper $direction={'column'}>
          <Flex
            style={{ width: '100%' }}
            $direction={'column'}
            $align={'flex-start'}
            $justifyContent={'flex-start'}
            $gap={4}
          >
            <Title style={{ marginBottom: '8px' }}>
              {finishData.appointment?.visitStart &&
                formatAppointmentDate(finishData.appointment?.visitStart)}
            </Title>
            <Info>Врач: </Info>
            <Title>{finishData.doctor?.name}</Title>
            <Speciality>{finishData.specialty?.name}</Speciality>
          </Flex>

          <Line $marginBottom={0} $marginTop={0} />

          <Flex $direction={'column'} $align={'flex-start'} $gap={4}>
            <CheckCardDescription>Медучреждение: </CheckCardDescription>

            <Title>{finishData.lpu?.lpuFullName}</Title>
            <CheckCardDescription>{finishData.lpu?.address}</CheckCardDescription>
            {finishData.lpu?.phone && (
              <ContactLink
                href={`tel:${formatPhoneForLink(finishData.lpu?.phone)}`}
                onClick={e => handlePhoneClick(e, finishData.lpu?.phone)}
              >
                {formatPhoneForDisplay(finishData.lpu?.phone)}
              </ContactLink>
            )}
            {finishData.lpu?.email && (
              <ContactLink
                href={`mailto:${finishData.lpu?.email}`}
                onClick={e => handleEmailClick(e, finishData.lpu?.email)}
              >
                {finishData.lpu?.email}
              </ContactLink>
            )}
          </Flex>
        </InfoWrapper>
      </Section>

      <NavigationContainer $vertical>
        <NavigationBtn variant="primary" onClick={() => finish()}>
          На главную
        </NavigationBtn>

        <NavigationBtn variant="danger-outline" onClick={() => onCancel()}>
          Отменить
        </NavigationBtn>
      </NavigationContainer>
    </Card>
  );
};
