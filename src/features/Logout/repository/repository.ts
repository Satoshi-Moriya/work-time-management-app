import axios, { AxiosError } from "axios";

import { LogoutResponse } from "../types";

export const logout = async (): Promise<LogoutResponse> => {

  const response = await axios
    .post("http://localhost:8080/logout")
    .then((response) => {
      return {
        status: response.status
      };
    })
    .catch((error: AxiosError) => {
      return {
        status: error.response?.status || 500
      };
    });

  return response;
};
