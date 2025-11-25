import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store/redux-hooks.ts';

import { PageLayout } from '@/components/layout/PageLayout.tsx';
import { MicroFrontend } from '@/components/TelemedicineServices/MicroFrontend.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage.tsx';

export const TelemedicineServicesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sessionId, error, isLoading } = useAppSelector(state => state.auth);

  const handleBack = () => navigate(-1);

  if (error) {
    return (
      <PageLayout title={t('error')} onBack={handleBack}>
        <ErrorMessage>Телемедицинские услуги: {error}</ErrorMessage>
      </PageLayout>
    );
  }

  if (isLoading || !sessionId) {
    return (
      <PageLayout title={t('loading')} onBack={handleBack}>
        <AppSpin />
      </PageLayout>
    );
  }

  return (
    <PageLayout title={'Телемедицинские услуги'} onBack={handleBack}>
      <MicroFrontend />
    </PageLayout>
  );
};
