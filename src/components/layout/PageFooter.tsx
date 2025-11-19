import React from 'react';
import styled from 'styled-components';

import { Flex } from '../ui/StyledComponents.tsx';
import { CustomButton } from '@/components/ui/Button/Button.tsx';

const FooterContainer = styled.footer`
  flex-shrink: 0;
  padding: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.black};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.sm};
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 12px ${props => props.theme.spacing.xs};
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

export const PageFooter: React.FC<PageFooterProps> = ({ submitButton, backButton }) => {
  return (
    <FooterContainer>
      <Flex>
        {backButton && <CustomButton onClick={backButton.onClick}>{backButton.text}</CustomButton>}

        {submitButton && (
          <CustomButton onClick={submitButton.onClick} disabled={submitButton.disabled}>
            {submitButton.text}
          </CustomButton>
        )}
      </Flex>
    </FooterContainer>
  );
};
