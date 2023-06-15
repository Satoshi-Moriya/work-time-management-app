import { Outlet } from "react-router-dom";

import SettingNavLink from "../components/SettingNavLink";

const Setting = () => {
  return (
    <>
      <main className="grow flex pl-48 h-screen">
        <div className="py-10 px-7 h-full">
          <div className="h-full flex">
            <div className="pr-10 border-r">
              <h2 className="text-3xl font-bold">アカウント設定</h2>
              <div className="flex flex-col items-start ">
                <SettingNavLink url="changemail">メールアドレス変更</SettingNavLink>
                <SettingNavLink url="changepassword">パスワード変更</SettingNavLink>
                <SettingNavLink url="cancel">解約</SettingNavLink>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

export default Setting;
