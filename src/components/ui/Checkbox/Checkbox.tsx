import styled from 'styled-components';
import { ChangeEvent, forwardRef, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { Flex } from '@/components/ui/StyledComponents.tsx';
import { CheckBoxIcon } from '@/assets/icons/CheckBoxIcon.tsx';

const CheckboxContainer = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  display: inline-block;
`;
const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.small || '4px'};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  outline: none;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:checked {
    background-color: ${props => props.theme.colors.blue};
  }
`;
const CheckIconWrapper = styled.div<{ $checked: boolean }>`
  line-height: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${props => (props.$checked ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: none;

  svg {
    width: 16px;
    height: 16px;
    color: white;
  }
`;
const CheckboxLabel = styled.label`
  font-size: ${props => props.theme.typography.fontSize.md};
  line-height: ${props => props.theme.typography.fontSize.xxl};
  cursor: pointer;
  flex: 1;

  a {
    color: ${props => props.theme.colors.blue};
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.blueHover};
    }
  }
`;

interface CheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  title?: string | ReactNode;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: boolean) => void;
  type?: string;
  showErrorText?: boolean;
  register?: UseFormRegisterReturn;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { id, name, checked, title, disabled, onChange, register } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    } else if (register?.onChange) {
      register.onChange(event);
    }
  };

  return (
    <Flex $gap={12} style={{ width: '100%' }}>
      <CheckboxContainer>
        <StyledCheckbox
          ref={ref}
          id={id}
          checked={checked}
          disabled={disabled}
          {...register}
          onChange={handleChange}
          name={name || register?.name}
        />
        <CheckIconWrapper $checked={!!checked}>
          <CheckBoxIcon />
        </CheckIconWrapper>
      </CheckboxContainer>
      {!!title && (
        <CheckboxLabel key={name || register?.name} htmlFor={id || name || register?.name}>
          {title}
        </CheckboxLabel>
      )}
    </Flex>
  );
});
