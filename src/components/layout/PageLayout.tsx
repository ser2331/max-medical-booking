import React from 'react';
import styled from 'styled-components';

import { PageHeader } from './PageHeader/PageHeader.tsx';
import { PageFooter } from './PageFooter';

const LayoutContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
`;

const ContentArea = styled.main`
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md};
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

      <ContentArea className={'body'}>{children}</ContentArea>

      {(submitButton || backButton) && (
        <PageFooter submitButton={submitButton} backButton={backButton} />
      )}
    </LayoutContainer>
  );
};
