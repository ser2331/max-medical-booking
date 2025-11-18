import styled from 'styled-components';

export const Card = styled.div<{ $isSelected?: boolean; $interactive?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.small};
`;
