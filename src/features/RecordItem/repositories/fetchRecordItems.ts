import { api } from "../../../lib/api-client/ApiClientProvider";

export const fetchRecordItems = async(
  userId: number | null | undefined
) => {
  return await api.get(`/record-items/${userId}`);
}
