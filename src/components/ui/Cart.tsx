import styled from 'styled-components';

export const Card = styled.div<{ $vertical?: boolean }>`
  display: flex;
  flex-direction: ${props => (props.$vertical ? 'column' : 'row')};
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  box-sizing: border-box;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props =>
    `${props.theme.shadows.small}, ${props.theme.shadows.medium}, ${props.theme.shadows.large}, ${props.theme.shadows.xlarge}`};
`;
