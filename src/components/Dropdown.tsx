import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CompactButton } from '@/components/ui/StyledComponents.tsx';

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const MoreButton = styled(CompactButton)<{ $isOpen: boolean }>`
  width: 32px;
  height: 32px;
  &:hover {
    border-color: ${props => props.theme.colors.blackPure};
    background: ${props => props.theme.colors.mainBackgroundColor};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.blackPure};
    outline-offset: 2px;
  }
`;

const DropdownContainer = styled.div<{ $isOpen: boolean; $position?: 'bottom' | 'top' }>`
  position: absolute;
  ${props => (props.$position === 'top' ? 'bottom: 100%;' : 'top: 100%;')}
  right: 0;
  margin-${props => (props.$position === 'top' ? 'bottom: 8px' : 'top: 8px')};
  background: ${props => props.theme.colors.mainBackgroundColor};
  border: 1px solid ${props => props.theme.colors.blackPure};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: ${props => props.theme.spacing.sm};
  z-index: 1000;
  min-width: 150px;
  max-width: 250px;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  transform: ${props =>
    props.$isOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
  transition: all 0.2s ease;
  transform-origin: top right;

  /* Адаптивность */
  ${props => props.theme.breakpoints.xs} {
    right: -50px;
    min-width: 140px;
  }
`;

const DropdownItem = styled.button<{
  $isActive: boolean;
  $isDanger?: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  background: ${props => {
    if (props.$isActive) return props.theme.colors.mainBackgroundColor;
    if (props.$disabled) return props.theme.colors.mainBackground;
    return 'transparent';
  }};
  color: ${props => {
    if (props.$disabled) return props.theme.colors.black;
    if (props.$isDanger) return props.theme.colors.red;
    return props.theme.colors.black;
  }};
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: all 0.2s ease;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-family: ${props => props.theme.typography.fontFamily.primary};
  text-align: left;

  &:hover:not(:disabled) {
    background: ${props => {
      if (props.$isDanger) return `${props.theme.colors.red}15`; // 8% opacity
      return props.theme.colors.mainBackgroundColor;
    }};
    transform: ${props => (props.$disabled ? 'none' : 'translateX(2px)')};
  }

  &:active:not(:disabled) {
    transform: translateX(0);
  }

  &:not(:last-child) {
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  &:focus-visible {
    outline: 2px solid
      ${props => (props.$isDanger ? props.theme.colors.red : props.theme.colors.black)};
    outline-offset: -2px;
  }
`;

const ItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ItemLabel = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: ${props => props.theme.colors.black};
  margin: ${props => props.theme.spacing.xs} 0;
`;

const DropdownHeader = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  border-bottom: 1px solid ${props => props.theme.colors.black};
  margin-bottom: ${props => props.theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

interface DropdownItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (key: string) => void;
  disabled?: boolean;
  danger?: boolean;
}

interface DropdownProps {
  icon?: React.ReactNode;
  items: DropdownItem[];
  activeItem?: string;
  position?: 'bottom' | 'top';
  header?: string;
  disabled?: boolean;
  className?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Dropdown: FC<DropdownProps> = ({
  icon = '⋯',
  items,
  activeItem,
  position = 'bottom',
  header,
  disabled = false,
  className,
  onOpenChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие dropdown при клике вне компонента
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

  // Колбэк при изменении состояния открытия
  useEffect(() => {
    onOpenChange?.(isDropdownOpen);
  }, [isDropdownOpen, onOpenChange]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick(item.key);
      setIsDropdownOpen(false);
    }
  };

  // Группируем элементы для разделителей
  const regularItems = items.filter(item => !item.danger);
  const dangerItems = items.filter(item => item.danger);

  return (
    <DropdownWrapper className={className} ref={dropdownRef}>
      <MoreButton
        $isOpen={isDropdownOpen}
        onClick={toggleDropdown}
        disabled={disabled}
        title="Дополнительные действия"
      >
        {icon}
      </MoreButton>

      <DropdownContainer $isOpen={isDropdownOpen} $position={position}>
        {header && <DropdownHeader>{header}</DropdownHeader>}

        {regularItems.map(item => (
          <DropdownItem
            key={item.key}
            $isActive={activeItem === item.key}
            $disabled={item.disabled}
            onClick={() => handleItemClick(item)}
            title={item.label}
          >
            {item.icon && <ItemIcon>{item.icon}</ItemIcon>}
            <ItemLabel>{item.label}</ItemLabel>
          </DropdownItem>
        ))}

        {regularItems.length > 0 && dangerItems.length > 0 && <DropdownDivider />}

        {dangerItems.map(item => (
          <DropdownItem
            key={item.key}
            $isActive={activeItem === item.key}
            $isDanger={item.danger}
            $disabled={item.disabled}
            onClick={() => handleItemClick(item)}
            title={item.label}
          >
            {item.icon && <ItemIcon>{item.icon}</ItemIcon>}
            <ItemLabel>{item.label}</ItemLabel>
          </DropdownItem>
        ))}
      </DropdownContainer>
    </DropdownWrapper>
  );
};
