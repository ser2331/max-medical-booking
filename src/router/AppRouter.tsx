import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { PatientSelectPage } from '../pages/booking/PatientSelectPage';
import { InstitutionSelectPage } from '../pages/booking/InstitutionSelectPage';
import {
  SpecializationSelectPage,
} from '../pages/booking/SpecializationSelectPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { DebugPage } from '../pages/DebugPage.tsx';
import { MaxDemo } from '../components/MaxDemo.tsx';
import { DoctorSelectPage } from '../pages/booking/DoctorSelectPage.tsx';
import { TimeSelectPage } from '../pages/booking/TimeSelectPage.tsx';
import { PatientAddPage } from '../pages/booking/PatientAddPage.tsx';
import {
  AppointmentConfirmPage,
} from '../pages/booking/AppointmentConfirmPage.tsx';
import {
  AppointmentSuccessPage,
} from '../pages/booking/AppointmentSuccessPage.tsx';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* DEBUG */}
      <Route path="/debug" element={<DebugPage />} />
      <Route path="/maxDemo" element={<MaxDemo />} />

      {/* Сценарий 1: Запись себя */}
      <Route path="/booking" element={<PatientSelectPage />} />
      <Route path="/booking/institution-select"
             element={<InstitutionSelectPage />} />
      <Route path="/booking/specialization-select"
             element={<SpecializationSelectPage />} />
      <Route path="/booking/doctor-select" element={<DoctorSelectPage />} />
      <Route path="/booking/time-select" element={<TimeSelectPage />} />
      <Route path="/booking/confirm" element={<AppointmentConfirmPage />} />
      <Route path="/booking/success" element={<AppointmentSuccessPage />} />

      {/* Сценарий 2: Запись другого пациента */}
      <Route path="/booking/patient-add" element={<PatientAddPage />} />

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
