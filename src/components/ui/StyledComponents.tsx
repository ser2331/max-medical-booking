import styled from 'styled-components';
import { Button, Flex, Panel, Spinner } from '@maxhub/max-ui';
import { media, responsive } from '@/styles/mixins.ts';

export const StyledPanel = styled(Panel)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.2s ease;

  ${media.hover} {
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const ContentFlex = styled(Flex)`
  height: 100%;
  ${responsive.gap}
`;
// Кнопки - расширяем MAX UI Button
export const CompactButton = styled(Button)`
  && {
    min-width: auto;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    flex-shrink: 0;

    ${media.md} {
      padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
      font-size: 14px;
    }

    ${media.xs} {
      padding: 6px 10px;
      font-size: 13px;
      min-height: 32px;
    }
  }
`;

export const LoadingSpinner = styled(Spinner)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20px;
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  gap: ${props => props.theme.spacing.md};
  text-align: center;
  min-height: 200px;
  width: 100%;
`;
