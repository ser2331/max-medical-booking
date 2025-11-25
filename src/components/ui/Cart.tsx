import styled from 'styled-components';

export const Card = styled.div<{ $vertical?: boolean; $gap?: number }>`
  display: flex;
  flex-direction: ${props => (props.$vertical ? 'column' : 'row')};
  gap: ${props => (props.$gap ? `${props.$gap}px` : props.theme.spacing.sm)};
  width: 100%;
  box-sizing: border-box;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props =>
    `${props.theme.shadows.small}, ${props.theme.shadows.medium}, ${props.theme.shadows.large}, ${props.theme.shadows.xlarge}`};
`;
