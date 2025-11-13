import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/providers/ThemeContext.tsx';

const ToggleContainer = styled.div`
  display: flex;
  background: ${props => props.theme.colors.background.secondary};
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 2px;
  gap: 2px;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const ToggleOption = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => (props.$isActive ? props.theme.colors.background.primary : 'transparent')};
  color: ${props =>
    props.$isActive ? props.theme.colors.text.primary : props.theme.colors.text.secondary};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  min-width: 60px;

  &:hover {
    background: ${props =>
      props.$isActive
        ? props.theme.colors.background.primary
        : props.theme.colors.background.tertiary};
  }
`;

export const ColorSchemeToggle: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useTheme();

  return (
    <ToggleContainer>
      <ToggleOption
        $isActive={colorScheme === 'light'}
        onClick={() => colorScheme !== 'light' && toggleColorScheme()}
      >
        ☀️ Светлая
      </ToggleOption>
      <ToggleOption
        $isActive={colorScheme === 'dark'}
        onClick={() => colorScheme !== 'dark' && toggleColorScheme()}
      >
        🌙 Тёмная
      </ToggleOption>
    </ToggleContainer>
  );
};
