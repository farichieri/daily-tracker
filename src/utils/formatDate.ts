import { format, formatISO } from 'date-fns';

export const dbFormatDate = (date: string | Date) => {
  return formatISO(new Date(date), { representation: 'date' });
};

export const formatTime = (date: string) => {
  return date && format(new Date(date), 'kk:mm');
};
