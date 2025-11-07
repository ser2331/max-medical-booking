import React from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Container,
  Flex,
  Grid,
  Panel,
  Typography,
} from '@maxhub/max-ui';
import { useTranslation } from 'react-i18next';
import { useMaxBridgeContext } from '../providers/MaxBridgeProvider';

export const HomePage: React.FC = () => {
  const { user, hapticFeedback } = useMaxBridgeContext();
  const { t } = useTranslation();

  return (
    <Container fullWidth style={{ height: '100%', flex: 1 }}>
      <Flex
        direction="column"
        align={'center'}
        justify={'center'}
        gap={24}
        style={{ height: '100%', flex: 1 }}
      >
        {/* Заголовок */}
        <Panel>
          <Flex direction="column" justify={'center'} gap={8} align={'center'}>
            <Typography.Display style={{ textAlign: 'center' }}>
              {t('booking.title')}
            </Typography.Display>
            <Typography.Body
              style={{
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
              }}
            >
              Быстрая запись через ЕСИА
            </Typography.Body>
          </Flex>
        </Panel>

        {/* Карточка пользователя */}
        {user && (
          <Panel>
            <Flex style={{ gap: '16px', alignItems: 'center' }}>
              <Avatar.Container size={56} form="circle">
                {user.photo_url ? (
                  <Avatar.Image src={user.photo_url} alt={user.first_name} />
                ) : (
                  <Avatar.Text>{user.first_name[0]}</Avatar.Text>
                )}
              </Avatar.Container>

              <Flex direction="column">
                <Typography.Headline>
                  {user.first_name} {user.last_name}
                </Typography.Headline>
                <Typography.Body
                  style={{ color: 'var(--color-text-secondary)' }}>
                  Готовы к записи к врачу
                </Typography.Body>
              </Flex>
            </Flex>
          </Panel>
        )}

        {/* Основные действия */}
        <Grid style={{ gap: '16px', gridTemplateColumns: '1fr' }}>
          <Link
            to="/booking"
            onClick={() => hapticFeedback('impact', { style: 'light' })}
            style={{ textDecoration: 'none' }}
          >
            <Panel style={{ cursor: 'pointer' }}>
              <Flex style={{ gap: '16px', alignItems: 'center' }}>
                <div style={{ fontSize: '24px' }}>🏥</div>
                <Flex direction="column" style={{ gap: '4px' }}>
                  <Typography.Label>Запись по прикреплению</Typography.Label>
                  <Typography.Body
                    style={{ color: 'var(--color-text-secondary)' }}>
                    Запись в вашу поликлинику
                  </Typography.Body>
                </Flex>
              </Flex>
            </Panel>
          </Link>

          <Panel mode="secondary">
            <Flex style={{ gap: '16px', alignItems: 'center' }}>
              <div style={{ fontSize: '24px' }}>🔍</div>
              <Flex direction="column" style={{ gap: '4px' }}>
                <Typography.Label>Запись в любую клинику</Typography.Label>
                <Typography.Body
                  style={{ color: 'var(--color-text-secondary)' }}>
                  Выберите любую медицинскую организацию
                </Typography.Body>
              </Flex>
            </Flex>
          </Panel>

          <Panel mode="secondary">
            <Flex style={{ gap: '16px', alignItems: 'center' }}>
              <div style={{ fontSize: '24px' }}>📋</div>
              <Flex direction="column" style={{ gap: '4px' }}>
                <Typography.Label>Мои записи</Typography.Label>
                <Typography.Body
                  style={{ color: 'var(--color-text-secondary)' }}>
                  Просмотр и управление записями
                </Typography.Body>
              </Flex>
            </Flex>
          </Panel>

          <Link
            to="/debug"
            onClick={() => hapticFeedback('impact', { style: 'light' })}
            style={{ textDecoration: 'none' }}
          >
            <Panel mode="secondary">
              <Flex style={{ gap: '16px', alignItems: 'center' }}>
                <div style={{ fontSize: '24px' }}>📋</div>
                <Flex direction="column" style={{ gap: '4px' }}>
                  <Typography.Label>DEBUG</Typography.Label>
                  <Typography.Body
                    style={{ color: 'var(--color-text-secondary)' }}>
                    DEBUG
                  </Typography.Body>
                </Flex>
              </Flex>
            </Panel>
          </Link>
        </Grid>

        {/* Информационный блок */}
        <Panel mode="secondary">
          <Flex direction="column" style={{ gap: '12px' }}>
            <Typography.Title>Как это работает?</Typography.Title>
            <Flex direction="column" style={{ gap: '8px' }}>
              <Flex style={{ gap: '12px', alignItems: 'center' }}>
                <div style={{ fontSize: '20px' }}>1️⃣</div>
                <Typography.Body>Выберите тип записи</Typography.Body>
              </Flex>
              <Flex style={{ gap: '12px', alignItems: 'center' }}>
                <div style={{ fontSize: '20px' }}>2️⃣</div>
                <Typography.Body>Авторизуйтесь через Госуслуги</Typography.Body>
              </Flex>
              <Flex style={{ gap: '12px', alignItems: 'center' }}>
                <div style={{ fontSize: '20px' }}>3️⃣</div>
                <Typography.Body>Выберите врача и время</Typography.Body>
              </Flex>
              <Flex style={{ gap: '12px', alignItems: 'center' }}>
                <div style={{ fontSize: '20px' }}>4️⃣</div>
                <Typography.Body>Получите подтверждение</Typography.Body>
              </Flex>
            </Flex>
          </Flex>
        </Panel>
      </Flex>
    </Container>
  );
};
