import { api } from "../../../lib/api-client/ApiClientProvider";

import { ChangeEmailResponse, ResponseBody } from "../types";

export const changeEmail = async (
  userId: number | null | undefined,
  password: string,
  email: string | null | undefined
): Promise<ChangeEmailResponse<ResponseBody>> => {
  const response = await api
    .put(`/users/${userId}/email`, {
      userId: userId,
      email: email,
      password: password,
    });

  return response;
};
