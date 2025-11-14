import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { media } from '@/styles/mixins.ts';
import { UseFormRegisterReturn } from 'react-hook-form';

const Radio = styled.input`
  margin-right: ${props => props.theme.spacing.md};
  margin-top: 2px;
  accent-color: ${props => props.theme.colors.primary};
  cursor: pointer;

  ${media.md} {
    margin-right: ${props => props.theme.spacing.sm};
  }
`;

interface RadioInputProps {
  register: UseFormRegisterReturn;
  value: string | number;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioInput: FC<RadioInputProps> = ({ register, value, checked, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    register.onChange?.(event);
    onChange?.(event);
  };

  return (
    <Radio
      type="radio"
      value={value}
      checked={checked}
      onChange={handleChange}
      onBlur={register.onBlur}
      name={register.name}
      ref={register.ref}
    />
  );
};
