import axios from "axios";

import { ChangeEmailResponse } from "../types";

export const changeEmail = async (
  userId: number | null | undefined,
  password: string,
  email: string | null | undefined
): Promise<ChangeEmailResponse> => {
  const response = await axios
    .patch(`http://localhost:8080/users/${userId}/email`, {
      userId: userId,
      userEmail: email,
      userPassword: password,
    })
    .then((response) => {
      return {
        status: response.status
      };
    })
    .catch((error) => {
      return {
        status: error.response.status || 500,
      };
    });

  return response;
};
