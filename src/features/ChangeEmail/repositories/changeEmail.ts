import { api } from "../../../lib/api-client/ApiClientProvider";
import { ChangeEmailResponse, ResponseBody } from "../types";

export const changeEmail = async (
  userId: number | null | undefined,
  email: string | null | undefined,
  password: string
): Promise<ChangeEmailResponse<ResponseBody>> => {
    return await api.put(`/users/${userId}/email`, {
      userId: userId,
      email: email,
      password: password,
    });
};
