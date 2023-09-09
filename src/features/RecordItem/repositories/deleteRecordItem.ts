import { api } from "../../../lib/api-client/ApiClientProvider";

export const deleteRecordItem = async(
  recordItemId: number
) => {
  return await api.delete(`/record-items/${recordItemId}`);
};
