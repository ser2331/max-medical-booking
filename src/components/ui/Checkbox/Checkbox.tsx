import styled from 'styled-components';
import { ChangeEvent, forwardRef, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const StyledCheckbox = styled.input`
  margin-top: 2px;
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:checked {
    accent-color: ${props => props.theme.colors.blue};
  }
`;

const CheckboxLabel = styled.label`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: 1.4;
  cursor: pointer;
  flex: 1;

  a {
    color: ${props => props.theme.colors.blue};
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.blueHover};
      text-decoration: none;
    }
  }
`;

interface CheckboxProps {
  checked?: boolean;
  title?: string | ReactNode;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  type?: string;
  showErrorText?: boolean;
  register?: UseFormRegisterReturn;
}
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(props => {
  const { checked, title, disabled, onChange, register } = props;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    } else if (register?.onChange) {
      register.onChange({ target: event.target.value, type: event.target.value });
    }
  };

  return (
    <>
      <StyledCheckbox
        type="checkbox"
        checked={checked}
        disabled={disabled}
        {...register}
        onChange={handleChange}
      />
      {!!title && <CheckboxLabel htmlFor={register?.name}>{title}</CheckboxLabel>}
    </>
  );
});
