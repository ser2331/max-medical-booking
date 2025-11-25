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
import { BookingPage } from '@/pages/BookingPage.tsx';

import { PersonalBookingPage } from '@/pages/PersonalBookingPage.tsx';
import { AnotherBookingPage } from '@/pages/AnotherBookingPage.tsx';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/*Страница согласий*/}
      <Route path="/agreement" element={<AgreementPage />} />
      {/*Домашняя страница*/}
      <Route path="/" element={<HomePage />} />
      <Route path="/selecting-recording-scenario" element={<SelectingRecordingScenarioPage />} />

      {/* запись */}
      <Route path="/personal-booking" element={<PersonalBookingPage />} />
      <Route path="/another-booking" element={<AnotherBookingPage />} />

      {/* Widget записи */}
      <Route path="/booking" element={<TelemedicineServicesPage />} />
      {/*Steps demo*/}
      <Route path="/doctor-appointment-make" element={<BookingPage />} />
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
