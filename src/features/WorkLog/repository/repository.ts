import { WorkLogData, FetchMonthlyWorkLogResponse } from "../types";
import { api } from "../../../lib/api-client/api-client";

export const fetchMonthlyWorkLog = async (
  userId: number | null | undefined,
  fromQuery: string,
  toQuery: string
): Promise<FetchMonthlyWorkLogResponse<WorkLogData[]>> => {

  return await api.get<WorkLogData[]>(`/work-log/users/${userId}`, {
    params: {
      from: fromQuery,
      to: toQuery
    }
  });
}