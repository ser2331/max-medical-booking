import React from 'react';
import styled from 'styled-components';
import { Flex, Typography } from '@maxhub/max-ui';
import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';
import { CompactButton, IconButton } from '@/components/ui/StyledComponents.tsx';
import { GearIcon } from '@/assets/icons/gear/gear.tsx';
import { useModal } from '@/hooks/useModal.tsx';
import { SettingsModal } from './SettingsModal';

const HeaderContainer = styled.header`
  flex-shrink: 0;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background.primary};
  border-bottom: 1px solid ${props => props.theme.colors.border.secondary};
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.sm};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 12px ${props => props.theme.spacing.xs};
  }
`;

const HeaderFlex = styled(Flex)`
  gap: ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 8px;
  }
`;

const HeaderTitle = styled(Typography.Headline)`
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 18px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const Spacer = styled.div<{ $width?: string }>`
  width: ${props => props.$width || '48px'};
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: ${props => (props.$width ? '40px' : '40px')};
  }
`;

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  onBack?: () => void;
  onClose?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, showBackButton = true, onBack }) => {
  const { hapticFeedback } = useMaxBridgeContext();
  const settingsModal = useModal();

  const handleBack = () => {
    hapticFeedback('impact', 'light');
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleSettingsClick = () => {
    hapticFeedback('impact', 'light');
    settingsModal.open();
  };

  return (
    <HeaderContainer className="header">
      <HeaderFlex align={'center'} justify={'space-between'}>
        {/* Левая часть */}
        <HeaderActions>
          {showBackButton ? (
            <CompactButton onClick={handleBack}>←</CompactButton>
          ) : (
            <Spacer $width="48px" />
          )}
        </HeaderActions>

        {/* Заголовок */}
        <HeaderTitle>{title}</HeaderTitle>

        {/* Правая часть */}
        <HeaderActions>
          <IconButton onClick={handleSettingsClick}>
            <GearIcon size={24} />
          </IconButton>
        </HeaderActions>
      </HeaderFlex>

      {/* Модальное окно настроек */}
      <SettingsModal isOpen={settingsModal.isOpen} onClose={settingsModal.close} />
    </HeaderContainer>
  );
};
