import React from 'react';
import styled from 'styled-components';

import { PageHeader } from './PageHeader/PageHeader.tsx';
const LayoutContainer = styled.div<{ $isWidget: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: ${props => (props.$isWidget ? 0 : props.theme.spacing.md)};
`;

const ScrollableContent = styled.div<{ $main: boolean; $isWidget: boolean }>`
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${props => (props.$isWidget ? 0 : props.theme.spacing.md)};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props =>
    props.$isWidget
      ? 'none'
      : `${props.theme.shadows.small}, ${props.theme.shadows.medium}, ${props.theme.shadows.large}, ${props.theme.shadows.xlarge}`};

  main {
    padding: ${props => (props.$isWidget ? props.theme.spacing.md : 0)};
  }
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
  isWidget?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  headerComponent,
  showBackButton = true,
  showCloseButton = true,
  onBack,
  onClose,
  isWidget,
}) => {
  return (
    <LayoutContainer $isWidget={!!isWidget}>
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

      <ScrollableContent $isWidget={!!isWidget} $main={!title}>
        {children}
      </ScrollableContent>
    </LayoutContainer>
  );
};
