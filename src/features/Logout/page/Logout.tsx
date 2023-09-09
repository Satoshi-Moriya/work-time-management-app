import { AiOutlineArrowRight } from "react-icons/ai";

import Toast from "../../Toast/components/Toast";
import { useLogout } from "../hooks/useLogout";

const Logout = () => {
  const [toast, {setToast, logoutHandler}] = useLogout();

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
};

export default Logout;