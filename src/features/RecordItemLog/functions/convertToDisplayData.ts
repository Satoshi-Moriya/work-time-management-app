import { fetchRecordItemLogs } from "../repositories/fetchRecordItemLogs";
import { DailyClientRecordItemLog } from "../types";
import { addDayNotRecordItemLog } from "./addDayNotRecordItemLog";
import { convertToClientRecordItemLogList } from "./convertToClientRecordItemLogList";
import { convertToDailyRecordItemLogData } from "./convertToDailyRecordItemLogData";

export const convertToDisplayData = async(
  selectedRecordItemId: number,
  selectedMonthFrom: string,
  selectedMonthTo: string
): Promise<DailyClientRecordItemLog[]> => {
  const recordItemLogResponse =
    await fetchRecordItemLogs(selectedRecordItemId, selectedMonthFrom, selectedMonthTo);
    const recordItemLogsData = convertToClientRecordItemLogList(recordItemLogResponse.data!);
    const monthlyRecordItemLogsData: DailyClientRecordItemLog[] = convertToDailyRecordItemLogData(recordItemLogsData);
    return addDayNotRecordItemLog(selectedRecordItemId, monthlyRecordItemLogsData, selectedMonthTo);
}