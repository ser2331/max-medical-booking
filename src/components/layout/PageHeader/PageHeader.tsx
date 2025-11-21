import React from 'react';
import styled from 'styled-components';

import { useMaxBridgeContext } from '@/providers/MaxBridgeProvider.tsx';

import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { Card } from '@/components/ui/Cart.tsx';
import { BackArrowIcon } from '@/assets/icons/BackArrowIcon.tsx';
import { useAppDispatch } from '@/store/redux-hooks.ts';
import { onChangeBookingType, onChangeStep } from '@/store/slices/stepperSlice.ts';

const HeaderContainer = styled.header`
  width: calc(100% - 32px);
  position: fixed;
  margin: 0 16px;
  top: 0;
  z-index: 99;
  opacity: 1;
`;

const HeaderFlex = styled(Card)`
  display: flex;
  gap: ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 8px;
  }
`;

const HeaderTitle = styled('h1')`
  text-align: center;
  width: 100%;
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.black};
  line-height: ${props => props.theme.typography.fontSize.xxl};
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
  const dispatch = useAppDispatch();
  const { hapticFeedback } = useMaxBridgeContext();
  // const settingsModal = useModal();

  const handleBack = () => {
    hapticFeedback('impact', 'light');
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }

    dispatch(onChangeStep(0));
    dispatch(onChangeBookingType(''));
  };

  return (
    <HeaderContainer className="header">
      <HeaderFlex>
        {/* Левая часть */}
        <HeaderActions>
          {showBackButton ? (
            <CustomButton variant={'outline-default'} size={'small'} onClick={handleBack}>
              <BackArrowIcon />
            </CustomButton>
          ) : (
            <Spacer $width="48px" />
          )}
        </HeaderActions>

        {/* Заголовок */}
        <HeaderTitle>{title}</HeaderTitle>

        <div style={{ width: '10px' }} />

        {/* Правая часть */}
        {/*<HeaderActions>*/}
        {/*  <IconButton onClick={handleSettingsClick}>*/}
        {/*    <GearIcon size={24} />*/}
        {/*  </IconButton>*/}
        {/*</HeaderActions>*/}

        {/* Модальное окно настроек */}
        {/*<SettingsModal isOpen={settingsModal.isOpen} onClose={settingsModal.close} />*/}
      </HeaderFlex>
    </HeaderContainer>
  );
};
