import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { SelectingRecordingScenarioPage } from '@/pages/SelectingRecordingScenarioPage.tsx';
import { AgreementPage } from '@/pages/AgreementPage.tsx';

import { NotFoundPage } from '../pages/NotFoundPage';
import { DebugPage } from '../pages/DebugPage.tsx';
import { MaxDemoPage } from '../pages/MaxDemoPage.tsx';

import { TelemedicineServicesPage } from '../pages/TelemedicineServicesPage.tsx';
import { EsiaAuthPage } from '@/pages/EsiaAuthPage.tsx';

import { PersonalBookingPage } from '@/pages/PersonalBookingPage.tsx';
import { AnotherBookingPage } from '@/pages/AnotherBookingPage.tsx';
import { useAppSelector } from '@/store/redux-hooks.ts';

// Компонент для защищенных маршрутов (требует авторизации И согласия)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, hasAgreements } = useAppSelector(state => state.auth);

  // Если не авторизован - редирект на страницу авторизации
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Если авторизован, но не принял соглашение - редирект на страницу соглашения
  if (!hasAgreements) {
    return <Navigate to="/agreement" replace />;
  }

  // Если все проверки пройдены - показываем запрашиваемую страницу
  return <>{children}</>;
};

// Компонент только для страницы авторизации (доступен только НЕавторизованным)
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, hasAgreements } = useAppSelector(state => state.auth);

  // Если пользователь уже авторизован и принял соглашение - редирект на главную
  if (isAuthenticated && hasAgreements) {
    return <Navigate to="/" replace />;
  }

  // Если авторизован, но не принял соглашение - редирект на соглашение
  if (isAuthenticated && !hasAgreements) {
    return <Navigate to="/agreement" replace />;
  }

  // Если не авторизован - показываем страницу авторизации
  return <>{children}</>;
};

// Компонент только для страницы соглашения (доступен только АВТОРИЗОВАННЫМ без согласия)
const AgreementRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, hasAgreements } = useAppSelector(state => state.auth);

  // Если не авторизован - редирект на авторизацию
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Если уже есть согласие - редирект на главную
  if (hasAgreements) {
    return <Navigate to="/" replace />;
  }

  // Если авторизован, но без согласия - показываем страницу соглашения
  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Страница авторизации - только для НЕавторизованных */}
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <EsiaAuthPage />
          </AuthRoute>
        }
      />

      {/* Страница соглашения - только для АВТОРИЗОВАННЫХ без согласия */}
      <Route
        path="/agreement"
        element={
          <AgreementRoute>
            <AgreementPage />
          </AgreementRoute>
        }
      />

      {/* Защищенные маршруты (требуют авторизации И согласия) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/selecting-recording-scenario"
        element={
          <ProtectedRoute>
            <SelectingRecordingScenarioPage />
          </ProtectedRoute>
        }
      />

      {/* запись */}
      <Route
        path="/personal-booking"
        element={
          <ProtectedRoute>
            <PersonalBookingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/another-booking"
        element={
          <ProtectedRoute>
            <AnotherBookingPage />
          </ProtectedRoute>
        }
      />

      {/* Widget записи */}
      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <TelemedicineServicesPage />
          </ProtectedRoute>
        }
      />

      {/* DEBUG маршруты (можно оставить публичными или тоже защитить) */}
      <Route path="/debug" element={<DebugPage />} />
      <Route path="/maxDemo" element={<MaxDemoPage />} />

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
