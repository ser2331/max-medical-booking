import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEsiaDemo } from '@/hooks/useEsiaDemo';
import { Link } from 'react-router-dom';
import { AppSpin } from '@/components/ui/AppSpin.tsx';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 8px;
  font-size: 28px;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 32px;
`;

const UserInfoCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
  text-align: left;
`;

const UserField = styled.div`
  margin: 12px 0;
  display: flex;
  justify-content: space-between;

  strong {
    color: #333;
    min-width: 120px;
  }

  span {
    color: #666;
    text-align: right;
    flex: 1;
    margin-left: 16px;
  }
`;

const Button = styled.button`
  background: #2d5bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const LogoutButton = styled(Button)`
  background: #dc3545;
  margin-top: 16px;
`;

const ErrorMessage = styled.div`
  background: #fee;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  color: #721c24;
`;

export const EsiaAuthContainer: React.FC = () => {
  const { isLoading, error, userInfo, initiateAuth, logout, restoreSession } = useEsiaDemo();
  const [data, setData] = useState('');

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const handleAuth = async () => {
    await initiateAuth();
  };

  const formatUserData = (user: any) => {
    const fields = [
      { label: 'ФИО', value: `${user.lastName} ${user.firstName} ${user.middleName || ''}`.trim() },
      { label: 'ID', value: user.sub },
      { label: 'Дата рождения', value: user.birthDate },
      { label: 'Email', value: user.email || 'Не указан' },
      { label: 'Телефон', value: user.mobile || 'Не указан' },
    ];

    return fields.filter(field => field.value);
  };

  const getApi = () => {
    fetch('https://r78-dev.zdrav.netrika.ru/tm-widgets/api/_version', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setData(data);
      });
  };

  return (
    <Container>
      <Card>
        <Title>Авторизация через ЕСИА</Title>
        <Subtitle>Войдите с помощью учетной записи ЕСИА</Subtitle>
        <Link to={'https://esia-portal1.test.gosuslugi.ru/login/'}>REDIRECT</Link>
        <Button onClick={getApi}>GET DATA</Button>
        <pre>DATA: {JSON.stringify(data).toString() || null}</pre>

        {error && (
          <ErrorMessage>
            <strong>Ошибка:</strong> {error}
          </ErrorMessage>
        )}

        {!userInfo ? (
          <Button onClick={handleAuth} disabled={isLoading}>
            {isLoading ? (
              <>
                <AppSpin />
                Перенаправление...
              </>
            ) : (
              'Войти через ЕСИА'
            )}
          </Button>
        ) : (
          <div>
            <UserInfoCard>
              <h3 style={{ marginTop: 0, textAlign: 'center' }}>✅ Успешная авторизация</h3>
              {formatUserData(userInfo).map((field, index) => (
                <UserField key={index}>
                  <strong>{field.label}:</strong>
                  <span>{field.value}</span>
                </UserField>
              ))}
            </UserInfoCard>

            <LogoutButton onClick={logout}>Выйти из системы</LogoutButton>
          </div>
        )}
      </Card>
    </Container>
  );
};
