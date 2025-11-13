import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout.tsx';
import { Home } from '@/components/home/home.tsx';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('booking.title')} showBackButton={false}>
      <Home />
    </PageLayout>
  );
};
