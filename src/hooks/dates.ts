import { dbFormatDate } from '@/utils/formatDate';
import { format } from 'date-fns';

export const getDaysInAMonth = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return new Array(31)
    .fill('')
    .map((v, i) => {
      const day = new Date(year, month, i + 1);
      return {
        date: day,
        weekDay: format(day, 'E'),
      };
    })
    .filter((v) => new Date(v.date).getMonth() === month);
};

export const getDaysInAWeek = (date: Date) => {
  console.log({ date });
  return Array(7)
    .fill(new Date(date))
    .map((el, idx) => {
      const day: Date = new Date(el.setDate(el.getDate() - el.getDay() + idx));
      return {
        date: dbFormatDate(day),
        numberOfMonth: format(day, 'd'),
        weekDay: format(day, 'E'),
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
