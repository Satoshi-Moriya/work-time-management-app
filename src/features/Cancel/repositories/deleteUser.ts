import { api } from "../../../lib/api-client/ApiClientProvider";

export const deleteUser = async(
  userId: number | null | undefined
) => {
  return await api.delete(`/users/${userId}`);
};