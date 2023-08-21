import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
});

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async(error: AxiosError) => {

    if (error.response?.status === 403) {
      try {
        // 新しいアクセストークンとリフレッシュトークンをcookieにセット
        await api.post('/refresh-token');
        // 新しいアクセストークンで認証リクエストを再実行
        if (error.config) {
          return axios.request(error.config);
        } else {
          return Promise.reject(new Error("No config available in error object."));
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error.message || "予期せぬ問題が発生しました。");
  }
)