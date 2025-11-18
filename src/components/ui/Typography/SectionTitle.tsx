import styled from 'styled-components';

export const SectionTitle = styled.p`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;
