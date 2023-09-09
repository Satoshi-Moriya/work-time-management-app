import axios, { AxiosError } from "axios";

import { ErrorResponse, SuccessResponse, UserData } from "../types";

const formatTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const padZero = (value: number) => {
  return value.toString().padStart(2, '0');
};

export const createUser = async (
    email: string,
    password: string
): Promise<SuccessResponse<UserData> | ErrorResponse> => {
  const response = await axios.post<UserData>("http://localhost:8080/auth/signup", {
      userEmail: email,
      userPassword: password,
      createdAt: formatTime(new Date())
  }).then((response) => {
    return {
      status: response.status,
      message: response.statusText,
      data: response.data
    };
  }).catch((error: AxiosError) => {
    return {
      status: error.response?.status || 500,
      message: error.message || "登録に失敗しました。少し時間を置いてから、もう一度お試しください。"
    };
  });

  return response;
}
