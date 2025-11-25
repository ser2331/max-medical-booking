import { useMemo } from 'react';
import ReactDatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import { Locale } from 'date-fns';
import moment from 'moment';
import styled from 'styled-components';

import { media } from '@/assets/style/mixins.ts';
import { DatePickerArrowLeft } from '@/assets/icons/DatePickerArrowLeft.tsx';
import { DatePickerArrowRight } from '@/assets/icons/DatePickerArrowRight.tsx';

import { Flex } from '@/components/ui/StyledComponents.tsx';
import { DateSelect } from '@/components/ui/DateTimePicker/DateSelect.tsx';

import 'react-datepicker/dist/react-datepicker.css';

const FormFieldContainer = styled.div`
  width: 100%;
  margin-bottom: 0;
`;

const Title = styled.span<{ $hasError?: boolean }>`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.grey2};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  display: block;

  ${props =>
    props.$hasError &&
    `
    color: ${props.theme.colors.red};
  `}
`;

const Required = styled.div`
  color: ${props => props.theme.colors.red};
  display: inline-block;
  margin-left: ${props => props.theme.spacing.xs};
`;

const ErrorText = styled.span`
  color: ${props => props.theme.colors.red};
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-top: ${props => props.theme.spacing.xs};
  display: block;
`;

const HeaderContainer = styled(Flex).attrs({ $justifyContent: 'space-between' })`
  height: 40px;
  width: 100%;
  align-items: center;
`;

const MonthYearSection = styled(Flex)`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 0;
`;

const ArrowButton = styled(Flex)<{ $disabled?: boolean }>`
  cursor: ${props => (props.$disabled ? 'default' : 'pointer')};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: background-color 0.2s ease;
  flex-shrink: 0;
`;

const SelectWrapper = styled.div`
  min-width: 70px;
  flex: 1;
  max-width: 120px;
  position: relative;
`;

const DatePickerStyles = styled.div`
  .react-datepicker {
    box-shadow: ${props => props.theme.shadows.large};
    border-radius: ${props => props.theme.borderRadius.xl};
    border: none;
    font-family: ${props => props.theme.typography.fontFamily.primary};
    font-size: ${props => props.theme.typography.fontSize.sm};
    color: ${props => props.theme.colors.black};

    &__header {
      padding: 0;
      background: ${props => props.theme.colors.blueLight};
      border: none;
      border-radius: ${props => props.theme.borderRadius.xl} ${props => props.theme.borderRadius.xl}
        0 0;
    }

    &__day-names {
      background: ${props => props.theme.colors.white};
    }

    &__day-name {
      font-size: ${props => props.theme.typography.fontSize.sm};
      font-weight: ${props => props.theme.typography.fontWeight.semibold};
      color: ${props => props.theme.colors.black};
      width: 45px;
      line-height: 45px;
      margin: 2px;
      ${media.sm} {
        width: 36px;
        line-height: 36px;
      }
    }

    &__month {
      margin: 0;
      padding: ${props => `0 ${props.theme.spacing.xsm} ${props.theme.spacing.xs}`};
      background: ${props => props.theme.colors.white};
      border-radius: 0 0 ${props => props.theme.borderRadius.xl}
        ${props => props.theme.borderRadius.xl};
    }

    &__day {
      font-size: ${props => props.theme.typography.fontSize.sm};
      color: ${props => props.theme.colors.black};
      width: 45px;
      height: 45px;
      line-height: 45px;
      margin: 2px;
      border-radius: 50%;
      transition: all 0.2s ease;
      ${media.sm} {
        width: 36px;
        height: 36px;
        line-height: 36px;
      }

      &--today {
        font-weight: ${props => props.theme.typography.fontWeight.semibold};
        color: ${props => props.theme.colors.blueLight};
      }

      &--selected,
      &--keyboard-selected {
        background: ${props => props.theme.colors.blueLight} !important;
        color: ${props => props.theme.colors.blue} !important;
        font-weight: ${props => props.theme.typography.fontWeight.semibold};
        border-radius: 50%;
      }

      &:hover {
        background: ${props => props.theme.colors.blueLight} !important;
        border-radius: 50%;
      }

      &--disabled {
        color: ${props => props.theme.colors.grey3} !important;
        cursor: not-allowed;
      }
    }

    &__triangle {
      display: none;
    }

    &__navigation {
      top: ${props => props.theme.spacing.md};

      &--previous {
        left: ${props => props.theme.spacing.md};
      }

      &--next {
        right: ${props => props.theme.spacing.md};
      }
    }
  }
`;

type IValue = Date | string | null;

type IProps = {
  onChange: (value: IValue) => void;
  value: IValue;
  error?: string;
  title?: string;
  description?: string;
  required?: string | boolean;
  filterTitle?: string;
  disabled?: boolean;
  errorText?: string;
  placeholder?: string;
  outputFormat?: string;
  availableDates?: string[];
};

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

// eslint-disable-next-line react-refresh/only-export-components
export const range = (from: number, to: number) => {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
};
const FORMAT = 'DD.MM.YYYY';

export const CustomDatePicker = (props: IProps) => {
  const { onChange, value, outputFormat = FORMAT, availableDates = [], ...restProps } = props;

  const maxDate: Date = new Date(new Date().getFullYear() + 50, 11, 31);
  const minDate: Date = new Date(1900, 0, 1);

  const years = range(1900, new Date().getFullYear() + 50);

  const yearsOptions = useMemo(() => {
    return years.map((x: number) => ({ value: x, label: x.toString() }));
  }, [years]);

  const monthOptions = useMemo(() => {
    return months.map((x, key) => ({ value: key, label: x.slice(0, 3) }));
  }, []);

  const availableDatesSet = useMemo(() => {
    return new Set(availableDates);
  }, [availableDates]);

  const getArrowColor = (disabled: boolean) => {
    return disabled ? 'grey5' : 'black';
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = moment(date).format(outputFormat);
      onChange(formattedDate);
    } else {
      onChange(null);
    }
  };
  const dateValue = useMemo(() => {
    if (!value) return null;

    if (value instanceof Date) {
      return value;
    }

    // Всегда указываем формат при парсинге строки
    const momentDate = moment(value, FORMAT, true); // strict mode
    return momentDate.isValid() ? momentDate.toDate() : null;
  }, [value]);

  const isDateAvailable = (date: Date) => {
    if (availableDates.length === 0) return true;
    const dateString = moment(date).format(FORMAT);
    return availableDatesSet.has(dateString);
  };

  const filterDate = (date: Date) => {
    return isDateAvailable(date);
  };

  const dayClassName = (date: Date) => {
    return isDateAvailable(date) ? '' : 'react-datepicker__day--disabled';
  };

  return (
    <DatePickerStyles>
      <FormFieldContainer>
        {restProps.title && restProps.title.length > 0 && (
          <Title $hasError={!!restProps.error}>
            {restProps.title}
            {restProps.required && <Required>*</Required>}
          </Title>
        )}

        <ReactDatePicker
          selected={dateValue}
          disabled={restProps.disabled}
          dateFormat={FORMAT}
          locale={ru as Locale}
          placeholderText={restProps.placeholder ?? ''}
          onChange={handleDateChange}
          maxDate={maxDate}
          minDate={minDate}
          inline={true}
          filterDate={filterDate}
          dayClassName={dayClassName}
          todayButton={null} // убираем кнопку "Сегодня"
          shouldCloseOnSelect={false} // если нужно оставить календарь открытым после выбора
          renderCustomHeader={({
            date,
            changeYear,
            decreaseMonth,
            increaseMonth,
            decreaseYear,
            increaseYear,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
            prevYearButtonDisabled,
            nextYearButtonDisabled,
            changeMonth,
          }) => {
            const currentDate = date || new Date();

            return (
              <HeaderContainer>
                {/* Секция месяца */}
                <MonthYearSection>
                  <ArrowButton
                    $disabled={prevMonthButtonDisabled}
                    onClick={() => !prevMonthButtonDisabled && decreaseMonth()}
                  >
                    <DatePickerArrowLeft color={getArrowColor(prevMonthButtonDisabled)} />
                  </ArrowButton>

                  <SelectWrapper>
                    <DateSelect
                      options={monthOptions}
                      value={currentDate.getMonth()}
                      onChange={changeMonth}
                      placeholder="Месяц"
                    />
                  </SelectWrapper>

                  <ArrowButton
                    $disabled={nextMonthButtonDisabled}
                    onClick={() => !nextMonthButtonDisabled && increaseMonth()}
                  >
                    <DatePickerArrowRight color={getArrowColor(nextMonthButtonDisabled)} />
                  </ArrowButton>
                </MonthYearSection>

                {/* Секция года */}
                <MonthYearSection>
                  <ArrowButton
                    $disabled={prevYearButtonDisabled}
                    onClick={() => !prevYearButtonDisabled && decreaseYear()}
                  >
                    <DatePickerArrowLeft color={getArrowColor(prevYearButtonDisabled)} />
                  </ArrowButton>

                  <SelectWrapper>
                    <DateSelect
                      options={yearsOptions}
                      value={currentDate.getFullYear()}
                      onChange={changeYear}
                      placeholder="Год"
                    />
                  </SelectWrapper>

                  <ArrowButton
                    $disabled={nextYearButtonDisabled}
                    onClick={() => !nextYearButtonDisabled && increaseYear()}
                  >
                    <DatePickerArrowRight color={getArrowColor(nextYearButtonDisabled)} />
                  </ArrowButton>
                </MonthYearSection>
              </HeaderContainer>
            );
          }}
        />

        {(restProps?.errorText?.length || 0) > 0 && <ErrorText>{restProps.errorText}</ErrorText>}
      </FormFieldContainer>
    </DatePickerStyles>
  );
};
