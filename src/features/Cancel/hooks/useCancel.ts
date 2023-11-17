import { useContext, useState } from "react";

import { deleteUser } from "../repositories/deleteUser";
import { AuthContext } from "../../Auth/components/AuthProvider";
import { useNavigate } from "react-router-dom";

export const useCancel = (): [
  {message: string | null, isSuccess: boolean | null },
  {
    setToast: React.Dispatch<React.SetStateAction<{message: string | null, isSuccess: boolean | null }>>,
    accountDeleteHandler: () => void
  }
] => {
  const navigate = useNavigate();
  const [userId, setUserId] = useContext(AuthContext);
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});

  const accountDeleteHandler = async() => {
    const confirm = window.confirm("本当にアカウントを削除してもよろしいですか？");
    if (confirm) {
      // try {
      //   const response = await deleteUser(userId);
      //   setToast({message: response.data.message, isSuccess: true});
      //   setUserId(null);
      //   navigate("/login");
      // } catch(error) {
      //   setToast({message: "予期せぬ問題が発生し、アカウントを削除できませんでした。時間をおいて再度お試しください。", isSuccess: false});
      // }
      setToast({message: "このアカウントは削除できませんでした。", isSuccess: false});
    }
  }

  return [toast, {setToast, accountDeleteHandler}];
};