import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SwitcherContainer = styled.div`
  display: flex;
  background: ${props => props.theme.colors.background.secondary};
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 2px;
  gap: 2px;
`;

const LanguageOption = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => (props.$isActive ? props.theme.colors.background.primary : 'transparent')};
  color: ${props =>
    props.$isActive ? props.theme.colors.text.primary : props.theme.colors.text.secondary};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all 0.2s ease;
  min-width: 60px;

  &:hover {
    background: ${props =>
      props.$isActive
        ? props.theme.colors.background.primary
        : props.theme.colors.background.tertiary};
  }
`;

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const isRussian = i18n.language === 'ru';

  const toggleLanguage = () => {
    i18n.changeLanguage(isRussian ? 'en' : 'ru');
  };

  return (
    <SwitcherContainer>
      <LanguageOption $isActive={isRussian} onClick={() => !isRussian && toggleLanguage()}>
        RU
      </LanguageOption>
      <LanguageOption $isActive={!isRussian} onClick={() => isRussian && toggleLanguage()}>
        EN
      </LanguageOption>
    </SwitcherContainer>
  );
};
