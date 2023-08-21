import { ChangePasswordResponse, ResponseBody } from "../types";
import { api } from "../../../lib/api-client/api-client";

export const changePassword = async (
  userId: number | null | undefined,
  currentPassword: string,
  newPassword: string | null | undefined
): Promise<ChangePasswordResponse<ResponseBody>> => {
  return await api
    .put(`http://localhost:8080/users/${userId}/password`, {
      userId: userId,
      currentPassword: currentPassword,
      newPassword: newPassword
    });
};
