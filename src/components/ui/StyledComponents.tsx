import styled from 'styled-components';
import { media } from '@/assets/style/mixins.ts';

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

export const ErrorMessage = styled(Section)`
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  background: ${props => props.theme.colors.grey1};
  border-radius: ${props => props.theme.borderRadius.large};
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
export const ValidationError = styled.div`
  color: ${props => props.theme.colors.red};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.red}10;
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.red}20;
  text-align: center;
`;

export const HeaderRow = styled(Section)`
  margin-bottom: ${props => props.theme.spacing.xs};
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
export const StatValue = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.black};
`;
