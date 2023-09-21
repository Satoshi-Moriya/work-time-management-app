import { Link } from "react-router-dom";

const PreRegistrationComplete = () => {

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="p-10">
        <h2 className="text-center text-4xl">登録完了</h2>
        <div className="mt-16">
          <p className="text-lg text-center">ユーザー登録が完了しました。</p>
        </div>
        <div className="mt-8 text-center">
          <Link to="../login" relative="path" className="text-xl md:text-2xl underline text-blue-500 hover:opacity-70">ログインページへ戻る</Link>
        </div>
      </div>
    </main>
  );
};

export default PreRegistrationComplete;