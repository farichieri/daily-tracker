import { format, formatISO } from 'date-fns';

export const dbFormatDate = (date: string | Date) => {
  // return format(new Date(date), 'yyyy-MM-dd');
  return formatISO(new Date(date), { representation: 'date' });
};
