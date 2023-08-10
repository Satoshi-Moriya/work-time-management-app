import { DailyClientWorkLogData } from "../types";
import { getWeekdayFromDate } from "./getWeekdayFromDate";

export const addDayNotWork = (userId: number | null | undefined, monthlyWorkLogData: DailyClientWorkLogData[], lastDayOfDisplayMonth: string): DailyClientWorkLogData[] => {
  let monthlyWorkLogDataIncludingDayNotWork: DailyClientWorkLogData[] = [];
  for(let i = 1; i <= Number(lastDayOfDisplayMonth.substring(lastDayOfDisplayMonth.length - 2)); i++) {
    const dailyWorkLog = monthlyWorkLogData.find(dailyWorkLogData => dailyWorkLogData.date === i );
    if (dailyWorkLog) {
      monthlyWorkLogDataIncludingDayNotWork.push(dailyWorkLog);
    } else {
      monthlyWorkLogDataIncludingDayNotWork.push({
        // userIdなので正常にログインできていれば、nullやundefinedということはない
        workLogUserId: userId!,
        date: i,
        day: getWeekdayFromDate(`${lastDayOfDisplayMonth.substring(0, 4)}-${lastDayOfDisplayMonth.substring(4, 6)}-${i.toString().padStart(2, "0")}`),
        workLogTime: [],
        workLogSumSeconds: 0
      });
    }
  }
  return monthlyWorkLogDataIncludingDayNotWork;
}