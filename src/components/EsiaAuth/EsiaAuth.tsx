import React from 'react';
import styled from 'styled-components';

import { setAuthenticated } from '@/store/slices/authSlice.ts';
import { useAppDispatch } from '@/store/redux-hooks.ts';

import { Flex } from '@/components/ui/StyledComponents.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { ImageLoader } from '@/components/ImageLoader.tsx';
import authBackground from '@/assets/images/auth/authBack.png';
import authIcon from '@/assets/images/auth/Icon.png';

export const PageContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  background: url(${authBackground}) no-repeat center center;
  background-size: cover;
  padding: ${props => props.theme.spacing.md};
  transition: opacity 0.3s ease;
`;

export const PageContent = styled(Flex).attrs({ $direction: 'column' })`
  gap: 32px;
`;

const Text = styled.span`
  width: 100%;
  text-align: center;
  max-width: ${props => props.theme.breakpoints.sm};
`;

const Title = styled(Text)`
  color: ${props => props.theme.colors.blueDark};
  font-size: ${props => props.theme.spacing.lg};
  line-height: ${props => props.theme.spacing.xml};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

const Subtitle = styled(Text)`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.md};
  line-height: ${props => props.theme.spacing.lg};
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const AuthContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleAuth = () => {
    window.location.href = `${import.meta.env.VITE_BASE_PATH}/oidc/esia-login`;
  };

  // Демо-режим (для разработки)
  const handleDemoAuth = () => {
    dispatch(setAuthenticated(true));
  };

  return (
    <PageContainer>
      <PageContent>
        <Title>Запись к врачу</Title>
        <Subtitle>
          Для записи к врачу или на телемедицинские услуги, пожалуйста, авторизуйтесь через
          ГОСУСЛУГИ
        </Subtitle>

        <Flex $direction="column" $gap={16}>
          <CustomButton onClick={handleAuth}>
            <Icon src={authIcon} alt="Госуслуги" />
            Войти через ГОСУСЛУГИ
          </CustomButton>

          {/* Кнопка для демо-режима (можно убрать в продакшене) */}
          {import.meta.env.VITE_MODE === 'development' && (
            <CustomButton onClick={handleDemoAuth}>Демо-вход (только для разработки)</CustomButton>
          )}
        </Flex>
      </PageContent>
    </PageContainer>
  );
};

export const EsiaAuth: React.FC = () => {
  return (
    <ImageLoader images={[authBackground, authIcon]}>
      <AuthContent />
    </ImageLoader>
  );
};
