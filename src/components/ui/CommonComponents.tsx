import styled from 'styled-components';
import { media } from '@/styles/mixins.ts';

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

//================>Card components
// Карточка элемента
export const Card = styled.div<{ $isSelected?: boolean }>`
  border: 2px solid
    ${props => (props.$isSelected ? props.theme.colors.primary : props.theme.colors.border.primary)};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props =>
    props.$isSelected ? props.theme.colors.primary + '10' : props.theme.colors.background.card};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props =>
      props.$isSelected ? props.theme.colors.primary : props.theme.colors.border.accent};
  }

  ${media.md} {
    border-radius: ${props => props.theme.borderRadius.small};
  }
`;
export const SpecialtyContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const SpecialtyName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
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
        return props.theme.colors.success;
      case 'ticket':
        return props.theme.colors.warning;
      default:
        return props.theme.colors.text.secondary;
    }
  }};
`;

export const HeaderRow = styled(Section)`
  margin-bottom: ${props => props.theme.spacing.xs};
`;
