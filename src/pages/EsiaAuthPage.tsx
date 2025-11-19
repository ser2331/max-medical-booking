import React from 'react';
import { EsiaAuth } from '@/components/esia/EsiaAuth.tsx';
import { PageLayout } from '@/components/layout/PageLayout.tsx';
import { useNavigate } from 'react-router-dom';

export const EsiaAuthPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout title={'MaxDemoPage Information'} onBack={() => navigate(-1)}>
      <EsiaAuth />
    </PageLayout>
  );
};
