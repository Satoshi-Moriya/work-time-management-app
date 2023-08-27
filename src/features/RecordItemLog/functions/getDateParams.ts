import { getLastDayOfMonth } from "./getLastDayOfMonth";

export const getDateParams = <T extends Date | undefined>(date: T): [string, string] => {
  const year = date ? date.getFullYear() : new Date().getFullYear();
  const month = date ? date.getMonth() + 1 : new Date().getMonth() + 1;
  const day = date ? getLastDayOfMonth(year, month) : new Date().getDate();

  const fromDate = `${year}${month.toString().padStart(2, "0")}01`;
  const toDate = `${year}${month.toString().padStart(2, "0")}${day.toString().padStart(2, "0")}`;

  return [fromDate, toDate];
};