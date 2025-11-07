import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { PageHeader } from './PageHeader';
import { PageFooter } from './PageFooter';
import { theme } from '../../styles/theme';
import { useTranslation } from 'react-i18next';

// Styled components с правильной типизацией
const LayoutContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    /* Адаптив для очень маленьких экранов */
    @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
        height: 100dvh;
    }
`;

const ContentArea = styled.div`
    flex: 1;
    overflow: auto;
    padding: 0 ${(props) => props.theme.spacing.md};

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        padding: 0 ${(props) => props.theme.spacing.sm};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
        padding: 0 ${(props) => props.theme.spacing.xs};
    }
`;

const ContentWrapper = styled.div`
    height: 100%;
    padding: ${(props) => props.theme.spacing.md} 0;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        padding: ${(props) => props.theme.spacing.sm} 0;
    }
`;

const LanguageSwitcher = styled.button`
    background: transparent;
    border: 1px solid ${(props) => props.theme.colors.border.secondary};
    border-radius: ${(props) => props.theme.borderRadius.small};
    padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: ${(props) => props.theme.colors.secondary};
        border-color: ${(props) => props.theme.colors.border.primary};
    }

    &:active {
        transform: scale(0.95);
    }

    @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
        font-size: 11px;
        padding: 6px 8px;
    }
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
                                                        showLanguageSwitcher = true,
                                                        onBack,
                                                        onClose,
                                                        submitButton,
                                                        backButton,
                                                      }) => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const isRussian = currentLanguage === 'ru';

  const toggleLanguage = () => {
    const newLanguage = isRussian ? 'en' : 'ru';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <ThemeProvider theme={theme}>
      <LayoutContainer>
        <PageHeader
          title={title}
          showBackButton={showBackButton}
          showCloseButton={showCloseButton}
          showLanguageSwitcher={showLanguageSwitcher}
          onBack={onBack}
          onClose={onClose}
          languageSwitcher={
            showLanguageSwitcher ? (
              <LanguageSwitcher
                onClick={toggleLanguage}
                title={isRussian ? 'Switch to English' : 'Переключить на русский'}
              >
                {isRussian ? 'EN' : 'RU'}
              </LanguageSwitcher>
            ) : undefined
          }
        />

        <ContentArea className={'body'}>
          <ContentWrapper>{children}</ContentWrapper>
        </ContentArea>

        {(submitButton || backButton) && (
          <PageFooter submitButton={submitButton} backButton={backButton} />
        )}
      </LayoutContainer>
    </ThemeProvider>
  );
};
