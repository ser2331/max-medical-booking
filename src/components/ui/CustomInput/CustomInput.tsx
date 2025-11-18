import styled, { css } from 'styled-components';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import React from 'react';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const InputTitle = styled.span<{ $hasError?: boolean }>`
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => (props.$hasError ? props.theme.colors.red : props.theme.colors.grey2)};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
`;

const RequiredMark = styled.span`
  display: inline-block;
  color: ${props => props.theme.colors.red};
  margin-left: 2px;
`;

const InputWrapper = styled(Flex)`
  position: relative;
`;

const StyledInput = styled.input<{
  $hasError?: boolean;
  $hasSearch?: boolean;
  $hasValue?: boolean;
}>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xsm};
  padding-right: ${props =>
    props.$hasSearch && props.$hasValue
      ? '60px'
      : props.$hasSearch
        ? '40px'
        : props.theme.spacing.lg};
  border: 1px solid
    ${props => (props.$hasError ? props.theme.colors.red : props.theme.colors.grey3)};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: ${props => props.theme.typography.fontSize.xl};
  outline: none;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  width: 100%;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover:enabled {
    border-color: ${props =>
      props.$hasError ? props.theme.colors.red : props.theme.colors.blueHover};
  }

  &:focus:enabled {
    border-color: ${props => (props.$hasError ? props.theme.colors.red : props.theme.colors.blue)};
    box-shadow: 0 0 0 2px
      ${props => (props.$hasError ? props.theme.colors.redLight : props.theme.colors.blueLight)};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.grey1};
    color: ${props => props.theme.colors.grey2};
    cursor: not-allowed;
    border-color: ${props => props.theme.colors.grey3};
  }

  &::placeholder {
    color: ${props => props.theme.colors.grey3};
  }
`;

const DescriptionText = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.grey2};
  margin-top: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
`;

interface CustomInputProps {
  value?: string;
  title?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  type?: string;
  showErrorText?: boolean;
  register?: UseFormRegisterReturn;
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(props => {
  const { value, title, description, required, disabled, placeholder, onChange, type, register } =
    props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    } else if (register?.onChange) {
      register.onChange({ target: event.target.value, type: event.target.value });
    }
  };

  return (
    <InputContainer>
      {title && (
        <InputTitle>
          {title}
          {required && <RequiredMark>*</RequiredMark>}
        </InputTitle>
      )}

      <InputWrapper>
        <StyledInput
          disabled={disabled}
          placeholder={placeholder}
          type={type || 'text'}
          value={value}
          {...register}
          onChange={handleChange}
        />
      </InputWrapper>

      {/*{showErrorText && error && <ErrorText>{getErrorMessage(error)}</ErrorText>}*/}

      {description && <DescriptionText>{description}</DescriptionText>}
    </InputContainer>
  );
});

CustomInput.displayName = 'CustomInput';

export const GlobalInputStyles = css`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
