import React from 'react';
import styled from 'styled-components';
import { CompactButton, ContentFlex } from '../ui/StyledComponents.tsx';

const FooterContainer = styled.footer`
    flex-shrink: 0;
    padding: ${(props) => props.theme.spacing.md};
    border-top: 1px solid ${(props) => props.theme.colors.border.secondary};

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        padding: ${(props) => props.theme.spacing.sm};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
        padding: 12px ${(props) => props.theme.spacing.xs};
    }
`;

const FooterButton = styled(CompactButton)<{ variant?: string }>`
    flex: 1;

    @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
        font-size: 14px;
        padding: 10px 12px;
    }
`;

interface PageFooterProps {
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

export const PageFooter: React.FC<PageFooterProps> = ({
                                                        submitButton,
                                                        backButton,
                                                      }) => {
  return (
    <FooterContainer>
      <ContentFlex>
        {backButton && (
          <FooterButton onClick={backButton.onClick}
                        variant={backButton.variant || 'outline'}>
            {backButton.text}
          </FooterButton>
        )}

        {submitButton && (
          <FooterButton
            onClick={submitButton.onClick}
            disabled={submitButton.disabled}
            variant={submitButton.variant || 'accent'}
          >
            {submitButton.text}
          </FooterButton>
        )}
      </ContentFlex>
    </FooterContainer>
  );
};
