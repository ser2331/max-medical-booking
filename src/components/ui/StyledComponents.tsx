import styled from 'styled-components';
import { Button, Flex, Panel, Spinner } from '@maxhub/max-ui';
import { media, responsive } from '@/styles/mixins.ts';
import { Section } from '@/components/ui/CommonComponents.tsx';

export const StyledPanel = styled(Panel)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${props => props.theme.colors.background.primary};
`;

export const ContentFlex = styled(Flex)`
  height: 100%;
  background: ${props => props.theme.colors.background.primary};
  ${responsive.gap}
`;

export const CompactButton = styled(Button)<{ width?: number; height?: number }>`
  && {
    width: ${({ width }) => width || '32px'};
    height: ${({ height }) => height || '32px'};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    flex-shrink: 0;
    font-family: ${props => props.theme.typography.fontFamily.primary};
    font-size: ${props => props.theme.typography.fontSize.sm};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    border-radius: ${props => props.theme.components.button.borderRadius};
    transition: all 0.2s ease;

    /* Базовые стили для разных состояний */
    &:not(:disabled) {
      background: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.text.inverted};
      border: 1px solid ${props => props.theme.colors.primary};

      &:hover {
        background: ${props => props.theme.colors.primaryHover};
        border-color: ${props => props.theme.colors.primaryHover};
        transform: translateY(-1px);
        box-shadow: ${props => props.theme.shadows.small};
      }

      &:active {
        transform: translateY(0);
        box-shadow: none;
      }
    }

    &:disabled {
      background: ${props => props.theme.colors.background.tertiary};
      color: ${props => props.theme.colors.text.tertiary};
      border: 1px solid ${props => props.theme.colors.border.secondary};
      cursor: not-allowed;
    }

    /* Адаптивные стили */
    ${media.md} {
      padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
      font-size: ${props => props.theme.typography.fontSize.xs};
      border-radius: ${props => props.theme.borderRadius.small};
    }

    ${media.xs} {
      padding: 6px 10px;
      font-size: ${props => props.theme.typography.fontSize.xs};
      min-height: 32px;
      border-radius: ${props => props.theme.borderRadius.small};
    }
  }
`;
export const IconButton = styled(CompactButton)`
  && {
    padding: 0;
    background: none !important;
    border: none !important;
  }
`;

export const LoadingSpinner = styled(Spinner)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;

  /* Стилизация спиннера под текущую тему */
  svg {
    div {
      background: ${props => props.theme.colors.text.accent} !important;
    }
  }

  /* Разные размеры для адаптива */
  ${media.md} {
    width: 20px;
    height: 20px;
  }

  ${media.xs} {
    width: 18px;
    height: 18px;
  }
`;

export const ErrorMessage = styled(Section)`
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  min-height: 200px;
  width: 100%;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.border.primary};

  /* Иконка ошибки */
  &::before {
    content: '⚠️';
    font-size: ${props => props.theme.typography.fontSize.xxl};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  h3 {
    color: ${props => props.theme.colors.error};
    font-size: ${props => props.theme.typography.fontSize.lg};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    margin: 0 0 ${props => props.theme.spacing.sm} 0;
  }

  p {
    color: ${props => props.theme.colors.text.secondary};
    font-size: ${props => props.theme.typography.fontSize.sm};
    margin: 0;
    line-height: 1.5;
  }

  /* Адаптивные стили */
  ${media.md} {
    padding: ${props => props.theme.spacing.lg};
    min-height: 180px;

    h3 {
      font-size: ${props => props.theme.typography.fontSize.md};
    }

    p {
      font-size: ${props => props.theme.typography.fontSize.xs};
    }
  }

  ${media.xs} {
    padding: ${props => props.theme.spacing.md};
    min-height: 160px;
    gap: ${props => props.theme.spacing.sm};

    &::before {
      font-size: ${props => props.theme.typography.fontSize.xl};
    }
  }
`;

export const SuccessMessage = styled(ErrorMessage)`
  background: ${props => props.theme.colors.success}15; // 8% прозрачность
  border-color: ${props => props.theme.colors.success};

  &::before {
    content: '✅';
  }

  h3 {
    color: ${props => props.theme.colors.success};
  }
`;

export const WarningMessage = styled(ErrorMessage)`
  background: ${props => props.theme.colors.warning}15;
  border-color: ${props => props.theme.colors.warning};

  &::before {
    content: '⚠️';
  }

  h3 {
    color: ${props => props.theme.colors.warning};
  }
`;

export const Card = styled.div`
  background: ${props => props.theme.colors.background.card};
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.small};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.medium};
    border-color: ${props => props.theme.colors.border.accent};
  }

  ${media.md} {
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.small};
  }

  ${media.xs} {
    padding: ${props => props.theme.spacing.sm};
  }
`;

export const SecondaryButton = styled(CompactButton)`
  && {
    background: transparent;
    color: ${props => props.theme.colors.text.primary};
    border: 1px solid ${props => props.theme.colors.border.primary};

    &:not(:disabled) {
      &:hover {
        background: ${props => props.theme.colors.background.secondary};
        border-color: ${props => props.theme.colors.border.accent};
        transform: translateY(-1px);
      }

      &:active {
        background: ${props => props.theme.colors.background.tertiary};
        transform: translateY(0);
      }
    }
  }
`;
