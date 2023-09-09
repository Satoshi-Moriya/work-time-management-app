import axios from "axios";

const formatTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const padZero = (value: number) => {
  return value.toString().padStart(2, '0');
};

export const createUser = async (
    email: string,
    password: string
) => {
  // responseのinterceptorsがつけたくないから、直接csrfTokenつけている
  const csrfToken = await axios.post("http://localhost:8080/csrf", null, {
    withCredentials: true
  });
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
    "X-CSRF-TOKEN": csrfToken.data.token
  };
  return await axios.post("http://localhost:8080/auth/signup", {
      userEmail: email,
      userPassword: password,
      createdAt: formatTime(new Date())
  }, {
    withCredentials: true,
    headers: headers
  });
};
