import React from 'react';
import styled from 'styled-components';

import { PageHeader } from './PageHeader/PageHeader.tsx';
import { PageFooter } from './PageFooter';
const LayoutContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

const ScrollableContent = styled.div<{ $main: boolean }>`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${props =>
    props.$main ? props.theme.spacing.md : `72px ${props.theme.spacing.md} 126px`};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${props => props.theme.spacing.md};
`;

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
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
      {!!title && (
        <PageHeader
          title={title}
          showBackButton={showBackButton}
          showCloseButton={showCloseButton}
          onBack={onBack}
          onClose={onClose}
        />
      )}
      <ScrollableContent $main={!title}>
        {children}

        {(submitButton || backButton) && (
          <PageFooter submitButton={submitButton} backButton={backButton} />
        )}
      </ScrollableContent>
    </LayoutContainer>
  );
};
