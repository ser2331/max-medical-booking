import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/ui/StyledComponents.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';
import authBackground from '@/assets/images/auth/authBack.png';
import authIcon from '@/assets/images/auth/Icon.png';
import { ImageLoader } from '@/components/ImageLoader.tsx';

const Container = styled(Flex).attrs({ $direction: 'column', $gap: 32 })`
  width: 100%;
  height: 100%;
  background: url(${authBackground}) no-repeat center center;
  background-size: cover;
  padding: ${props => props.theme.spacing.md};
  transition: opacity 0.3s ease;
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

const AuthBtn = styled(CustomButton)`
  width: 100%;
  max-width: ${props => props.theme.breakpoints.xs};
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const AuthContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Запись к врачу</Title>
      <Subtitle>
        Для записи к врачу или на телемедицинские услуги, пожалуйста, авторизуйтесь через ГОСУСЛУГИ
      </Subtitle>

      <AuthBtn onClick={() => navigate('/')}>
        <Icon src={authIcon} alt="Госуслуги" />
        Войти через ГОСУСЛУГИ
      </AuthBtn>
    </Container>
  );
};

export const EsiaAuth: React.FC = () => {
  return (
    <ImageLoader images={[authBackground, authIcon]}>
      <AuthContent />
    </ImageLoader>
  );
};
