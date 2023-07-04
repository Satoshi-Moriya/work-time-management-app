import { Link } from "react-router-dom";

const PreRegistrationComplete = () => {

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10">
        <h1 className="text-7xl text-center">仮登録完了</h1>
        <div className="mt-16">
          <p className="text-lg">下記メールアドレス宛に本登録のご案内を送信しました。</p>
          <p className="text-lg">メールに記載されている認証用URLをクリックして本登録を行なってください。</p>
        </div>
        <div className="mt-8 text-center">
          <Link to="../login" relative="path" className="text-2xl underline text-blue-500 hover:opacity-70">ログインページへ戻る</Link>
        </div>
      </div>
    </div>
  );
}

export default PreRegistrationComplete;