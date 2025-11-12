import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

import { NotFoundPage } from '../pages/NotFoundPage';
import { DebugPage } from '../pages/DebugPage.tsx';
import { MaxDemoPage } from '../pages/MaxDemoPage.tsx';

import { BookingPage } from '../pages/BookingPage.tsx';
import { EsiaAuthPage } from '@/pages/EsiaAuthPage.tsx';
import { StepperDemoPage } from '@/pages/StepperDemoPage.tsx';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* DEBUG */}
      <Route path="/debug" element={<DebugPage />} />
      <Route path="/maxDemo" element={<MaxDemoPage />} />
      {/* Widget записи */}
      <Route path="/booking" element={<BookingPage />} />
      //ЕСИА
      <Route path="/auth" element={<EsiaAuthPage />} />
      {/*Steps demo*/}
      <Route path="/stepper" element={<StepperDemoPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
