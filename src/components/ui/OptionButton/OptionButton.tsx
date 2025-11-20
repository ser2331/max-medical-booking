import styled from 'styled-components';
import { Flex } from '@/components/ui/StyledComponents';
import { CustomButton } from '@/components/ui/Button/Button.tsx';
import { ReactElement } from 'react';

const SelectionContainer = styled(Flex)`
  width: 100%;
  padding: 0;
`;

const OptionsContainer = styled(Flex)`
  width: 100%;
  //height: 100%;
  gap: 0;
  background: ${props => props.theme.colors.grey1};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.spacing.sm};
`;

const Btn = styled(CustomButton).attrs({ variant: 'outline-default' })<{
  $isSelected: boolean;
  $hasDivider?: boolean;
}>`
  && {
    flex: 1;
    font-size: ${props => props.theme.typography.fontSize.sm};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    background: ${props =>
      props.$isSelected ? props.theme.colors.white : props.theme.colors.grey1};
    color: ${props => props.theme.colors.black};
    border: none;

    &:active {
      transform: none;
      box-shadow: none;
    }

    &:disabled {
      background: transparent;
      color: ${props => props.theme.colors.grey3};
      cursor: not-allowed;

      &:hover {
        background: transparent;
        color: ${props => props.theme.colors.grey3};
      }
    }
  }
`;

interface OptionButtonProps<T extends string> {
  selectedType: T;
  options: { type: T; title: string }[];
  onChange: (type: T) => void;
  disabled?: T[];
}

export const OptionButton = <T extends string>({
  selectedType,
  disabled = [],
  options = [],
  onChange,
}: OptionButtonProps<T>): ReactElement => {
  const handleTypeSelect = (type: T) => {
    if (disabled?.includes(type)) return;
    onChange(type);
  };

  return (
    <SelectionContainer $align="stretch">
      <OptionsContainer>
        {options.map((option, index) => (
          <Btn
            key={option.type}
            $isSelected={selectedType === option.type}
            $hasDivider={index < options.length - 1}
            onClick={() => handleTypeSelect(option.type)}
            disabled={(disabled || []).includes(option.type)}
          >
            {option.title}
          </Btn>
        ))}
      </OptionsContainer>
    </SelectionContainer>
  );
};
