import { useCallback, useState } from 'react';

export interface EsiaUser {
  sub: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: string;
  gender?: 'M' | 'F';
  email?: string;
  mobile?: string;
  snils?: string;
  inn?: string;
}

export const useEsiaDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<EsiaUser | null>(null);

  const initiateAuth = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Имитация процесса авторизации ЕСИА
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Случайные демо-данные
      const demoUsers: EsiaUser[] = [
        {
          sub: '100012345678',
          firstName: 'Иван',
          lastName: 'Иванов',
          middleName: 'Иванович',
          birthDate: '1990-05-15',
          gender: 'M',
          email: 'ivanov@example.com',
          mobile: '+79991234567',
          snils: '123-456-789 00',
          inn: '123456789012',
        },
        {
          sub: '100098765432',
          firstName: 'Мария',
          lastName: 'Петрова',
          middleName: 'Сергеевна',
          birthDate: '1985-12-20',
          gender: 'F',
          email: 'petrova@example.com',
          mobile: '+79997654321',
          snils: '987-654-321 00',
          inn: '987654321098',
        },
        {
          sub: '100055566677',
          firstName: 'Алексей',
          lastName: 'Сидоров',
          birthDate: '1978-03-10',
          gender: 'M',
          email: 'sidorov@example.com',
          mobile: '+79995556677',
          snils: '555-666-777 00',
          inn: '555666777888',
        },
      ];

      const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
      setUserInfo(randomUser);

      // Сохраняем в localStorage для имитации сессии
      localStorage.setItem('esia_demo_user', JSON.stringify(randomUser));
      localStorage.setItem('esia_demo_auth', 'true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка демо-авторизации');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUserInfo(null);
    localStorage.removeItem('esia_demo_user');
    localStorage.removeItem('esia_demo_auth');
  }, []);

  // Восстановление сессии при загрузке
  const restoreSession = useCallback(() => {
    const savedUser = localStorage.getItem('esia_demo_user');
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

  return {
    isLoading,
    error,
    userInfo,
    initiateAuth,
    logout,
    restoreSession,
    isDemo: true,
  };
};
