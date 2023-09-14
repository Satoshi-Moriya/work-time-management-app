import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Config from "../../config";
import { AuthContext } from "../../features/Auth/components/AuthProvider";

const headers = {
  "Content-Type": "application/json",
};

export const api = axios.create({
  baseURL: Config.apiBaseUrl,
  withCredentials: true,
  headers
});

api.interceptors.request.use(
  async (request) => {
    const csrfToken = await axios.post(`${Config.apiBaseUrl}/csrf`, null, {
      withCredentials: true
    });
    request.headers["X-CSRF-TOKEN"] = csrfToken.data.token;
    return request;
  }
);

type ApiClientProviderProps = {
  children: React.ReactElement
};

const ApiClientProvider: React.FC<ApiClientProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [ , setUserId ] = useContext(AuthContext);

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      async(error: AxiosError) => {

        if (error.response?.status === 403) {
          try {
            // 新しいアクセストークンとリフレッシュトークンをcookieにセット
            await axios.post(`${Config.apiBaseUrl}/refresh-token`, null, {
              withCredentials: true,
              // アクセストークンの有効期限れで通る場所なので、その時のリクエストに設定されているheader情報（csrfトークン）をつける
              headers: error.config?.headers
            });
            // 新しいアクセストークンで認証リクエストを再実行
            if (error.config) {
              return axios.request(error.config);
            } else {
              return Promise.reject(new Error("No config available in error object."));
            }
          } catch (refreshError) {
            setUserId(null);
            navigate("/login");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error.message || "予期せぬ問題が発生しました。");
      }
    );

    // クリーンアップ
    return () => {
      api.interceptors.response.eject(responseInterceptor);
    }
  }, []);

  return <>{children}</>;
};

export default ApiClientProvider;