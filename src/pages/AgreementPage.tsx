import React from 'react';

import { PageLayout } from '@/components/layout/PageLayout.tsx';
import { Agreement } from '@/components/Agreement/Agreement.tsx';

export const AgreementPage: React.FC = () => {
  return (
    <PageLayout>
      <Agreement />
    </PageLayout>
  );
};
