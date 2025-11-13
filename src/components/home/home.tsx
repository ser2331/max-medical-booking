import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Container, Flex, Grid, Panel, Typography } from '@maxhub/max-ui';
import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';
import styled from 'styled-components';

const HomeContainer = styled(Container).attrs({ fullWidth: true })`
  flex: 1;
  background: ${props => props.theme.colors.background.primary};
`;

const ContentFlex = styled(Flex)`
  flex: 1;
  height: 100%;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background.primary};
`;

const UserCard = styled(Flex)`
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  border: 1px solid ${props => props.theme.colors.border.primary};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.border.accent};
    box-shadow: ${props => props.theme.shadows.small};
  }
`;

const UserAvatar = styled(Avatar.Container)`
  && {
    background: ${props => props.theme.colors.primary};

    .max-avatar-text {
      color: ${props => props.theme.colors.text.inverted};
      font-weight: ${props => props.theme.typography.fontWeight.semibold};
    }
  }
`;

const UserName = styled(Typography.Headline)`
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const UserStatus = styled(Typography.Body)`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const MenuGrid = styled(Grid)`
  gap: ${props => props.theme.spacing.sm};
  grid-template-columns: 1fr;
  width: 100%;
  max-width: 400px;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);

    .menu-panel {
      border-color: ${props => props.theme.colors.border.accent};
      box-shadow: ${props => props.theme.shadows.medium};
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const MenuPanel = styled(Panel)`
  && {
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid ${props => props.theme.colors.border.primary};
    background: ${props => props.theme.colors.background.card};
  }
`;

const MenuItemContent = styled(Flex)`
  width: 100%;
`;

const MenuIcon = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.background.tertiary};
  border-radius: ${props => props.theme.borderRadius.medium};
  flex-shrink: 0;
`;

const MenuTextContainer = styled(Flex)`
  flex: 1;
  min-width: 0;
`;

const MenuItemName = styled(Typography.Label)`
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.md};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const MenuItemDescription = styled(Typography.Body)`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: 1.4;
`;

const SectionTitle = styled(Typography.Body)`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const DevToolsAccordion = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  overflow: hidden;
  transition: all 0.3s ease;
  max-height: ${props => (props.$isOpen ? '300px' : '0')};
  opacity: ${props => (props.$isOpen ? 1 : 0)};
`;

const DevToolsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xs} 0;
  border-top: 1px solid ${props => props.theme.colors.border.secondary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
  }
`;

const DevToolsTitle = styled(Typography.Body)`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;
// Types
interface MenuItem {
  name: string;
  description: string;
  icon: string;
  path: string;
  mode: 'primary' | 'secondary';
}

export const Home: React.FC = () => {
  const { user, hapticFeedback } = useMaxBridgeContext();
  const [showDevTools, setShowDevTools] = useState(false);

  // Основные пункты меню
  const mainMenuItems: MenuItem[] = [
    {
      name: 'Медицинские заявки',
      description: '',
      icon: '🏥',
      path: '/booking',
      mode: 'primary',
    },
    {
      name: 'Запись на прием к врачу',
      description: '',
      icon: '📋',
      path: '/doctor-appointment-make',
      mode: 'primary',
    },
  ];

  // Скрытые пункты для разработчиков
  const devMenuItems: MenuItem[] = [
    {
      name: 'DEMO AUTH',
      description: 'AUTH',
      icon: '🔐',
      path: '/auth',
      mode: 'secondary',
    },
    {
      name: 'DEBUG',
      description: 'DEBUG',
      icon: '🐛',
      path: '/debug',
      mode: 'secondary',
    },
    {
      name: 'maxDemo',
      description: 'maxDemo',
      icon: '⚡',
      path: '/maxDemo',
      mode: 'secondary',
    },
  ];

  const handleMenuClick = () => {
    hapticFeedback('impact', 'light');
  };

  const toggleDevTools = () => {
    hapticFeedback('impact', 'light');
    setShowDevTools(!showDevTools);
  };

  return (
    <HomeContainer>
      <ContentFlex direction="column" gap={24} align={'center'} justify={'center'}>
        {/* Карточка пользователя */}
        {user && (
          <UserCard gap={16} align={'center'}>
            <UserAvatar size={56} form="circle">
              {user.photo_url ? (
                <Avatar.Image src={user.photo_url} alt={user.first_name} />
              ) : (
                <Avatar.Text>{user.first_name[0]}</Avatar.Text>
              )}
            </UserAvatar>

            <Flex direction="column">
              <UserName>
                {user.first_name} {user.last_name}
              </UserName>
              <UserStatus>Готовы к записи к врачу</UserStatus>
            </Flex>
          </UserCard>
        )}

        {/* Основные действия */}
        <MenuGrid>
          {mainMenuItems.map(item => (
            <MenuLink key={item.path} to={item.path} onClick={handleMenuClick}>
              <MenuPanel mode={item.mode} className={`menu-panel ${item.mode}-mode`}>
                <MenuItemContent gap={16} align={'center'}>
                  <MenuIcon>{item.icon}</MenuIcon>
                  <MenuTextContainer direction="column" gap={4}>
                    <MenuItemName>{item.name}</MenuItemName>
                    <MenuItemDescription>{item.description}</MenuItemDescription>
                  </MenuTextContainer>
                </MenuItemContent>
              </MenuPanel>
            </MenuLink>
          ))}
        </MenuGrid>

        {/* Аккордеон средств разработчика */}
        <DevToolsHeader onClick={toggleDevTools}>
          <DevToolsTitle>{showDevTools ? '▲' : '▼'} Средства разработчика</DevToolsTitle>
        </DevToolsHeader>

        {/* Скрытые пункты меню для разработчиков */}
        <DevToolsAccordion $isOpen={showDevTools}>
          <SectionTitle>Инструменты разработчика</SectionTitle>
          <MenuGrid>
            {devMenuItems.map(item => (
              <MenuLink key={item.path} to={item.path} onClick={handleMenuClick}>
                <MenuPanel mode={item.mode} className={`menu-panel ${item.mode}-mode`}>
                  <MenuItemContent gap={8} align={'center'}>
                    <MenuIcon>{item.icon}</MenuIcon>
                    <MenuTextContainer direction="column" gap={0}>
                      <MenuItemName>{item.name}</MenuItemName>
                    </MenuTextContainer>
                  </MenuItemContent>
                </MenuPanel>
              </MenuLink>
            ))}
          </MenuGrid>
        </DevToolsAccordion>
      </ContentFlex>
    </HomeContainer>
  );
};
