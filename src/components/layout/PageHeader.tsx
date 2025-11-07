import React from 'react';
import styled from 'styled-components';
import { Button, Flex, Typography } from '@maxhub/max-ui';
import { useMaxBridgeContext } from '../../providers/MaxBridgeProvider';
import { useTheme } from '../../providers/ThemeContext.tsx';

// Styled Components для PageHeader
const HeaderContainer = styled.header`
    flex-shrink: 0;
    padding: ${(props) => props.theme.spacing.md};
    background: var(--color-background-primary);
    border-bottom: 1px solid ${(props) => props.theme.colors.border.secondary};
    position: relative;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        padding: ${(props) => props.theme.spacing.sm};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding: 12px ${(props) => props.theme.spacing.xs};
    }
`;

const HeaderFlex = styled(Flex)`
    gap: ${(props) => props.theme.spacing.sm};

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
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

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        font-size: 18px;
    }
`;

const HeaderButton = styled(Button)`
    min-width: auto;
    padding: 8px 12px;
    flex-shrink: 0;
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding: 6px 10px;
        font-size: 14px;
    }
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
`;

const Spacer = styled.div<{ $width?: string }>`
    width: ${(props) => props.$width || '48px'};
    flex-shrink: 0;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        width: ${(props) => (props.$width ? '40px' : '40px')};
    }
`;


const ThemeToggleButton = styled.button`
    background: transparent;
    border: 1px solid ${(props) => props.theme.colors.border.secondary};
    border-radius: ${(props) => props.theme.borderRadius.small};
    padding: ${(props) => props.theme.spacing.xs};
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;

    &:hover {
        background: ${(props) => props.theme.colors.secondary};
        border-color: ${(props) => props.theme.colors.border.primary};
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
        width: 28px;
        height: 28px;
        font-size: 12px;
    }
`;

// Интерфейсы
interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  showLanguageSwitcher?: boolean;
  showThemeToggle?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  onThemeToggle?: () => void;
  languageSwitcher?: React.ReactNode;
  themeToggle?: React.ReactNode;
}

// Компонент PageHeader
export const PageHeader: React.FC<PageHeaderProps> = ({
                                                        title,
                                                        showBackButton = true,
                                                        showThemeToggle = true,
                                                        onBack,
                                                        languageSwitcher,
                                                      }) => {
  const { hapticFeedback/*, closeApp*/ } = useMaxBridgeContext();
  const { toggleColorScheme } = useTheme();
  const handleBack = () => {
    hapticFeedback('impact', { style: 'light' });
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  // const handleClose = () => {
  //   hapticFeedback('impact', { style: 'light' });
  //   if (onClose) {
  //     onClose();
  //   } else {
  //     closeApp();
  //   }
  // };

  const handleThemeToggle = () => {
    toggleColorScheme();
  };

  return (
    <HeaderContainer className="header">
      <HeaderFlex align={'center'} justify={'space-between'}>
        {/* Левая часть */}
        <HeaderActions>
          {showBackButton ? (
            <HeaderButton onClick={handleBack}>←</HeaderButton>
          ) : languageSwitcher ? (
            languageSwitcher
          ) : (
            <Spacer $width="48px" />
          )}
        </HeaderActions>

        {/* Заголовок */}
        <HeaderTitle>{title}</HeaderTitle>

        {/* Правая часть */}
        <HeaderActions>
          {showThemeToggle && (
            <ThemeToggleButton
              onClick={handleThemeToggle}
              title="Сменить тему"
            >
              🌓
            </ThemeToggleButton>
          )}

          {languageSwitcher && showBackButton && languageSwitcher}

          {/*{showCloseButton ? (*/}
          {/*  <HeaderButton onClick={handleClose}>✕</HeaderButton>*/}
          {/*) : languageSwitcher && !showBackButton ? (*/}
          {/*  languageSwitcher*/}
          {/*) : (*/}
          {/*  <Spacer $width="48px" />*/}
          {/*)}*/}
        </HeaderActions>
      </HeaderFlex>
    </HeaderContainer>
  );
};
