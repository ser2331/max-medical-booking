import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

import { NotFoundPage } from '../pages/NotFoundPage';
import { DebugPage } from '../pages/DebugPage.tsx';
import { MaxDemoPage } from '../pages/MaxDemoPage.tsx';

import { BookingPage } from '../pages/BookingPage.tsx';
import { EsiaAuthPage } from '@/pages/EsiaAuthPage.tsx';
import { DoctorAppointmentMakePage } from '@/pages/DoctorAppointmentMake.tsx';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Widget записи */}
      <Route path="/booking" element={<BookingPage />} />
      {/*Steps demo*/}
      <Route path="/doctor-appointment-make" element={<DoctorAppointmentMakePage />} />
      {/*ESSIA*/}
      <Route path="/auth" element={<EsiaAuthPage />} />

      {/* DEBUG */}
      <Route path="/debug" element={<DebugPage />} />
      <Route path="/maxDemo" element={<MaxDemoPage />} />

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
