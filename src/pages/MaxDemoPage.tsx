import React from 'react';
import { PageLayout } from '../components/layout/PageLayout.tsx';
import { useNavigate } from 'react-router-dom';
import { MaxDemo } from '../components/MaxDemo.tsx';

export const MaxDemoPage: React.FC = () => {
  const navigate = useNavigate();


  return (
    <PageLayout
      title={'MaxDemoPage Information'}
      onBack={() => navigate(-1)}
    >
      <MaxDemo />
    </PageLayout>
  );
};
