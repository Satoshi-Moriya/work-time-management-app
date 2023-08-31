import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../features/Auth/components/AuthProvider";

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
});

type ApiClientProviderProps = {
  children: React.ReactElement
}

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
            const csrfToken = await axios.post("http://localhost:8080/csrf");
            const headers = {
              "Content-Type": "application/json;charset=utf-8",
              "X-CSRF-TOKEN": csrfToken.data.token
            };
            // 新しいアクセストークンとリフレッシュトークンをcookieにセット
            await axios.post('http://localhost:8080/refresh-token', null, {
              withCredentials: true,
              headers: headers
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
      api.interceptors.response.eject(responseInterceptor)
    }
  }, [])

  return <>{children}</>
}

export default ApiClientProvider;