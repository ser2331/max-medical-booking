import React, { useState } from 'react';
import styled from 'styled-components';

import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';
import { useMessageToast } from '@/hooks/useMessageToast.ts';

import { UserCard } from '@/components/ui/User/UserCard.tsx';
import { MenuItem } from '@/components/ui/Menu/MenuItem.tsx';
import { MenuGrid } from '@/components/ui/Menu/MenuGrid.tsx';
import { SectionTitle } from '@/components/ui/Typography/SectionTitle.tsx';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';

export const PageContainer = styled(Flex)`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const PageContent = styled(Flex).attrs({
  $direction: 'column',
  $justifyContent: 'flex-start',
})`
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.small};
`;

interface MenuItemType {
  name: string;
  description: string;
  icon: string;
  path: string;
}

// Основные пункты меню
const mainMenuItems: MenuItemType[] = [
  {
    name: 'Медицинские заявки',
    description: '',
    icon: '🏥',
    path: '/booking',
  },
  {
    name: 'Запись на прием к врачу',
    description: '',
    icon: '📋',
    path: '/doctor-appointment-make',
  },
];
// Скрытые пункты для разработчиков
const devMenuItems: MenuItemType[] = [
  {
    name: 'DEMO AUTH',
    description: 'AUTH',
    icon: '🔐',
    path: '/auth',
  },
  {
    name: 'DEBUG',
    description: 'DEBUG',
    icon: '🐛',
    path: '/debug',
  },
  {
    name: 'maxDemo',
    description: 'maxDemo',
    icon: '⚡',
    path: '/maxDemo',
  },
];

export const Home: React.FC = () => {
  const { user, hapticFeedback } = useMaxBridgeContext();
  const messageToast = useMessageToast();
  const [showDevTools, setShowDevTools] = useState(false);

  const handleMenuClick = () => {
    hapticFeedback('impact', 'light');
  };

  const handleShowToast = () => {
    messageToast('TOAST ', 'success');
  };

  const toggleDevTools = () => {
    hapticFeedback('impact', 'light');
    setShowDevTools(!showDevTools);
  };

  return (
    <PageContainer className="page-container">
      <PageContent className="page-content">
        {/* Карточка пользователя */}
        {user && <UserCard user={user} />}

        {/* Основные действия */}
        <MenuGrid>
          {mainMenuItems.map(item => (
            <MenuItem
              key={item.path}
              name={item.name}
              description={item.description}
              icon={item.icon}
              path={item.path}
              onClick={handleMenuClick}
            />
          ))}
        </MenuGrid>

        <SectionTitle onClick={toggleDevTools}>Инструменты разработчика</SectionTitle>
        {showDevTools && (
          <MenuGrid>
            {devMenuItems.map(item => (
              <MenuItem
                key={item.path}
                name={item.name}
                description={item.description}
                icon={item.icon}
                path={item.path}
                onClick={handleMenuClick}
              />
            ))}
            <CustomButton onClick={handleShowToast}>Show TOAST</CustomButton>
          </MenuGrid>
        )}
      </PageContent>
    </PageContainer>
  );
};
