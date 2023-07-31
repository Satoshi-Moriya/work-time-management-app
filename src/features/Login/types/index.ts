import { AxiosHeaders } from "axios";

export type LoginResponse<T> = {
  status: number;
  message: string;
  headers: AxiosHeaders | null;
  data: T | null;
};

export type UserData = {
  userId: number;
  userEmail: string;
  userPassword: string;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
};
