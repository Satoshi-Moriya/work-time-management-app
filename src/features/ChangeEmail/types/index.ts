export type ChangeEmailResponse<T> = {
  status: number;
  data: T | null;
}

export type ResponseBody = {
  message: string | null;
}