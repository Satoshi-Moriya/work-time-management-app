import { AxiosError, AxiosResponse } from "axios";

import { api } from "../../../lib/api-client/api-client";

export const createWorkLog = async (
    userId: number,
    workLogDate: string,
    workLogStartTime: string,
    workLogEndTime: string,
    workLogTime: number
  ): Promise<AxiosResponse | AxiosError> => {

  return await api.post("/work-log", {
      workLogUserId: userId,
      workLogDate: workLogDate,
      workLogStartTime: workLogStartTime,
      workLogEndTime: workLogEndTime,
      workLogSeconds: workLogTime
    });
}
