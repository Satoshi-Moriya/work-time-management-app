import { useContext, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { logout } from "../repository/repository";
import { AuthContext } from "../../Auth/components/AuthProvider";

const Logout = () => {
  const navigate = useNavigate();
  const [failToast, setFailToast] = useState(false);
  const [ , , setUserId ] = useContext(AuthContext);

  const logoutHandler = async () => {
    const response = await logout();
    if ( response.status === 200 ) {
      setUserId(null);
      navigate("/login");
    } else {
      setFailToast(true);
    }
  }

  return (
    <>
      <button onClick={logoutHandler} className="flex items-center hover:opacity-50 focus:opacity-50">
        <span>ログアウト</span><AiOutlineArrowRight className="ml-1" />
      </button>
      {
        failToast && (
          <div>
            <p>ログアウト失敗</p>
          </div>
        )
      }
    </>
  );
}

export default Logout;