import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  AccentLabel,
  ContentFlex,
  PageContainer,
  SecondaryText,
  StyledPanel,
} from '../../components/ui/StyledComponents';
import { Flex, Typography } from '@maxhub/max-ui';

export const AppointmentConfirmPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Временные данные для демонстрации
  const appointmentData = {
    patient: 'Иванов Иван Иванович',
    institution: 'Городская поликлиника №1',
    specialization: 'Терапевт',
    doctor: 'Петрова Мария Сергеевна',
    date: '15 декабря 2024',
    time: '10:30',
    address: 'ул. Ленина, д. 25',
  };

  const handleConfirm = () => {
    // Здесь будет логика подтверждения записи
    console.log('Appointment confirmed');
    navigate('/booking/success');
  };

  return (
    <PageLayout
      title={t('booking.confirm')}
      submitButton={{
        text: t('confirm', 'Подтвердить запись'),
        onClick: handleConfirm,
      }}
      backButton={{
        text: '',
        onClick: () => navigate(-1),
      }}
    >
      <PageContainer>
        <ContentFlex direction="column" gap="lg">
          <Typography.Title
            style={{
              textAlign: 'center',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            {t('booking.confirm')}
          </Typography.Title>

          <StyledPanel style={{ padding: 'var(--spacing-lg)' }}>
            <ContentFlex direction="column" gap="md">
              {/* Пациент */}
              <Flex justify="space-between" align="center">
                <SecondaryText>{t('patient.selected')}:</SecondaryText>
                <AccentLabel>{appointmentData.patient}</AccentLabel>
              </Flex>

              {/* Учреждение */}
              <Flex justify="space-between" align="center">
                <SecondaryText>{t('institution.selected')}:</SecondaryText>
                <div style={{ textAlign: 'right' }}>
                  <AccentLabel>{appointmentData.institution}</AccentLabel>
                  <SecondaryText style={{ fontSize: '14px' }}>
                    {appointmentData.address}
                  </SecondaryText>
                </div>
              </Flex>

              {/* Специальность и врач */}
              <Flex justify="space-between" align="center">
                <SecondaryText>{t('specialization.selected')}:</SecondaryText>
                <AccentLabel>{appointmentData.specialization}</AccentLabel>
              </Flex>

              <Flex justify="space-between" align="center">
                <SecondaryText>{t('booking.selectDoctor')}:</SecondaryText>
                <AccentLabel>{appointmentData.doctor}</AccentLabel>
              </Flex>

              {/* Дата и время */}
              <Flex justify="space-between" align="center">
                <SecondaryText>Дата и время:</SecondaryText>
                <AccentLabel>
                  {appointmentData.date}, {appointmentData.time}
                </AccentLabel>
              </Flex>
            </ContentFlex>
          </StyledPanel>

          {/* Информационное сообщение */}
          <StyledPanel
            style={{
              padding: 'var(--spacing-md)',
              background: 'var(--color-background-warning)',
              border: '1px solid var(--color-border-accent)',
            }}
          >
            <ContentFlex direction="column" gap="xs">
              <Typography.Label style={{ color: 'var(--color-text-accent)' }}>
                {t('patient.important')}
              </Typography.Label>
              <SecondaryText style={{ fontSize: '14px' }}>
                Пожалуйста, проверьте правильность данных. Отмена записи
                возможна не позднее чем за
                2 часа до приема.
              </SecondaryText>
            </ContentFlex>
          </StyledPanel>
        </ContentFlex>
      </PageContainer>
    </PageLayout>
  );
};
