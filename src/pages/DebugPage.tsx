import React from 'react';
import { useMaxBridgeContext } from '../providers/MaxBridgeProvider';
import { PageLayout } from '../components/layout/PageLayout';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DebugContainer = styled.div`
  padding: 20px;
  max-width: 100%;
  overflow-x: auto;
`;

const InfoSection = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  h3 {
    margin: 0 0 12px 0;
    color: #495057;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin: 8px 0;
    color: #6c757d;

    strong {
      color: #495057;
    }
  }

  pre {
    background: #fff;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 12px;
    margin: 8px 0 0 0;
    overflow-x: auto;
    font-size: 12px;
    line-height: 1.4;
  }
`;

const StatusBadge = styled.span<{ $isActive: boolean }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => (props.$isActive ? '#d4edda' : '#f8d7da')};
  color: ${props => (props.$isActive ? '#155724' : '#721c24')};
  margin-left: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  margin-bottom: 12px;
`;

export const DebugPage: React.FC = () => {
  const { isMaxApp, isReady, initData, user, getStartParam, parseStartParam, supportedFeatures } =
    useMaxBridgeContext();
  const navigate = useNavigate();

  const startParam = getStartParam();
  const parsedParams = parseStartParam();

  return (
    <PageLayout title="Информация о отладке" onBack={() => navigate(-1)}>
      <DebugContainer>
        <InfoSection>
          <h3>Окружение приложения</h3>
          <Grid>
            <p>
              <strong>MAX Bridge:</strong>
              <StatusBadge $isActive={isMaxApp}>{isMaxApp ? 'Доступен' : 'Недоступен'}</StatusBadge>
            </p>
            <p>
              <strong>Готовность:</strong>
              <StatusBadge $isActive={isReady}>{isReady ? 'Готов' : 'Не готов'}</StatusBadge>
            </p>
            <p>
              <strong>Платформа:</strong> {window.WebApp?.platform || 'Неизвестно'}
            </p>
            <p>
              <strong>Версия:</strong> {window.WebApp?.version || 'Неизвестно'}
            </p>
          </Grid>
        </InfoSection>

        {user && (
          <InfoSection>
            <h3>Данные пользователя</h3>
            <Grid>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Имя:</strong> {user.first_name}
              </p>
              <p>
                <strong>Фамилия:</strong> {user.last_name || 'Не указана'}
              </p>
              <p>
                <strong>Username:</strong> @{user.username || 'Не указан'}
              </p>
              <p>
                <strong>Язык:</strong> {user.language_code || 'Не указан'}
              </p>
            </Grid>
          </InfoSection>
        )}

        {initData && (
          <InfoSection>
            <h3>Данные инициализации</h3>
            <pre>{JSON.stringify(initData, null, 2)}</pre>
          </InfoSection>
        )}
        <InfoSection>
          <h3>Поддерживаемые функции</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '8px',
            }}
          >
            {Object.entries(supportedFeatures).map(([feature, isSupported]) => (
              <p key={feature}>
                <strong>{feature}:</strong>
                <StatusBadge $isActive={isSupported}>
                  {isSupported ? 'Поддерживается' : 'Не поддерживается'}
                </StatusBadge>
              </p>
            ))}
          </div>
        </InfoSection>
        <InfoSection>
          <h3>Стартовые параметры</h3>
          <p>
            <strong>Сырые данные:</strong> {startParam || 'Отсутствуют'}
          </p>
          {parsedParams && (
            <>
              <p>
                <strong>Распарсенные параметры:</strong>
              </p>
              <pre>{JSON.stringify(parsedParams, null, 2)}</pre>
            </>
          )}
        </InfoSection>

        <InfoSection>
          <h3>Системная информация</h3>
          <Grid>
            <p>
              <strong>User Agent:</strong> {navigator.userAgent}
            </p>
            <p>
              <strong>URL:</strong> {window.location.href}
            </p>
            <p>
              <strong>Разрешение:</strong> {window.screen.width}x{window.screen.height}
            </p>
            <p>
              <strong>Время загрузки:</strong> {new Date().toLocaleString()}
            </p>
          </Grid>
        </InfoSection>
      </DebugContainer>
    </PageLayout>
  );
};
