import axios from "axios";

import { ChangePasswordResponse, ResponseBody } from "../types";

export const changePassword = async (
  userId: number | null | undefined,
  currentPassword: string,
  newPassword: string | null | undefined
): Promise<ChangePasswordResponse<ResponseBody>> => {
  const response = await axios
    .put(`http://localhost:8080/users/${userId}/password`, {
      userId: userId,
      currentPassword: currentPassword,
      newPassword: newPassword
    })
    .then((response) => {
      return {
        status: response.status,
        data: response.data
      };
    })
    .catch((error) => {
      return {
        status: error.response.status || 500,
        data: null
      };
    });

  return response;
};
