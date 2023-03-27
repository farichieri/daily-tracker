import { formatISO, intervalToDuration } from "date-fns";

export const dbFormatDate = (date: string | Date) => {
  return formatISO(new Date(date), { representation: "date" });
};

export const formatTime = (seconds: number) => {
  if (!seconds) return null;
  const dur = intervalToDuration({ start: 0, end: seconds * 1000 });
  const timeFormatted = `${dur.hours}:${String(dur.minutes).padStart(2, "0")}`;
  return timeFormatted;
};
