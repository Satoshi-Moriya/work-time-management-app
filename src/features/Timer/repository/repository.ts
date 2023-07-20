import axios, { AxiosError, AxiosResponse } from "axios";

export const createWorkLog = async (
    userId: number,
    workLogDate: string,
    workLogStartTime: string,
    workLogEndTime: string,
    workLogTime: number
  ): Promise<AxiosResponse | AxiosError> => {

  const response = await axios.post("http://localhost:8080/work-log", {
      workLogUserId: userId,
      workLogDate: workLogDate,
      workLogStartTime: workLogStartTime,
      workLogEndTime: workLogEndTime,
      workLogSeconds: workLogTime
    }).catch((error) => {
      return error;
    });

  return response;
}
