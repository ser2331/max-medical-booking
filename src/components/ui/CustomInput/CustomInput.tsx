import styled from 'styled-components';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form';
import React from 'react';
import { CalendarIcon } from '@/assets/icons/CalendarIcon';
import { SearchIcon } from '@/assets/icons/SearchIcon.tsx';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const InputTitle = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.xsm};
  color: ${props => props.theme.colors.grey2};
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
  background-color: ${props =>
    props.$hasError ? props.theme.colors.redLight : props.theme.colors.white};
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

    /* Стили для недоступных дат */
    &:invalid {
      color: ${props => props.theme.colors.grey3};
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

const ErrorText = styled.span`
  color: ${props => props.theme.colors.red};
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-top: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
`;

// Вспомогательная функция для получения текста ошибки
const getErrorMessage = (
  error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
): string => {
  if (typeof error === 'string') return error;
  if (error?.message && typeof error?.message === 'string') return error.message;
  if (error?.type === 'required') return 'Это поле обязательно для заполнения';
  if (error?.type === 'pattern') return 'Неверный формат';
  if (error?.type === 'minLength') return 'Слишком короткое значение';
  if (error?.type === 'maxLength') return 'Слишком длинное значение';
  if (error?.type === 'validate') return 'Неверное значение';
  return 'Ошибка в поле';
};

// Функция для получения текущей даты в формате YYYY-MM-DD
const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  maxDate?: string;
  minDate?: string;
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
    showErrorText = false,
    register,
    showDateIcon = type === 'date',
    showSearchIcon = type === 'search',
    clearable = false,
    onBlur,
    onKeyDown,
    error,
    maxDate,
    minDate,
  } = props;

  const hasError = !!error;
  const errorMessage = hasError ? getErrorMessage(error) : '';

  // Для date input устанавливаем максимальную дату как текущую
  const dateProps =
    type === 'date'
      ? {
          max: maxDate || getCurrentDate(), // По умолчанию запрещаем будущие даты
          min: minDate, // Можно установить минимальную дату если нужно
        }
      : {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    } else if (register?.onChange) {
      register.onChange(event);
    }
  };

  // Обработчик blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur();
    }
    if (register?.onBlur) {
      register.onBlur(e);
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
          $hasError={hasError}
          $hasDateIcon={showDateIcon}
          $hasSearch={showSearchIcon}
          $clearable={clearable}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          {...dateProps}
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

      {/* Показываем ошибку если есть и включено отображение ошибок */}
      {showErrorText && hasError && <ErrorText>{errorMessage}</ErrorText>}

      {/* Показываем описание если нет ошибки или всегда (в зависимости от требований) */}
      {description && !(showErrorText && hasError) && (
        <DescriptionText>{description}</DescriptionText>
      )}
    </InputContainer>
  );
});

CustomInput.displayName = 'CustomInput';
