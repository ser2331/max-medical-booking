import React, { useEffect } from 'react';
import { useMaxBridgeContext } from '../providers/MaxBridgeProvider';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const UserInfo = styled.div`
  background: #e8f5e8;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;

  h2 {
    margin: 0 0 8px 0;
    color: #155724;
  }

  p {
    margin: 4px 0;
    color: #0f5132;
  }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button<{ $disabled?: boolean }>`
  background: ${props => (props.$disabled ? '#6c757d' : '#007bff')};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 14px;
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s;

  &:hover {
    background: ${props => (props.$disabled ? '#6c757d' : '#0056b3')};
  }

  &:active {
    transform: ${props => (props.$disabled ? 'none' : 'translateY(1px)')};
  }
`;

const WarningMessage = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 16px;
  text-align: center;

  h1 {
    margin: 0 0 8px 0;
    color: #856404;
    font-size: 18px;
  }

  p {
    margin: 0;
    color: #856404;
  }
`;

const FeatureStatus = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;

  h3 {
    margin: 0 0 8px 0;
    color: #495057;
  }
`;

const FeatureItem = styled.div<{ $supported: boolean }>`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
  padding: 4px 0;

  .feature-name {
    color: #495057;
  }

  .feature-status {
    font-weight: 600;
    color: ${props => (props.$supported ? '#28a745' : '#dc3545')};
  }
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
      });
    }

    return () => {
      if (isMaxApp) {
        showBackButton(false);
      }
    };
  }, [isMaxApp, showBackButton, onBackButtonClick]);

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
      <h1>Демо MAX Bridge</h1>

      <FeatureStatus>
        <h3>Поддерживаемые функции:</h3>
        <FeatureItem $supported={supportedFeatures.backButton}>
          <span className="feature-name">Кнопка "Назад":</span>
          <span className="feature-status">
            {supportedFeatures.backButton ? '✓ Работает' : '✗ Не поддерживается'}
          </span>
        </FeatureItem>
        <FeatureItem $supported={supportedFeatures.openLink}>
          <span className="feature-name">Открытие ссылок:</span>
          <span className="feature-status">
            {supportedFeatures.openLink ? '✓ Работает' : '✗ Не поддерживается'}
          </span>
        </FeatureItem>
        <FeatureItem $supported={supportedFeatures.haptic}>
          <span className="feature-name">Тактильная обратная связь:</span>
          <span className="feature-status">
            {supportedFeatures.haptic ? '✓ Работает' : '✗ Не поддерживается'}
          </span>
        </FeatureItem>
        <FeatureItem $supported={supportedFeatures.requestContact}>
          <span className="feature-name">Запрос контакта:</span>
          <span className="feature-status">
            {supportedFeatures.requestContact ? '✓ Работает' : '✗ Не поддерживается'}
          </span>
        </FeatureItem>
      </FeatureStatus>

      {user && (
        <UserInfo>
          <h2>Привет, {user.first_name}!</h2>
          <p>ID: {user.id}</p>
          <p>Язык: {user.language_code || 'не указан'}</p>
        </UserInfo>
      )}

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
          onClick={() => hapticFeedback('notification')}
        >
          Уведомление
        </Button>

        <Button onClick={() => openExternalLink('https://example.com')}>Открыть ссылку</Button>

        <Button $disabled={!supportedFeatures.haptic} onClick={() => hapticFeedback('selection')}>
          Изменить выбор
        </Button>
      </ActionsGrid>
    </Container>
  );
};
