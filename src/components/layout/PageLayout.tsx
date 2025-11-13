import React from 'react';
import styled from 'styled-components';
import { PageHeader } from './PageHeader/PageHeader.tsx';
import { PageFooter } from './PageFooter';

const LayoutContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ContentArea = styled.main`
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  -webkit-overflow-scrolling: touch;
  /* Убираем bounce эффект на iOS */
  overscroll-behavior: contain;
`;

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  showLanguageSwitcher?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  submitButton?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'accent' | 'outline';
  };
  backButton?: {
    text: string;
    onClick: () => void;
    variant?: 'outline' | 'secondary';
  };
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  showBackButton = true,
  showCloseButton = true,
  onBack,
  onClose,
  submitButton,
  backButton,
}) => {
  return (
    <LayoutContainer>
      <PageHeader
        title={title}
        showBackButton={showBackButton}
        showCloseButton={showCloseButton}
        onBack={onBack}
        onClose={onClose}
      />

      <ContentArea className={'body'}>
        <ContentWrapper>{children}</ContentWrapper>
      </ContentArea>

      {(submitButton || backButton) && (
        <PageFooter submitButton={submitButton} backButton={backButton} />
      )}
    </LayoutContainer>
  );
};
