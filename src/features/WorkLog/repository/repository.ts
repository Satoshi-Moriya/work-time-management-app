import axios from "axios"
import { WorkLogData } from "../types";

export const getMonthlyWorkLog = async (
  userId: number,
  fromQuery: string,
  toQuery: string
): Promise<WorkLogData[] | Error> => {

  const response = await axios.get(`http://localhost:8080/work-logs/user-id/${userId}`, {
    params: {
      from: fromQuery,
      to: toQuery
    }
  }).catch((error) => {
    return error;
  })
  return response.data;
}