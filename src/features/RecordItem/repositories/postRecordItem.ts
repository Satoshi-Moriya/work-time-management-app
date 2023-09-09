import { api } from "../../../lib/api-client/ApiClientProvider";

export const postRecordItem = async(
  userId: number | null | undefined,
  recordItemText: string
) => {
  return await api.post("/record-items", {
    userId: userId,
    recordItemName: recordItemText
  });
}
