import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { StepperDemo } from '../components/stepper/StepperDemo';

export const StepperDemoPage: React.FC = () => {
  return (
    <PageLayout title="Запись на прием">
      <StepperDemo />
    </PageLayout>
  );
};
