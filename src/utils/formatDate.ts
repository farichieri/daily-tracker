import { format, intervalToDuration } from "date-fns";

export const dbFormatDate = (date: Date) => {
  const dateToFormat = date || new Date();
  return format(dateToFormat, "MM-dd-yyyy");
};

export const formatTime = (seconds: number) => {
  if (!seconds) return null;
  const dur = intervalToDuration({ start: 0, end: seconds * 1000 });
  const timeFormatted = `${String(dur.hours).padStart(2, "0")}:${String(
    dur.minutes
  ).padStart(2, "0")}`;
  return timeFormatted;
};

export const hhmmToSeconds = (hhmm: string) => {
  const a = hhmm.split(":"); // split it at the colons
  const seconds = +a[0] * 60 * 60 + +a[1] * 60;
  return seconds;
};
