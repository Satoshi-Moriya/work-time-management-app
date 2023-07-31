import axios, { AxiosError } from "axios";

import { LoginResponse, UserData } from "../types";

axios.defaults.withCredentials = true;

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse<UserData>> => {
  // curl -X POST --include -H "Content-Type: application/json" -d '{"userEmail": "moriyas@example.com", "userPassword": "test1234"}' localhost:8080/login
  // ToDo anyをなくす
  const response: any = await axios
    .post<UserData>("http://localhost:8080/login", {
      userEmail: email,
      userPassword: password,
    })
    .then((response) => {
      return {
        status: response.status,
        message: response.statusText,
        headers: response.headers,
        data: response.data,
      };
    })
    .catch((error: AxiosError) => {
      return {
        status: error.response?.status || 500,
        message:
          error.message ||
          "メールアドレスかパスワードが間違っており、ログインに失敗しました。",
        headers: null,
        data: null,
      };
    });

  return response;
};
