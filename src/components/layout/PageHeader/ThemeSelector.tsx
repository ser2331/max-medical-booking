import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '@/providers/ThemeContext.tsx';
import { SkinName } from '@/styles/themes/manager.ts';

const SelectorContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const SelectorButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    border-color: ${props => props.theme.colors.border.accent};
    background: ${props => props.theme.colors.background.secondary};
  }

  &::after {
    content: '▼';
    font-size: 10px;
    opacity: 0.7;
  }
`;

const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: ${props => props.theme.spacing.xs};
  background: ${props => props.theme.colors.background.primary};
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: ${props => props.theme.spacing.sm};
  z-index: 1000;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  transform: ${props => (props.$isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: all 0.2s ease;
`;

const DropdownItem = styled.button<{ $isActive: boolean }>`
  display: block;
  width: 100%;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs};
  border: none;
  background: ${props =>
    props.$isActive ? props.theme.colors.background.secondary : 'transparent'};
  color: ${props => props.theme.colors.text.primary};
  text-align: left;
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius.small};
  transition: all 0.2s ease;
  font-size: ${props => props.theme.typography.fontSize.sm};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
  }

  &:not(:last-child) {
    margin-bottom: ${props => props.theme.spacing.xs};
  }
`;

export const ThemeSelector: React.FC = () => {
  const { currentSkin, availableSkins, setSkin } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const skinEntries = Object.entries(availableSkins);
  const currentSkinName = availableSkins[currentSkin]?.displayName || 'Стандартная';

  const handleSkinSelect = (skinKey: SkinName) => {
    setSkin(skinKey);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <SelectorContainer ref={dropdownRef}>
      <SelectorButton onClick={toggleDropdown}>{currentSkinName}</SelectorButton>

      <Dropdown $isOpen={isDropdownOpen}>
        {skinEntries.map(([key, skin]) => (
          <DropdownItem
            key={key}
            $isActive={currentSkin === key}
            onClick={() => handleSkinSelect(key as SkinName)}
          >
            {skin.displayName}
          </DropdownItem>
        ))}
      </Dropdown>
    </SelectorContainer>
  );
};
