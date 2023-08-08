import { ClientWorkLogData, TimeRange, WorkLogData } from "../types";
import { convertTimeToSeconds } from "./convertTimeToSeconds";
import { getWeekdayFromDate } from "./getWeekdayFromDate";

export const convertToWorkLogDataList = (convertData: WorkLogData[]): ClientWorkLogData[] => {
  const convertedData = convertData.map((data: WorkLogData) => {
    const convertedStartTime: number = convertTimeToSeconds(data.workLogStartTime);
    const convertedEndTime: number = convertTimeToSeconds(data.workLogEndTime);
    const convertedDate: number = Number(data.workLogDate.substring(data.workLogDate.length - 2));
    const day: string = getWeekdayFromDate(data.workLogDate);

    return {
      workLogId: Number(data.workLogId),
      workLogUserId: Number(data.workLogUserId),
      date: convertedDate,
      day: day,
      workLogTime: {
        start: convertedStartTime,
        end: convertedEndTime,
      } as TimeRange,
      workLogSeconds: Number(data.workLogSeconds)
    }
  });
  return convertedData;
}