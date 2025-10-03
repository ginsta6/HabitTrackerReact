import { useMemo } from "react";

// Helper function to get the number of days in a month
const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

// Helper function to adjust day to the correct month and year
const adjustDayToMonth = (
  day: number,
  month: number,
  year: number
) => {
  const daysInMonth = getDaysInMonth(month, year);

  if (day > daysInMonth) {
    // Move to next month
    const nextMonth = (month + 1) % 12;
    const nextYear = nextMonth === 0 ? year + 1 : year;
    return {
      day: day - daysInMonth,
      month: nextMonth,
      year: nextYear,
    };
  } else if (day < 1) {
    // Move to previous month
    const prevMonth = (month - 1 + 12) % 12;
    const prevYear = prevMonth === 11 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);
    return {
      day: day + daysInPrevMonth,
      month: prevMonth,
      year: prevYear,
    };
  }

  return { day, month, year };
};

export function useCalendar(selectedDay: Date) {
  const days = useMemo(() => {
    const currentDate = selectedDay.getDate();
    const currentMonth = selectedDay.getMonth();
    const currentYear = selectedDay.getFullYear();

    return Array.from({ length: 21 }, (_, i) => {
      const offset = i - 10;
      const currentDay = currentDate + offset;

      const { day, month, year } = adjustDayToMonth(
        currentDay,
        currentMonth,
        currentYear
      );

      return new Date(year, month, day);
    });
  }, [selectedDay]);

  return days;
}
