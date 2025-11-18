import styled from 'styled-components';

export const MenuGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  max-width: 400px;
`;
