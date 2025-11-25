import React from 'react';
import styled from 'styled-components';

import { PageHeader } from './PageHeader/PageHeader.tsx';
const LayoutContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.md};
`;

const ScrollableContent = styled.div<{ $main: boolean }>`
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.large};
`;

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  headerComponent?: React.ReactNode;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  showLanguageSwitcher?: boolean;
  onBack?: () => void;
  onClose?: () => void;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  headerComponent,
  showBackButton = true,
  showCloseButton = true,
  onBack,
  onClose,
}) => {
  return (
    <LayoutContainer>
      {!!title && (
        <PageHeader
          title={title}
          headerComponent={headerComponent}
          showBackButton={showBackButton}
          showCloseButton={showCloseButton}
          onBack={onBack}
          onClose={onClose}
        />
      )}
      <ScrollableContent $main={!title}>{children}</ScrollableContent>
    </LayoutContainer>
  );
};
