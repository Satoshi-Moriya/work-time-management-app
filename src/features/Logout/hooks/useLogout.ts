import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../Auth/components/AuthProvider";
import { logout } from "../repositories/logout";


export const useLogout = (): [
  {message: string | null, isSuccess: boolean | null },
  {
    setToast: React.Dispatch<React.SetStateAction<{message: string | null, isSuccess: boolean | null }>>,
    logoutHandler: () => void
  }
] => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});
  const [ , setUserId ] = useContext(AuthContext);

  const logoutHandler = async() => {
    try {
      await logout();
      setUserId(null);
      navigate("/login");
    } catch(error) {
      setToast({message: "予期せぬエラーが起こり、ログアウトができませんでした。", isSuccess: false});
    }
  }

  return [toast, {setToast, logoutHandler}];
}