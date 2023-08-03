import axios, { AxiosError, AxiosResponse } from "axios"

import { AuthResponse, AuthUserData } from "../types";

export const auth = async (): Promise<AuthResponse<AuthUserData>> => {
  const response = await axios
  .get("http://localhost:8080/auth/user")
  .then((res: AxiosResponse<AuthResponse<AuthUserData>>) => {
    return {
      success: res.data.success,
      message: res.data.message,
      authUserData: res.data.authUserData
    };
  }).catch((err: AxiosError) => {
    return {
      success: false,
      message: err.message,
      authUserData: null
    }
  });

  return response;
}