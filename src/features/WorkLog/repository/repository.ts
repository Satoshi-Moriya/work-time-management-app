import axios from "axios"
import { WorkLogData, FetchMonthlyWorkLogResponse } from "../types";

export const fetchMonthlyWorkLog = async (
  userId: number | null | undefined,
  fromQuery: string,
  toQuery: string
): Promise<FetchMonthlyWorkLogResponse<WorkLogData[]>> => {

  const response = await axios.get<WorkLogData[]>(`http://localhost:8080/work-log/users/${userId}`, {
    params: {
      from: fromQuery,
      to: toQuery
    }
  }).then((response) => {
    return {
      status: response.status,
      data: response.data
    }
  }).catch((error) => {
    const errorStatus: number = error.response ? error.response.status : 500;
    return {
      status: errorStatus,
      data: null
    }
  })
  console.log(response);
  return response;
}