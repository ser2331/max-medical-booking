import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import {
  ContentFlex,
  IconContainer,
  PageContainer,
} from '../../components/ui/StyledComponents';
import { Button, Flex, Typography } from '@maxhub/max-ui';

export const AppointmentSuccessPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Временные данные для демонстрации
  const appointmentData = {
    patient: 'Иванов Иван Иванович',
    doctor: 'Петрова Мария Сергеевна',
    specialization: 'Терапевт',
    date: '15 декабря 2024',
    time: '10:30',
    address: 'ул. Ленина, д. 25, кабинет 304',
    recordNumber: 'Z-2024-12-15-1030',
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleNewAppointment = () => {
    navigate('/booking');
  };

  // Автоматический переход на главную через 10 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageLayout title={''}>
      <PageContainer>
        <ContentFlex
          direction="column"
          gap="lg"
          align="center"
          style={{
            textAlign: 'center',
            padding: 'var(--spacing-xl) 0',
          }}
        >
          {/* Иконка успеха */}
          <IconContainer
            $size="80px"
            $background="var(--color-background-success)"
            $color="var(--color-text-primary)"
            style={{ fontSize: '32px', borderRadius: '50%' }}
          >
            ✓
          </IconContainer>

          <Typography.Title
            style={{
              color: 'var(--color-text-accent)',
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            {t('booking.success')}
          </Typography.Title>

          <Typography.Body
            style={{
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-lg)',
            }}
          >
            Запись успешно создана и подтверждена
          </Typography.Body>

          {/* Карточка с деталями записи */}
          <div
            style={{
              background: 'var(--color-background-secondary)',
              borderRadius: 'var(--radius-medium)',
              padding: 'var(--spacing-lg)',
              width: '100%',
              maxWidth: '400px',
              border: '1px solid var(--color-border-secondary)',
            }}
          >
            <ContentFlex direction="column" gap="md">
              {/* Номер записи */}
              <Flex direction="column" gap="xs">
                <Typography.Label
                  style={{ color: 'var(--color-text-secondary)' }}>
                  Номер записи
                </Typography.Label>
                <Typography.Body
                  style={{
                    fontWeight: '600',
                    color: 'var(--color-text-accent)',
                    fontSize: '18px',
                  }}
                >
                  {appointmentData.recordNumber}
                </Typography.Body>
              </Flex>

              {/* Детали приема */}
              <Flex direction="column" gap="xs" align="flex-start">
                <Typography.Label
                  style={{ color: 'var(--color-text-secondary)' }}>
                  Пациент
                </Typography.Label>
                <Typography.Body>{appointmentData.patient}</Typography.Body>
              </Flex>

              <Flex direction="column" gap="xs" align="flex-start">
                <Typography.Label
                  style={{ color: 'var(--color-text-secondary)' }}>
                  Врач
                </Typography.Label>
                <Typography.Body>
                  {appointmentData.doctor} ({appointmentData.specialization})
                </Typography.Body>
              </Flex>

              <Flex direction="column" gap="xs" align="flex-start">
                <Typography.Label
                  style={{ color: 'var(--color-text-secondary)' }}>
                  Дата и время
                </Typography.Label>
                <Typography.Body>
                  {appointmentData.date}, {appointmentData.time}
                </Typography.Body>
              </Flex>

              <Flex direction="column" gap="xs" align="flex-start">
                <Typography.Label
                  style={{ color: 'var(--color-text-secondary)' }}>
                  Адрес
                </Typography.Label>
                <Typography.Body style={{ fontSize: '14px' }}>
                  {appointmentData.address}
                </Typography.Body>
              </Flex>
            </ContentFlex>
          </div>

          {/* Информационное сообщение */}
          <div
            style={{
              background: 'var(--color-background-primary)',
              border: '1px solid var(--color-border-accent)',
              borderRadius: 'var(--radius-small)',
              padding: 'var(--spacing-md)',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <Typography.Body
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
              }}
            >
              📧 На вашу электронную почту отправлено подтверждение записи.
              <br />⏰ Автоматический переход на главную страницу через 10
              секунд.
            </Typography.Body>
          </div>

          {/* Кнопки действий */}
          <Flex gap="md" style={{ marginTop: 'var(--spacing-lg)' }}>
            <Button onClick={handleGoHome} style={{ minWidth: '140px' }}>
              На главную
            </Button>
            <Button onClick={handleNewAppointment}
                    style={{ minWidth: '140px' }}>
              Новая запись
            </Button>
          </Flex>
        </ContentFlex>
      </PageContainer>
    </PageLayout>
  );
};
