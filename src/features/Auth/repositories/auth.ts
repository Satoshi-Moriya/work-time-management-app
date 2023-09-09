import { AxiosError, AxiosResponse } from "axios"

import { AuthResponse } from "../types";
import { api } from "../../../lib/api-client/ApiClientProvider";

export const auth = async(): Promise<AuthResponse> => {
  const response = await api.get("/auth/user")
  .then((res: AxiosResponse<AuthResponse>) => {
    return {
      success: res.data.success,
      message: res.data.message,
      authUserId: res.data.authUserId,
      authUserEmail: res.data.authUserEmail
    };
  }).catch((err: AxiosError) => {
    return {
      success: false,
      message: err.message,
      authUserId: null,
      authUserEmail: null
    }
  });

  return response;
}