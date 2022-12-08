import { DateTime } from "luxon";

export const setLocalDateTime = (isoDate: string) => {
  return DateTime.fromISO(isoDate).toLocaleString(DateTime.DATETIME_MED);
};

export const setDate = (isoDate: string) => {
  return DateTime.fromISO(isoDate).toFormat("MMMM dd, yyyy");
};
