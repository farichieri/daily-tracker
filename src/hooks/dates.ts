import { dbFormatDate } from '@/utils/formatDate';

export const getDaysInAMonth = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return new Array(31)
    .fill('')
    .map((v, i) => {
      const day = dbFormatDate(
        new Date(year, month, i + 1).toLocaleDateString()
      );
      return {
        date: day,
        weekDay: new Date(day).toLocaleDateString('en-US', {
          weekday: 'long',
        }),
      };
    })
    .filter((v) => new Date(v.date).getMonth() === month);
};

export const getDaysInAWeek = (date: Date) => {
  return Array(7)
    .fill(new Date(date))
    .map((el, idx) => {
      const day: Date = new Date(el.setDate(el.getDate() - el.getDay() + idx));
      return {
        date: dbFormatDate(day.toLocaleDateString()),
        weekDay: day.toLocaleDateString('en-US', { weekday: 'short' }),
      };
    });
};

export const getArrayOfDates = (option: string, date: Date) => {
  return option === 'week'
    ? getDaysInAWeek(date)
    : option === 'month'
    ? getDaysInAMonth(date)
    : option === 'reset'
    ? getDaysInAWeek(new Date())
    : [];
};
