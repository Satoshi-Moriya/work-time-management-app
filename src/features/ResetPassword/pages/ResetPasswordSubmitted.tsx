import { Link } from "react-router-dom";

const ResetPasswordSubmitted = () => {

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10">
        <h1 className="text-7xl text-center">送信完了</h1>
        <div className="mt-16">
          <p className="text-lg">登録されているメールアドレスにパスワード再設定用のURLを送信しました。</p>
          <p className="text-lg">届かない場合は、アカウントが存在しないか、入力したメールアドレスが間違っています。</p>
        </div>
        <div className="mt-8 text-center">
          <Link to="../login" relative="path" className="text-2xl underline text-blue-500 hover:opacity-70">ログインページへ戻る</Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordSubmitted;