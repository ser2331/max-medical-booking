import React from 'react';
import styled from 'styled-components';
import { Modal } from '@/components/Modal.tsx';
import { ThemeSelector } from './ThemeSelector';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Section } from '@/components/ui/CommonComponents.tsx';

const SettingsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xxl};
  padding: ${props => props.theme.spacing.sm} 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.md} 0;
  }
`;

const SettingsRow = styled(Section)`
  padding: ${props => props.theme.spacing.sm} 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const RowLabel = styled.div`
  flex: 1;
  min-width: 0;
`;

const RowLabelTitle = styled.div`
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: 2px;
`;

const RowLabelDescription = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  line-height: 1.3;
`;

const RowControl = styled.div`
  flex-shrink: 0;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`;

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Настройки" size="sm">
      <SettingsContent>
        <SettingsRow>
          <RowLabel>
            <RowLabelTitle>Цветовая схема</RowLabelTitle>
            <RowLabelDescription>Выберите светлую или темную тему</RowLabelDescription>
          </RowLabel>
          <RowControl>
            <ColorSchemeToggle />
          </RowControl>
        </SettingsRow>

        <SettingsRow>
          <RowLabel>
            <RowLabelTitle>Стиль интерфейса</RowLabelTitle>
            <RowLabelDescription>Выберите подходящий стиль оформления</RowLabelDescription>
          </RowLabel>
          <RowControl>
            <ThemeSelector />
          </RowControl>
        </SettingsRow>

        <SettingsRow>
          <RowLabel>
            <RowLabelTitle>Язык интерфейса</RowLabelTitle>
            <RowLabelDescription>Русский или английский</RowLabelDescription>
          </RowLabel>
          <RowControl>
            <LanguageSwitcher />
          </RowControl>
        </SettingsRow>
      </SettingsContent>
    </Modal>
  );
};
