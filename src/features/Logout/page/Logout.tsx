import { useContext, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { logout } from "../repository/repository";
import { AuthContext } from "../../Auth/components/AuthProvider";
import Toast from "../../Toast/components/Toast";
import { api } from "../../../lib/api-client/ApiClientProvider";

const Logout = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});
  const [ , setUserId ] = useContext(AuthContext);

  const logoutHandler = async () => {
    try {
      const csrfToken = await axios.post("http://localhost:8080/csrf");
      const headers = {
        "Content-Type": "application/json;charset=utf-8",
        "X-CSRF-TOKEN": csrfToken.data.token
      };
      await api.post("/logout", null, {
        headers: headers
      });
      setUserId(null);
      navigate("/login");
    } catch(error) {
      setToast({message: "予期せぬエラーが起こり、ログアウトができませんでした。", isSuccess: false});
    }
  }

  return (
    <>
      <button onClick={logoutHandler} className="flex items-center hover:opacity-50 focus:opacity-50">
        <span>ログアウト</span><AiOutlineArrowRight className="ml-1" />
      </button>
      {
        toast.isSuccess != null && (
          <Toast toast={toast} setToast={setToast} />
        )
      }
    </>
  );
}

export default Logout;