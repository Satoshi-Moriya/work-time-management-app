import Toast from "../../Toast/components/Toast";
import { useCancel } from "../hooks/useCancel";

const Cancel = () => {
  const [toast, {setToast, accountDeleteHandler}] = useCancel();

  return (
    <div className="p-6 md:p-10">
      <h3 className="text-l font-bold">解約</h3>
      <p className="mt-8">下記ボタンを押すとアカウントが削除されます。（現在アカウントの削除はできません）</p>
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
};

export default Cancel;
