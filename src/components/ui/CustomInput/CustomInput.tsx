import styled from 'styled-components';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import React from 'react';
import { CalendarIcon } from '@/assets/icons/CalendarIcon';
import { SearchIcon } from '@/assets/icons/SearchIcon.tsx';

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
  $clearable?: boolean;
}>`
  width: 100%;
  height: 44px;
  padding: ${props => props.theme.spacing.xsm} ${props => props.theme.spacing.sm};
  padding-right: ${props =>
    props.$hasSearch && props.$hasValue
      ? '60px'
      : props.$hasSearch
        ? '40px'
        : props.$hasDateIcon
          ? '40px'
          : props.theme.spacing.lg};
  border: none;
  outline: 1px solid
    ${props => (props.$hasError ? props.theme.colors.red : props.theme.colors.grey3)};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: ${props => props.theme.typography.fontSize.xl};
  background-color: ${props => (props.$hasError ? '#FF4D4F' : props.theme.colors.white)};
  color: ${props => props.theme.colors.black};
  transition: all 0.2s ease;
  box-sizing: border-box;

  /* Скрываем крестик очистки в разных браузерах */
  &::-webkit-search-cancel-button,
  &::-webkit-clear-button {
    display: ${props => (props.$clearable ? 'block' : 'none')};
    appearance: none;
  }

  &::-ms-clear {
    display: ${props => (props.$clearable ? 'block' : 'none')};
    width: 0;
    height: 0;
  }

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

  /* Стили для search input */
  &[type='search'] {
    &::-webkit-search-cancel-button {
      display: ${props => (props.$clearable ? 'block' : 'none')};
    }

    &::-ms-clear {
      display: ${props => (props.$clearable ? 'block' : 'none')};
    }
  }

  &:hover:enabled {
    outline-color: 1px solid
      ${props => (props.$hasError ? props.theme.colors.red : props.theme.colors.blue)};
  }

  &:focus:enabled {
    outline-color: ${props => (props.$hasError ? props.theme.colors.red : props.theme.colors.blue)};
    box-shadow: 0 0 0 2px
      ${props => (props.$hasError ? props.theme.colors.redLight : props.theme.colors.blue)};
  }

  &:disabled {
    color: ${props => props.theme.colors.grey2};
    cursor: not-allowed;
    outline-color: ${props => props.theme.colors.grey3};
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
  showSearchIcon?: boolean;
  clearable?: boolean;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
    showDateIcon = type === 'date',
    showSearchIcon = type === 'search',
    clearable = false, // по умолчанию отключаем крестик
    onBlur,
    onKeyDown,
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
          $hasSearch={showSearchIcon}
          $clearable={clearable}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          {...register}
          onChange={handleChange}
        />
        {showDateIcon && (
          <DateIconWrapper>
            <CalendarIcon />
          </DateIconWrapper>
        )}
        {showSearchIcon && (
          <DateIconWrapper>
            <SearchIcon />
          </DateIconWrapper>
        )}
      </InputWrapper>

      {description && <DescriptionText>{description}</DescriptionText>}
    </InputContainer>
  );
});

CustomInput.displayName = 'CustomInput';
