import { useNavigate } from "react-router-dom"
import { deleteUser } from "../repository/repository";
import { useContext, useState } from "react";
import axios from "axios";

import { AuthContext } from "../../Auth/components/AuthProvider";
import Toast from "../../Toast/components/Toast";
import { api } from "../../../lib/api-client/api-client";

const Cancel = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});
  const [userId, , setUserId] = useContext(AuthContext)

  const accountDeleteHandler = async () => {
    const confirm = window.confirm("本当にアカウントを削除してもよろしいですか？")
    if (confirm) {
      try {
        const csrfToken = await axios.post("http://localhost:8080/csrf");
        const headers = {
          "Content-Type": "application/json;charset=utf-8",
          "X-CSRF-TOKEN": csrfToken.data.token
        };
        const response = await api.delete(`/users/${userId}`, {
          headers: headers
        });
        setToast({message: response.data.message, isSuccess: true});
        setUserId(null);
        navigate("/login");
      } catch(error) {
        setToast({message: "予期せぬ問題が発生し、アカウントを削除できませんでした。時間をおいて再度お試しください。", isSuccess: false});
      }
    }
  }

  return (
    <div className="p-10">
      <h3 className="text-l font-bold">解約</h3>
      <p className="mt-8">下記ボタンを押すとアカウントが削除されます。</p>
      <div className="mt-8">
        <button onClick={accountDeleteHandler} type="submit" className="bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg text-white font-bold px-3 py-2">退会する</button>
      </div>
      {
        toast.isSuccess != null && (
          <Toast toast={toast} setToast={setToast} />
        )
      }
    </div>
  );
}

export default Cancel;
