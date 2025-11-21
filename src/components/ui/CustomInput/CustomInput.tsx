import styled from 'styled-components';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import React from 'react';
import { CalendarIcon } from '@/assets/icons/CalendarIcon';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const InputTitle = styled.span<{ $hasError?: boolean }>`
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.xsm};
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
  $hasDateIcon?: boolean;
}>`
  padding: ${props => props.theme.spacing.xsm} ${props => props.theme.spacing.sm};
  padding-right: ${props =>
    props.$hasSearch && props.$hasValue
      ? '60px'
      : props.$hasSearch
        ? '40px'
        : props.$hasDateIcon
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

  /* Стили для date input */
  &[type='date'] {
    &::-webkit-calendar-picker-indicator {
      background: transparent;
      bottom: 0;
      color: transparent;
      cursor: pointer;
      height: auto;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
    }
  }

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

const DateIconWrapper = styled.div`
  position: absolute;
  right: ${props => props.theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
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
  showDateIcon?: boolean;
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const {
    value,
    title,
    description,
    required,
    disabled,
    placeholder,
    onChange,
    type,
    register,
    showDateIcon = type === 'date', // автоматически показывать иконку для date
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    } else if (register?.onChange) {
      register.onChange(event);
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
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          type={type || 'text'}
          value={value}
          $hasDateIcon={showDateIcon}
          {...register}
          onChange={handleChange}
        />
        {showDateIcon && (
          <DateIconWrapper>
            <CalendarIcon />
          </DateIconWrapper>
        )}
      </InputWrapper>

      {description && <DescriptionText>{description}</DescriptionText>}
    </InputContainer>
  );
});

CustomInput.displayName = 'CustomInput';

CustomInput.displayName = 'CustomInput';
