import { Link, Outlet } from "react-router-dom";

const Setting = () => {
  return (
    <>
      <main className="grow flex flex-col items-center justify-center">
        <p>設定ページ</p>
        <div>
          <Link to="changemail">メールアドレス変更</Link>
          <Link to="changepassword">パスワード変更</Link>
          <Link to="cancel">解約</Link>
        </div>
        <Outlet />
      </main>
    </>
  );
}

export default Setting;
