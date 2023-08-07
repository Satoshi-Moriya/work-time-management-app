import { useContext, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { logout } from "../repository/repository";
import { AuthContext } from "../../Auth/components/AuthProvider";
import Toast from "../../Toast/components/Toast";

const Logout = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});
  const [ , , setUserId ] = useContext(AuthContext);

  const logoutHandler = async () => {
    const response = await logout();
    if ( response.status === 200 ) {
      setUserId(null);
      navigate("/login");
    } else {
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