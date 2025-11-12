import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Container, Flex, Grid, Panel, Typography } from '@maxhub/max-ui';
import { useTranslation } from 'react-i18next';
import { useMaxBridgeContext } from '../providers/MaxBridgeProvider';

export const HomePage: React.FC = () => {
  const { user, hapticFeedback } = useMaxBridgeContext();
  const { t } = useTranslation();

  const menuItems = [
    {
      name: 'Запись по прикреплению',
      description: 'Запись в вашу поликлинику',
      icon: '🏥',
      path: '/booking',
      mode: 'primary' as const,
    },
    {
      name: 'Запись на прием',
      description: 'Многошаговая форма записи',
      icon: '📋',
      path: '/stepper',
      mode: 'primary' as const,
    },
    {
      name: 'DEMO AUTH',
      description: 'AUTH',
      icon: '🔐',
      path: '/auth',
      mode: 'primary' as const,
    },
    {
      name: 'DEBUG',
      description: 'DEBUG',
      icon: '🐛',
      path: '/debug',
      mode: 'secondary' as const,
    },
    {
      name: 'maxDemo',
      description: 'maxDemo',
      icon: '⚡',
      path: '/maxDemo',
      mode: 'secondary' as const,
    },
  ];

  return (
    <Container fullWidth style={{ flex: 1, padding: '16px' }}>
      <Flex
        direction="column"
        gap={24}
        align={'center'}
        justify={'center'}
        style={{ flex: 1, height: '100%' }}
      >
        {/* Заголовок */}
        <Flex direction="column" gap={8} align={'center'}>
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

        {/* Карточка пользователя */}
        {user && (
          <Flex gap={16} align={'center'}>
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
              <Typography.Body style={{ color: 'var(--color-text-secondary)' }}>
                Готовы к записи к врачу
              </Typography.Body>
            </Flex>
          </Flex>
        )}

        {/* Основные действия */}
        <Grid style={{ gap: '12px', gridTemplateColumns: '1fr' }}>
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => hapticFeedback('impact', 'light')}
              style={{ textDecoration: 'none' }}
            >
              <Panel mode={item.mode} style={{ cursor: 'pointer' }}>
                <Flex gap={16} align={'center'}>
                  <div style={{ fontSize: '24px' }}>{item.icon}</div>
                  <Flex direction="column" gap={4}>
                    <Typography.Label>{item.name}</Typography.Label>
                    <Typography.Body style={{ color: 'var(--color-text-secondary)' }}>
                      {item.description}
                    </Typography.Body>
                  </Flex>
                </Flex>
              </Panel>
            </Link>
          ))}
        </Grid>
      </Flex>
    </Container>
  );
};
