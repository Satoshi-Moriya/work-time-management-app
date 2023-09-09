export type ErrorResponse = {
  status: number;
  message: string;
};

export type SuccessResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type UserData = {
  email: number;
};