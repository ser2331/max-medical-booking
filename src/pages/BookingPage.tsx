import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store/redux-hooks.ts';

import { PageLayout } from '@/components/layout/PageLayout.tsx';
import { MicroFrontend } from '@/components/widget/MicroFrontend.tsx';
import { ErrorMessage } from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';

export const BookingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sessionId, error, isLoading } = useAppSelector(state => state.auth);

  const handleBack = () => navigate(-1);

  if (error) {
    return (
      <PageLayout title={t('error')} onBack={handleBack}>
        <ErrorMessage>
          {t('widget.authError')}: {error}
        </ErrorMessage>
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
    <PageLayout title={t('widget.title')} onBack={handleBack}>
      <MicroFrontend />
    </PageLayout>
  );
};
