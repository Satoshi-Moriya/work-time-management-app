import axios from "axios";

import Config from "../../../config";
import { UserData } from "../types";

export const login = async(
  email: string | null | undefined,
  password: string
) => {
  console.log(Config.apiBaseUrl);
  // responseのinterceptorsがつけたくないから、直接csrfTokenつけている
  const csrfToken = await axios.post(`${Config.apiBaseUrl}/csrf`, null, {
    withCredentials: true
  });
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
    "X-CSRF-TOKEN": csrfToken.data.token
  };
  return await axios.post<UserData>(`${Config.apiBaseUrl}/login`, {
    userEmail: email,
    userPassword: password
  }, {
    withCredentials: true,
    headers: headers
  });
};