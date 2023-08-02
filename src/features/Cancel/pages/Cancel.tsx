import { useNavigate } from "react-router-dom"
import { deleteUser } from "../repository/repository";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/components/AuthProvider";

const Cancel = () => {
  const navigate = useNavigate();
  const [failToast, setFailToast] = useState(false);
  const [userId] = useContext(AuthContext)

  const accountDeleteHandler = async () => {
    const confirm = window.confirm("本当にアカウントを削除してもよろしいですか？")
    if (confirm) {
      const response = await deleteUser(userId);
      if ( response.status === 204 ) {
        navigate("/login");
      } else {
        setFailToast(true);
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
        failToast && (
          <div>
            <p>予期せぬ問題が発生し、アカウントを削除できませんでした。時間をおいて再度お試しください。</p>
          </div>
        )
      }
    </div>
  );
}

export default Cancel;
