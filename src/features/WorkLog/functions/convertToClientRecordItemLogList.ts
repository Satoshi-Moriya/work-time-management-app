import { ClientRecordItemLog, RecordItemLog, RecordItemLogTimeRange } from "../types";
import { convertTimeToSeconds } from "./convertTimeToSeconds";
import { getWeekdayFromDate } from "./getWeekdayFromDate";

export const convertToClientRecordItemLogList = (convertData: RecordItemLog[]): ClientRecordItemLog[] => {
  const convertedData = convertData.map((data: RecordItemLog) => {
    const convertedStartTime: number = convertTimeToSeconds(data.recordItemLogStartTime);
    const convertedEndTime: number = convertTimeToSeconds(data.recordItemLogEndTime);
    const convertedDate: number = Number(data.recordItemLogDate.substring(data.recordItemLogDate.length - 2));
    const day: string = getWeekdayFromDate(data.recordItemLogDate);

    return {
      recordItemId: data.recordItemId,
      recordItemLogDate: convertedDate,
      recordItemLogDay: day,
      recordItemLogTime: {
        recordItemLogId: data.recordItemLogId,
        start: convertedStartTime,
        end: convertedEndTime,
      } as RecordItemLogTimeRange,
      recordItemLogSeconds: data.recordItemLogSeconds
    }
  });
  return convertedData;
}