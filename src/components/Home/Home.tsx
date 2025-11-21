import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';
import { useMessageToast } from '@/hooks/useMessageToast.ts';

import { UserCard } from '@/components/ui/User/UserCard.tsx';
import { MenuItem } from '@/components/ui/Menu/MenuItem.tsx';
import { SectionTitle } from '@/components/ui/Typography/SectionTitle.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { Card } from '@/components/ui/Cart.tsx';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { TeleMedIcon } from '@/assets/icons/TeleMedIcon.tsx';
import { BookingIcon } from '@/assets/icons/BookingIcon.tsx';
import { useNavigate } from 'react-router-dom';

export const PageContainer = styled(Card).attrs({ $vertical: true })`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;
export const Menu = styled(Flex).attrs({ $direction: 'column' })`
  gap: ${props => props.theme.spacing.md};
  width: 100%;
`;
interface MenuItemType {
  name: string;
  description: string;
  icon: ReactNode;
  path: string;
}

// Основные пункты меню
const mainMenuItems: MenuItemType[] = [
  {
    name: 'Телемедицинские услуги',
    description: '',
    icon: <TeleMedIcon color={'white'} />,
    path: '/booking',
  },
  {
    name: 'Запись на прием к врачу',
    description: '',
    icon: <BookingIcon color={'white'} />,
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
  const navigator = useNavigate();
  const { user, hapticFeedback } = useMaxBridgeContext();
  const messageToast = useMessageToast();
  const [showDevTools, setShowDevTools] = useState(false);

  const handleMenuClick = (path: string) => {
    hapticFeedback('impact', 'light').then(() => {
      navigator(path);
    });
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
      {/* Карточка пользователя */}
      {user && <UserCard user={user} />}

      {/* Основные действия */}
      <Menu>
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
      </Menu>

      <SectionTitle onClick={toggleDevTools}>Инструменты разработчика</SectionTitle>
      {showDevTools && (
        <Menu>
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
          <CustomButton variant={'primary'} onClick={handleShowToast}>
            Show TOAST
          </CustomButton>
        </Menu>
      )}
    </PageContainer>
  );
};
