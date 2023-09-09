import { api } from "../../../lib/api-client/ApiClientProvider";
import { RecordItemLogType } from "../types";

export const fetchRecordItemLogs = async(
  selectedRecordItemId: number,
  selectedMonthFrom: string,
  selectedMonthTo: string
) => {
  return await api.get<RecordItemLogType[]>(`/record-item-logs/${selectedRecordItemId}`, {
    params: {
      from: selectedMonthFrom,
      to: selectedMonthTo
    }
  });
};
