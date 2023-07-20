import { ClientWorkLogData, TimeRange } from "../types";
import { convertTimeToSeconds } from "./convertTimeToSeconds";
import { getWeekdayFromDate } from "./getWeekdayFromDate";

export const convertToWorkLogDataList = (convertData: any): ClientWorkLogData[] => {
  const convertedData = convertData.map((data: any) => {
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