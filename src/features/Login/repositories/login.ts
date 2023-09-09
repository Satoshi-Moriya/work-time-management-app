import axios from "axios";
import { UserData } from "../types";

export const login = async(
  email: string | null | undefined,
  password: string
) => {
  // responseのinterceptorsがつけたくないからここだけは直接csrfTokenつけている
  const csrfToken = await axios.post("http://localhost:8080/csrf");
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
    "X-CSRF-TOKEN": csrfToken.data.token
  };
  return await axios.post<UserData>("http://localhost:8080/login", {
    userEmail: email,
    userPassword: password
  }, {
    withCredentials: true,
    headers: headers
  });
}