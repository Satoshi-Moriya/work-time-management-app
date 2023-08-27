import { DailyClientRecordItemLog } from "../types";
import { getWeekdayFromDate } from "./getWeekdayFromDate";

export const addDayNotRecordItemLog = (
  recordItemId: number,
  monthlyRecordItemLogData: DailyClientRecordItemLog[],
  lastDayOfDisplayMonth: string
): DailyClientRecordItemLog[] => {

  let monthlyRecordItemLogIncludingDayNotRecordIte: DailyClientRecordItemLog[] = [];
  for(let i = 1; i <= Number(lastDayOfDisplayMonth.substring(lastDayOfDisplayMonth.length - 2)); i++) {
    const dailyRecordItemLog = monthlyRecordItemLogData.find(dailyRecordItemLogData => dailyRecordItemLogData.recordItemLogDate === i );
    if (dailyRecordItemLog) {
      monthlyRecordItemLogIncludingDayNotRecordIte.push(dailyRecordItemLog);
    } else {
      // recordItemLogがない場合
      monthlyRecordItemLogIncludingDayNotRecordIte.push({
        recordItemId: recordItemId,
        recordItemLogDate: i,
        recordItemLogDay: getWeekdayFromDate(`${lastDayOfDisplayMonth.substring(0, 4)}-${lastDayOfDisplayMonth.substring(4, 6)}-${i.toString().padStart(2, "0")}`),
        recordItemLogTime: [],
        recordItemLogSumSeconds: 0
      });
    }
  }
  return monthlyRecordItemLogIncludingDayNotRecordIte;
}