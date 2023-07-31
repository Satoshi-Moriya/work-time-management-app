import axios, { AxiosError, AxiosResponse } from "axios"

import { AuthResponse } from "../types";

export const auth = async (): Promise<AuthResponse> => {
  const response = await axios
  .get("http://localhost:8080/auth/user")
  .then((res: AxiosResponse<AuthResponse>) => {
    return {
      success: res.data.success,
      message: res.data.message,
      authUserId: res.data.authUserId
    };
  }).catch((err: AxiosError) => {
    return {
      success: false,
      message: err.message,
      authUserId: null
    }
  });

  return response;
}