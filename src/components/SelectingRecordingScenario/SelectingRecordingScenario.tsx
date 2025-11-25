import React from 'react';
import styled from 'styled-components';

import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';

import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { Card } from '@/components/ui/Cart.tsx';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { useNavigate } from 'react-router-dom';
import authBackground from '@/assets/images/auth/authBack.png';
import { ImageLoader } from '@/components/ImageLoader.tsx';
import { Avatar } from '@/components/ui/Avatar/Avatar.tsx';
import { UserIcon } from '@/assets/icons/UserIcon.tsx';

export const PageContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  background: url(${authBackground}) no-repeat center center;
  background-size: cover;
  padding: ${props => props.theme.spacing.md};
  transition: opacity 0.3s ease;
  position: relative;
`;
export const PageContent = styled(Card).attrs({ $vertical: true })`
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const SelectingRecordingScenarioContent: React.FC = () => {
  const navigator = useNavigate();
  const { user, hapticFeedback } = useMaxBridgeContext();

  const handleMenuClick = (path: string) => {
    hapticFeedback('impact', 'light').then(() => {
      navigator(path);
    });
  };

  const selectionPoints = [
    {
      title: 'Себя',
      description: '',
      image: user?.photo_url,
      path: '/personal-booking',
    },
    {
      title: 'Другого',
      description: '',
      icon: UserIcon,
      path: '/another-booking',
    },
  ];

  const style = {
    width: '100%',
  };
  return (
    <PageContainer className="page-container">
      <PageContent className="page-content">
        <Flex style={style} $gap={16}>
          {selectionPoints.map((point, index) => {
            return (
              <Flex style={style} $direction={'column'} $gap={16} key={point.path}>
                <Avatar
                  src={point.image}
                  icon={point.icon}
                  alt={point.title}
                  size={'large'}
                  iconProps={{ width: 50, height: 50 }}
                />
                <CustomButton
                  variant={!index ? 'primary' : 'outline-default'}
                  onClick={() => handleMenuClick(point.path)}
                >
                  {point.title}
                </CustomButton>
              </Flex>
            );
          })}
        </Flex>
      </PageContent>
    </PageContainer>
  );
};

export const SelectingRecordingScenario: React.FC = () => {
  return (
    <ImageLoader images={[authBackground]}>
      <SelectingRecordingScenarioContent />
    </ImageLoader>
  );
};
