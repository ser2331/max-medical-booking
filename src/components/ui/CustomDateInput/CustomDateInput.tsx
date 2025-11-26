import styled from 'styled-components';
import { useState, useRef, useEffect, FC } from 'react';
import { CalendarIcon } from '@/assets/icons/CalendarIcon';
import { CustomInput } from '@/components/ui/CustomInput/CustomInput.tsx';
import { CustomDatePicker } from '@/components/ui/DateTimePicker/DateTimePicker.tsx';
import moment from 'moment';
import { CloseIcon } from '@/assets/icons/CloseIcon.tsx';

const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const DatePickerWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  margin-top: 4px;
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  padding: 4px;
  gap: 4px;
`;

const Option = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

interface CustomDateInputProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  showDateIcon?: boolean;
  disabled?: boolean;
  availableDates?: string[];
  outputFormat?: string;
  inputFormat?: string;
}

export const CustomDateInput: FC<CustomDateInputProps> = props => {
  const {
    onChange,
    value = '',
    placeholder = 'дд.мм.гггг',
    showDateIcon = true,
    disabled = false,
    availableDates = [],
    outputFormat = 'DD.MM.YYYY',
  } = props;

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Синхронизация с внешним значением
  useEffect(() => {
    if (value !== displayValue) {
      setDisplayValue(value);
    }
  }, [value]);

  // Функция для применения маски
  const applyDateMask = (inputValue: string): string => {
    // Удаляем все нецифровые символы
    let digits = inputValue.replace(/\D/g, '');

    // Ограничиваем длину (дд.мм.гггг = 8 цифр)
    if (digits.length > 8) {
      digits = digits.substring(0, 8);
    }

    // Применяем маску дд.мм.гггг
    let maskedValue = '';

    for (let i = 0; i < digits.length; i++) {
      if (i === 2 || i === 4) {
        maskedValue += '.';
      }
      maskedValue += digits[i];
    }

    return maskedValue;
  };

  // Функция для валидации даты
  const isValidDate = (dateStr: string): boolean => {
    if (dateStr.length < 10) return false;

    const momentDate = moment(dateStr, outputFormat, true);
    return momentDate.isValid();
  };

  // Обработчик для CustomInput с маской
  const handleCustomInputChange = (inputValue: string) => {
    const maskedValue = applyDateMask(inputValue);
    setDisplayValue(maskedValue);

    // Если дата полная и валидная - передаем ее
    if (maskedValue.length === 10 && isValidDate(maskedValue)) {
      onChange?.(maskedValue);
    } else if (maskedValue.length === 0) {
      // Если поле очищено
      onChange?.('');
    }
    // Для неполных дат не вызываем onChange, ждем полного ввода
  };

  // Обработчик для DatePicker
  const handleDatePickerChange = (dateValue: Date | string | null) => {
    let resultDate = '';

    if (dateValue instanceof Date) {
      resultDate = moment(dateValue).format(outputFormat);
    } else if (typeof dateValue === 'string') {
      const parsedDate = moment(dateValue, outputFormat, true);
      resultDate = parsedDate.isValid() ? dateValue : '';
    }

    setDisplayValue(resultDate);
    onChange?.(resultDate);
    setIsDatePickerOpen(false);
  };

  // Обработчик нажатия клавиш
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Разрешаем: цифры, Backspace, Delete, Tab, стрелки
    if (
      !/[\d]|Backspace|Delete|Tab|ArrowLeft|ArrowRight|ArrowUp|ArrowDown/.test(e.key) &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();
    }
  };

  // Закрытие календаря при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Добавьте состояние для отслеживания фокуса
  const [isFocused, setIsFocused] = useState(false);

  // Обработчики фокуса
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  // Обработчик потери фокуса - валидация
  const handleInputBlur = () => {
    setIsFocused(false);

    if (displayValue && displayValue.length === 10 && !isValidDate(displayValue)) {
      // Если введена невалидная дата, очищаем поле
      setDisplayValue('');
      onChange?.('');
    } else if (displayValue && displayValue.length < 10) {
      // Если введена неполная дата, очищаем поле
      setDisplayValue('');
      onChange?.('');
    }
  };
  return (
    <DateInputContainer ref={containerRef}>
      <div style={{ position: 'relative' }}>
        <CustomInput
          ref={inputRef}
          value={displayValue}
          placeholder={placeholder}
          onChange={handleCustomInputChange}
          onFocus={handleInputFocus} // Добавляем обработчик фокуса
          onBlur={handleInputBlur} // Обновляем обработчик blur
          onKeyDown={handleKeyDown}
          clearable={!disabled && !!displayValue}
          disabled={disabled}
          required={false}
        />

        {showDateIcon && !disabled && (
          <Options>
            {value && (
              <Option type="button" onClick={() => handleCustomInputChange('')} disabled={disabled}>
                <CloseIcon size={8} />
              </Option>
            )}

            <Option
              type="button"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              disabled={disabled}
            >
              {/*<CalendarIcon color={disabled ? 'var(--grey4)' : 'var(--widget-blue)'} />*/}
              <CalendarIcon
                color={
                  disabled
                    ? 'var(--widget-grey-3)'
                    : isFocused || isDatePickerOpen
                      ? 'var(--widget-blue)'
                      : 'var(--widget-grey-3)'
                }
              />
            </Option>
          </Options>
        )}
      </div>

      {isDatePickerOpen && !disabled && (
        <DatePickerWrapper>
          <CustomDatePicker
            availableDates={availableDates}
            onChange={handleDatePickerChange}
            value={displayValue}
            outputFormat={outputFormat}
          />
        </DatePickerWrapper>
      )}
    </DateInputContainer>
  );
};

CustomDateInput.displayName = 'CustomDateInput';
