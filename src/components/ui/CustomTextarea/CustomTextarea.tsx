import styled from 'styled-components';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const TextAreaTitle = styled.span<{ $hasError?: boolean }>`
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => (props.$hasError ? props.theme.colors.red : props.theme.colors.grey2)};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.xsm} ${props => props.theme.spacing.sm};
  border: 1px solid
    ${props => (props.$hasError ? props.theme.colors.red : props.theme.colors.grey3)};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    border-color: ${props =>
      props.$hasError ? props.theme.colors.red : props.theme.colors.blueHover};
  }

  &:focus {
    outline: none;
    border-color: ${props => (props.$hasError ? props.theme.colors.red : props.theme.colors.blue)};
    box-shadow: 0 0 0 2px
      ${props => (props.$hasError ? props.theme.colors.redLight : props.theme.colors.blueLight)};
  }

  &::placeholder {
    color: ${props => props.theme.colors.grey3};
  }

  &:disabled {
    background: ${props => props.theme.colors.grey1};
    color: ${props => props.theme.colors.grey2};
    cursor: not-allowed;
  }
`;

// const ErrorText = styled.span`
//   font-size: ${props => props.theme.typography.fontSize.sm};
//   margin-top: ${props => props.theme.spacing.xs};
//   color: ${props => props.theme.colors.red};
//   font-weight: ${props => props.theme.typography.fontWeight.normal};
// `;

interface CustomTextareaProps {
  title?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
  disabled?: boolean;
  // Новые пропсы для react-hook-form
  register?: UseFormRegisterReturn;
}

export const CustomTextarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(props => {
  const { title, placeholder, value, onChange, rows = 3, disabled, register } = props;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
    // Пробрасываем событие в register если нужно
    if (register?.onChange) {
      register.onChange(event);
    }
  };

  return (
    <TextAreaContainer>
      {title && <TextAreaTitle>{title}</TextAreaTitle>}
      <StyledTextArea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...register}
      />
      {/*{error && <ErrorText>{error.message || 'Ошибка'}</ErrorText>}*/}
    </TextAreaContainer>
  );
});

// Устанавливаем displayName для удобства отладки
CustomTextarea.displayName = 'CustomTextarea';

// Вспомогательные типы для удобства использования
export type CustomTextareaPropsWithRegister = CustomTextareaProps & {
  register: UseFormRegisterReturn;
};

export type CustomTextareaPropsWithoutRegister = CustomTextareaProps & {
  register?: never;
  onChange: (value: string) => void;
  value: string;
};
