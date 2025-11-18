import React, { useEffect } from 'react';
import { useMaxBridgeContext } from '../providers/MaxBridgeProvider';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 600px;
  margin: 0 auto;
  background: ${props => props.theme.colors.mainBackgroundColor};
  color: ${props => props.theme.colors.black};
`;

const UserInfo = styled.div`
  background: ${props => props.theme.colors.mainBackgroundColor};
  border: 1px solid ${props => props.theme.colors.black};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};

  h2 {
    margin: 0 0 ${props => props.theme.spacing.sm} 0;
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.typography.fontSize.xl};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
  }

  p {
    margin: ${props => props.theme.spacing.xs} 0;
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
`;

const Button = styled.button<{ $disabled?: boolean }>`
  background: ${props => (props.$disabled ? props.theme.colors.black : props.theme.colors.black)};
  color: ${props => props.theme.colors.black};
  border: none;
  border-radius: ${props => props.theme.components.button.borderRadius};
  padding: ${props => props.theme.components.button.padding};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover {
    background: ${props =>
      props.$disabled ? props.theme.colors.black : props.theme.colors.blueHover};
    transform: ${props => (props.$disabled ? 'none' : 'translateY(-1px)')};
    box-shadow: ${props => (props.$disabled ? 'none' : props.theme.shadows.small)};
  }

  &:active {
    transform: ${props => (props.$disabled ? 'none' : 'translateY(0)')};
  }
`;

const WarningMessage = styled.div`
  background: ${props => props.theme.colors.red}15; // 15% opacity
  border: 1px solid ${props => props.theme.colors.red};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  text-align: center;

  h1 {
    margin: 0 0 ${props => props.theme.spacing.sm} 0;
    color: ${props => props.theme.colors.red};
    font-size: ${props => props.theme.typography.fontSize.lg};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.red};
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

const FeatureStatus = styled.div`
  background: ${props => props.theme.colors.mainBackgroundColor};
  border: 1px solid ${props => props.theme.colors.black};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};

  h3 {
    margin: 0 0 ${props => props.theme.spacing.md} 0;
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.typography.fontSize.md};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
  }
`;

const FeatureItem = styled.div<{ $supported: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${props => props.theme.spacing.sm} 0;
  padding: ${props => props.theme.spacing.sm} 0;
  border-bottom: 1px solid ${props => props.theme.colors.black};

  &:last-child {
    border-bottom: none;
  }

  .feature-name {
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.typography.fontSize.sm};
  }

  .feature-status {
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    color: ${props => (props.$supported ? props.theme.colors.green : props.theme.colors.red)};
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

const Header = styled.h1`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.xxl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const MaxDemo: React.FC = () => {
  const {
    isMaxApp,
    user,
    showBackButton,
    onBackButtonClick,
    hapticFeedback,
    openExternalLink,
    supportedFeatures,
  } = useMaxBridgeContext();

  useEffect(() => {
    if (isMaxApp) {
      showBackButton(true);

      onBackButtonClick(() => {
        console.log('Back button pressed');
        hapticFeedback('impact', 'light');
      });
    }

    return () => {
      if (isMaxApp) {
        showBackButton(false);
      }
    };
  }, [isMaxApp, showBackButton, onBackButtonClick, hapticFeedback]);

  if (!isMaxApp) {
    return (
      <Container>
        <WarningMessage>
          <h1>Приложение запущено вне MAX</h1>
          <p>Для полного функционала запустите в MAX мессенджере</p>
        </WarningMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>Демо MAX Bridge</Header>

      <Section>
        <FeatureStatus>
          <h3>Поддерживаемые функции:</h3>
          <FeatureItem $supported={supportedFeatures.backButton}>
            <span className="feature-name">Кнопка "Назад"</span>
            <span className="feature-status">
              {supportedFeatures.backButton ? '✓ Работает' : '✗ Не поддерживается'}
            </span>
          </FeatureItem>
          <FeatureItem $supported={supportedFeatures.openLink}>
            <span className="feature-name">Открытие ссылок</span>
            <span className="feature-status">
              {supportedFeatures.openLink ? '✓ Работает' : '✗ Не поддерживается'}
            </span>
          </FeatureItem>
          <FeatureItem $supported={supportedFeatures.haptic}>
            <span className="feature-name">Тактильная обратная связь</span>
            <span className="feature-status">
              {supportedFeatures.haptic ? '✓ Работает' : '✗ Не поддерживается'}
            </span>
          </FeatureItem>
          <FeatureItem $supported={supportedFeatures.requestContact}>
            <span className="feature-name">Запрос контакта</span>
            <span className="feature-status">
              {supportedFeatures.requestContact ? '✓ Работает' : '✗ Не поддерживается'}
            </span>
          </FeatureItem>
        </FeatureStatus>
      </Section>

      {user && (
        <Section>
          <UserInfo>
            <h2>Привет, {user.first_name}!</h2>
            <p>ID: {user.id}</p>
            <p>Язык: {user.language_code || 'не указан'}</p>
            {user.username && <p>Username: @{user.username}</p>}
          </UserInfo>
        </Section>
      )}

      <Section>
        <h3
          style={{
            color: '${props => props.theme.colors.black}',
            marginBottom: '${props => props.theme.spacing.md}',
            fontSize: '${props => props.theme.typography.fontSize.lg}',
          }}
        >
          Тестирование функций
        </h3>
        <ActionsGrid>
          <Button
            $disabled={!supportedFeatures.haptic}
            onClick={() => hapticFeedback('impact', 'light')}
          >
            Легкая вибрация
          </Button>

          <Button
            $disabled={!supportedFeatures.haptic}
            onClick={() => hapticFeedback('impact', 'medium')}
          >
            Средняя вибрация
          </Button>

          <Button
            $disabled={!supportedFeatures.haptic}
            onClick={() => hapticFeedback('impact', 'heavy')}
          >
            Сильная вибрация
          </Button>

          <Button
            $disabled={!supportedFeatures.haptic}
            onClick={() => hapticFeedback('notification', 'medium')}
          >
            Уведомление
          </Button>

          <Button
            $disabled={!supportedFeatures.openLink}
            onClick={() => openExternalLink('https://max.ru')}
          >
            Открыть ссылку
          </Button>

          <Button $disabled={!supportedFeatures.haptic} onClick={() => hapticFeedback('selection')}>
            Изменить выбор
          </Button>
        </ActionsGrid>
      </Section>
    </Container>
  );
};
