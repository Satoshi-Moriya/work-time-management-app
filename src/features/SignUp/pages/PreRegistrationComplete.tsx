import { Link } from "react-router-dom";

const PreRegistrationComplete = () => {

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10">
        <h1 className="text-7xl text-center">登録完了</h1>
        <div className="mt-16">
          <p className="text-lg text-center">ユーザー登録が完了しました。</p>
        </div>
        <div className="mt-8 text-center">
          <Link to="../login" relative="path" className="text-2xl underline text-blue-500 hover:opacity-70">ログインページへ戻る</Link>
        </div>
      </div>
    </div>
  );
};

export default PreRegistrationComplete;