import { AxiosResponse } from "axios";
import { api } from "../../../lib/api-client/ApiClientProvider";

export const fetchEmail = async (
  userId: number | null | undefined
): Promise<AxiosResponse> => {
    return await api.get(`/users/${userId}/email`);
};
