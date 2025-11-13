import React, { useState } from 'react';
import styled from 'styled-components';

const SelectionContainer = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.background.primary};
  border-top: 1px solid ${props => props.theme.colors.border.primary};
  height: 40px;
`;

const OptionsContainer = styled.div`
  display: flex;
  height: 100%;
`;

const OptionButton = styled.button<{ $isSelected: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${props => (props.$isSelected ? props.theme.colors.primary : 'transparent')};
  color: ${props =>
    props.$isSelected ? props.theme.colors.text.inverted : props.theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 13px;
  font-weight: 500;
  position: relative;

  /* Разделитель */
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 0.5px;
    background: ${props => props.theme.colors.border.primary};
  }

  &:hover {
    background: ${props =>
      props.$isSelected
        ? props.theme.colors.primaryHover
        : props.theme.colors.background.secondary};
  }
`;

interface AppointmentTypeSelectorProps {
  onTypeSelect: (type: 'district' | 'insurance') => void;
  selectedType?: 'district' | 'insurance';
}

export const AppointmentTypeSelector: React.FC<AppointmentTypeSelectorProps> = ({
  onTypeSelect,
  selectedType,
}) => {
  const [localSelectedType, setLocalSelectedType] = useState<'district' | 'insurance' | undefined>(
    selectedType,
  );

  const handleTypeSelect = (type: 'district' | 'insurance') => {
    setLocalSelectedType(type);
    onTypeSelect(type);
  };

  const options = [
    {
      type: 'district' as const,
      title: 'По району',
    },
    {
      type: 'insurance' as const,
      title: 'По полису',
    },
  ];

  return (
    <SelectionContainer>
      <OptionsContainer>
        {options.map(option => (
          <OptionButton
            key={option.type}
            $isSelected={localSelectedType === option.type}
            onClick={() => handleTypeSelect(option.type)}
          >
            {option.title}
          </OptionButton>
        ))}
      </OptionsContainer>
    </SelectionContainer>
  );
};
