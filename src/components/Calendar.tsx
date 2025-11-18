import React from 'react';
import styled from 'styled-components';

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${props => props.theme.spacing.xs};
  background: ${props => props.theme.colors.mainBackgroundColor};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.black};
`;

const CalendarHeader = styled.div`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.black};
  padding: ${props => props.theme.spacing.xs};
`;

const CalendarDay = styled.button<{
  $isSelected?: boolean;
  $isAvailable?: boolean;
  $isCurrentMonth?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 2px solid
    ${props => {
      if (props.$isSelected) return props.theme.colors.black;
      return 'transparent';
    }};
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => {
    if (props.$isSelected) return props.theme.colors.blueHover;

    if (props.$isAvailable) return props.theme.colors.black;
  }};

  color: ${props => {
    if (!props.$isCurrentMonth) return props.theme.colors.black;
    if (props.$isSelected) return props.theme.colors.black;
    if (props.$isAvailable) return props.theme.colors.black;
    return props.theme.colors.black;
  }};
  cursor: ${props => (props.$isAvailable ? 'pointer' : 'not-allowed')};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all 0.2s ease;
`;

const CalendarNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${props => props.theme.colors.black};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.mainBackgroundColor};
  }
`;

const CalendarTitle = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.black};
`;

export interface CalendarDayInfo {
  day: number | null;
  isCurrentMonth: boolean;
  isAvailable: boolean;
  date?: string;
}

export interface CalendarProps {
  currentDate: Date;
  availableDates: Set<string>;
  selectedDate?: string;
  onDateSelect: (date: string) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
}

const getWeekDays = (): string[] => {
  return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
};

const generateCalendarDays = (
  year: number,
  month: number,
  availableDates: Set<string>,
): CalendarDayInfo[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Понедельник как первый день

  const days: CalendarDayInfo[] = [];

  // Добавляем пустые дни в начале
  for (let i = 0; i < startingDay; i++) {
    days.push({ day: null, isCurrentMonth: false, isAvailable: false });
  }

  // Добавляем дни месяца
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const isAvailable = availableDates.has(dateStr);
    days.push({
      day,
      isCurrentMonth: true,
      isAvailable,
      date: dateStr,
    });
  }

  return days;
};

const getCurrentMonthName = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });
};

export const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  availableDates,
  selectedDate,
  onDateSelect,
  onMonthChange,
}) => {
  const calendarDays = generateCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    availableDates,
  );

  return (
    <div>
      <CalendarNavigation>
        <NavigationButton
          type="button"
          onClick={() => onMonthChange('prev')}
          aria-label="Предыдущий месяц"
        >
          ‹
        </NavigationButton>

        <CalendarTitle>{getCurrentMonthName(currentDate)}</CalendarTitle>

        <NavigationButton
          type="button"
          onClick={() => onMonthChange('next')}
          aria-label="Следующий месяц"
        >
          ›
        </NavigationButton>
      </CalendarNavigation>

      <CalendarGrid>
        {getWeekDays().map(day => (
          <CalendarHeader key={day}>{day}</CalendarHeader>
        ))}
        {calendarDays.map((dayInfo, index) => (
          <CalendarDay
            key={index}
            type="button"
            $isSelected={selectedDate === dayInfo.date}
            $isAvailable={dayInfo.isAvailable}
            $isCurrentMonth={dayInfo.isCurrentMonth}
            onClick={() => dayInfo.date && onDateSelect(dayInfo.date)}
            disabled={!dayInfo.isAvailable}
            aria-label={
              dayInfo.date ? `${dayInfo.day} ${getCurrentMonthName(currentDate)}` : 'Пустой день'
            }
            aria-selected={selectedDate === dayInfo.date}
          >
            {dayInfo.day}
          </CalendarDay>
        ))}
      </CalendarGrid>
    </div>
  );
};
