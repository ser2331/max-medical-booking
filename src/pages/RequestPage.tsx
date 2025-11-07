// pages/RequestPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { RootState } from '@/store';
import { PageLayout } from '@/components/layout/PageLayout.tsx';
import MicroFrontend from '@/components/widget/MicroFrontend.tsx';
import {
  ErrorMessage,
  LoadingSpinner,
} from '@/components/ui/StyledComponents.tsx';

// Styled Components
const WidgetContainer = styled.div`
    width: 100%;
    height: calc(100vh - 120px);
    position: relative;
`;

export const RequestPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    sessionId,
    error,
    isLoading,
  } = useSelector((state: RootState) => state.auth);

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
        <LoadingSpinner>
          {t('widget.initializing')}
        </LoadingSpinner>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={t('widget.title')} onBack={handleBack}>
      <WidgetContainer>
        <MicroFrontend />
      </WidgetContainer>
    </PageLayout>
  );
};