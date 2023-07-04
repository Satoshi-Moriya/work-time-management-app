import { useNavigate } from "react-router-dom"

const Cancel = () => {
  const navigate = useNavigate();

  const accountDeleteHandler = () => {
    const confirm = window.confirm("本当にアカウントを削除してもよろしいですか？")
    if (confirm) {
      navigate("/login");
    }
  }

  return (
    <div className="p-10">
      <h3 className="text-l font-bold">解約</h3>
      <p className="mt-8">下記ボタンを押すとアカウントが削除されます。</p>
      <div className="mt-8">
        <button onClick={accountDeleteHandler} type="submit" className="bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg text-white font-bold px-3 py-2">退会する</button>
      </div>
    </div>
  );
}

export default Cancel;
