import styled from 'styled-components';
import { UseFormRegisterReturn } from 'react-hook-form';

// Styled компоненты для Radiobutton
const RadioContainer = styled.div<{
  $checked: boolean;
  $disabled?: boolean;
  $isError?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.$disabled ? 0.6 : 1)};

  &:hover {
    ${props =>
      !props.$disabled &&
      !props.$isError &&
      `
      .radiobutton__input_1 {
        border-color: ${props.theme.colors.blueHover};
      }
    `}
  }
`;

const RadioInput = styled.span<{
  $checked: boolean;
  $isError?: boolean;
}>`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid
    ${props =>
      props.$isError
        ? props.theme.colors.red
        : props.$checked
          ? props.theme.colors.blue
          : props.theme.colors.grey3};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:before {
    content: ' ';
    width: ${props => (props.$checked ? '20px' : '0px')};
    height: ${props => (props.$checked ? '20px' : '0px')};
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s ease;
  }

  &:after {
    content: ' ';
    background-color: ${props =>
      props.$isError ? props.theme.colors.red : props.theme.colors.blue};
    width: ${props => (props.$checked ? '12px' : '0px')};
    height: ${props => (props.$checked ? '12px' : '0px')};
    border-radius: 50%;
    position: absolute;
    transition: all 0.2s ease;
  }
`;

const RadioLabel = styled.label<{
  $isError?: boolean;
  $disabled?: boolean;
}>`
  margin-left: ${props => props.theme.spacing.sm};
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  color: ${props =>
    props.$isError
      ? props.theme.colors.red
      : props.$disabled
        ? props.theme.colors.grey2
        : props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  transition: color 0.2s ease;
`;

interface RadiobuttonProps {
  label?: string;
  value: string | boolean | number;
  onChange?: (value: string | boolean | number) => void;
  checked: boolean;
  register: UseFormRegisterReturn;
  isError?: boolean;
  defaultValue?: boolean;
  disabled?: boolean;
}

export const RadioButton = (props: RadiobuttonProps) => {
  const handleClick = () => {
    if (!props.disabled) {
      props.register.onChange?.({ type: '', target: props.value });
      props.onChange?.(props.value);
    }
  };

  return (
    <RadioContainer
      $checked={props.checked}
      $disabled={props.disabled}
      $isError={props.isError}
      onClick={handleClick}
    >
      <RadioInput
        $checked={props.checked}
        $isError={props.isError}
        className="radiobutton__input_1"
      />
      {props.label && (
        <RadioLabel
          $isError={props.isError}
          $disabled={props.disabled}
          className="radiobutton__label_1"
        >
          {props.label}
        </RadioLabel>
      )}
    </RadioContainer>
  );
};

// Группа радиокнопок
export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

// Горизонтальная группа радиокнопок
export const RadioGroupHorizontal = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;
