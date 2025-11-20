import React from 'react';

import { PageLayout } from '@/components/layout/PageLayout.tsx';
import { Home } from '@/components/home/home.tsx';

export const HomePage: React.FC = () => {
  return (
    <PageLayout>
      <Home />
    </PageLayout>
  );
};
