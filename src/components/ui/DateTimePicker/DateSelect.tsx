import { FC, useState } from 'react';
import styled from 'styled-components';

import { SelectArrowIcon } from '@/assets/icons/SelectArrowIcon.tsx';

const DateSelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DateSelectButton = styled.button<{ $isOpen?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: transparent;
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  gap: ${props => props.theme.spacing.xs};

  &:hover {
    border-color: ${props => props.theme.colors.blue};
  }

  ${props =>
    props.$isOpen &&
    `
    border-color: ${props.theme.colors.blue};
  `}
`;

const DateSelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grey3};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
`;

const DateSelectOption = styled.div<{ $isSelected?: boolean }>`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};
  background: ${props => (props.$isSelected ? props.theme.colors.blueLight : 'transparent')};
  color: ${props => (props.$isSelected ? props.theme.colors.blue : props.theme.colors.black)};

  &:hover {
    background: ${props => props.theme.colors.blueLight};
  }
`;

const SelectArrow = styled.div<{ $isOpen?: boolean }>`
  transition: transform 0.2s ease;
  transform: ${props => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  display: flex;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
  }
`;

interface DateSelectProps {
  options: Array<{ value: number; label: string }>;
  value?: number | null;
  onChange: (value: number) => void;
  placeholder?: string;
}

export const DateSelect: FC<DateSelectProps> = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (optionValue: number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <DateSelectContainer>
      <DateSelectButton type="button" $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedOption?.label || placeholder || 'Выберите'}</span>
        <SelectArrow $isOpen={isOpen}>
          <SelectArrowIcon color="var(--widget-blue)" />
        </SelectArrow>
      </DateSelectButton>

      {isOpen && (
        <DateSelectDropdown>
          {options.map(option => (
            <DateSelectOption
              key={option.value}
              $isSelected={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </DateSelectOption>
          ))}
        </DateSelectDropdown>
      )}
    </DateSelectContainer>
  );
};
