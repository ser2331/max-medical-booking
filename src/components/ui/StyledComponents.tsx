import styled from 'styled-components';
import { media } from '@/styles/mixins.ts';

export const Main = styled('div')`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100dvh;
  width: 100%;
  background: ${props => props.theme.colors.mainBackground};
`;

export const Flex = styled('div')<{
  $direction?: 'row' | 'column';
  $align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  $justifyContent?: 'space-between' | 'space-around' | 'flex-start';
  $gap?: number;
}>`
  display: flex;
  flex-direction: ${props => props.$direction || 'row'};
  align-items: ${props => props.$align || 'center'};
  justify-content: ${props => props.$justifyContent || 'center'};
  gap: ${props => (props.$gap || 0) + 'px'};
`;

export const Section = styled(Flex).attrs({ $direction: 'column' })`
  gap: ${props => props.theme.spacing.md};
`;

export const CompactButton = styled('button')<{ width?: number; height?: number }>`
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
      background: ${props => props.theme.colors.blue};
      color: ${props => props.theme.colors.white};
      border: 1px solid ${props => props.theme.colors.blue};

      &:hover {
        background: ${props => props.theme.colors.blueHover};
        border-color: ${props => props.theme.colors.blueHover};
        transform: translateY(-1px);
        box-shadow: ${props => props.theme.shadows.small};
      }

      &:active {
        transform: translateY(0);
        box-shadow: none;
      }
    }

    &:disabled {
      background: ${props => props.theme.colors.grey3};
      color: ${props => props.theme.colors.grey2};
      border: 1px solid ${props => props.theme.colors.grey3};
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

export const ErrorMessage = styled(Section)`
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  min-height: 200px;
  width: 100%;
  background: ${props => props.theme.colors.grey1};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.grey3};

  /* Иконка ошибки */
  &::before {
    content: '⚠️';
    font-size: ${props => props.theme.typography.fontSize.xxl};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  h3 {
    color: ${props => props.theme.colors.red};
    font-size: ${props => props.theme.typography.fontSize.lg};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    margin: 0 0 ${props => props.theme.spacing.sm} 0;
  }

  p {
    color: ${props => props.theme.colors.grey2};
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
  background: ${props => props.theme.colors.greenLight};
  border-color: ${props => props.theme.colors.green};

  &::before {
    content: '✅';
  }

  h3 {
    color: ${props => props.theme.colors.green};
  }
`;

export const WarningMessage = styled(ErrorMessage)`
  background: ${props => props.theme.colors.orangeLight};
  border-color: ${props => props.theme.colors.orange};

  &::before {
    content: '⚠️';
  }

  h3 {
    color: ${props => props.theme.colors.orange};
  }
`;

//================>Card components
export const Card = styled.div<{ $isSelected?: boolean }>`
  border: 2px solid
    ${props => (props.$isSelected ? props.theme.colors.blue : props.theme.colors.grey3)};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props =>
    props.$isSelected ? props.theme.colors.blueLight : props.theme.colors.cardElemBackground};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props =>
      props.$isSelected ? props.theme.colors.blue : props.theme.colors.blue};
  }

  ${media.md} {
    border-radius: ${props => props.theme.borderRadius.small};
  }
`;

export const SpecialtyContent = styled(Flex).attrs({ $direction: 'column', $align: 'flex-start' })`
  flex: 1;
`;

export const SpecialtyName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.md};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const SpecialtyStats = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const StatItem = styled.div<{ $type?: 'participant' | 'ticket' }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => {
    switch (props.$type) {
      case 'participant':
        return props.theme.colors.green;
      case 'ticket':
        return props.theme.colors.orange;
      default:
        return props.theme.colors.grey2;
    }
  }};
`;

export const HeaderRow = styled(Section)`
  margin-bottom: ${props => props.theme.spacing.xs};
`;
