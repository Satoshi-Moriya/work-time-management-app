import { LogoutResponse } from "../types";
import { api } from "../../../lib/api-client/api-client";

export const logout = async (): Promise<LogoutResponse> => {

  return await api.post("/logout");
};
