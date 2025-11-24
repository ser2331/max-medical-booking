import styled from 'styled-components';
import { CustomButton } from '@/components/ui/Button/Button.tsx';
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
  $justifyContent?: 'space-between' | 'space-around' | 'flex-start' | 'flex-end';
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

export const StatValue = styled.span<{ $available?: boolean }>`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => (props.$available ? props.theme.colors.grey2 : props.theme.colors.red)};
`;

export const Line = styled('div')<{
  $marginTop?: number;
  $marginBottom?: number;
}>`
  width: 100%;
  margin-top: ${props =>
    props.$marginTop !== undefined ? `${props.$marginTop}px` : props.theme.spacing.md};
  margin-bottom: ${props =>
    props.$marginBottom !== undefined ? `${props.$marginBottom}px` : props.theme.spacing.md};
  height: 1px;
  border-bottom: 1px solid ${props => props.theme.colors.grey1};
`;

export const CheckCardName = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

export const CheckCardDescription = styled(CheckCardName)`
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  color: ${props => props.theme.colors.grey2};
`;

export const ContactLink = styled.a`
  color: ${props => props.theme.colors.grey2};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  font-size: ${props => props.theme.typography.fontSize.md};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.grey2};
    text-decoration: underline;
  }
`;

export const NavigationContainer = styled(Flex)<{ $vertical: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  opacity: 1;
  z-index: 99;
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
  gap: ${props => props.theme.spacing.xsm};
  border-radius: 0 0
    ${props => `${props.theme.borderRadius.small} ${props.theme.borderRadius.small}`};
  flex-direction: ${props => (props.$vertical ? 'column' : 'row-reverse')};

  ${props => props.theme.breakpoints.md} {
    margin-top: ${props => props.theme.spacing.lg};
    padding: ${props => props.theme.spacing.sm};
    gap: ${props => props.theme.spacing.sm};
  }

  ${props => props.theme.breakpoints.xs} {
    margin-top: ${props => props.theme.spacing.md};
    padding: ${props => props.theme.spacing.xs};
    gap: ${props => props.theme.spacing.xs};
  }
`;

export const NavigationBtn = styled(CustomButton)`
  width: 100%;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;
