import { dbFormatDate } from '@/utils/formatDate';
import { parseISO } from 'date-fns';

export const filterObjectIncludes = (
  obj: any,
  filter: string,
  filterValue: string
) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      !obj[val][filter].includes(filterValue)
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );
export const filterObject = (obj: any, filter: string, filterValue: string) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      !obj[val][filter].includes(filterValue)
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );

export const filterTasksByDateSet = (obj: any, date: string) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      !(
        obj[val]['date_set']['date_iso'] &&
        dbFormatDate(parseISO(obj[val]['date_set']['date_iso'])) === date
      )
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {}
  );
