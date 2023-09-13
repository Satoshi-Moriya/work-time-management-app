import { Outlet } from "react-router-dom";

import SettingNavLink from "../../SideBar/components/SettingNavLink";

const Setting = () => {
  return (
    <>
      <main className="grow md:flex md:pl-48 mt-52 md:mt-0 h-screen">
        <div className="py-10 px-7 h-full">
          <div className="h-full md:flex">
            <div className="border-b md:pr-10 md:border-r md:border-b-0">
              <h2 className="text-2xl md:text-3xl font-bold">アカウント設定</h2>
              <div className="flex flex-col items-start ">
                <SettingNavLink url="changeemail">メールアドレス変更</SettingNavLink>
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
};

export default Setting;
