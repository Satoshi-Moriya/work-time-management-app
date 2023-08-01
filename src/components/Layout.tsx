import React from 'react'
import { RxTimer } from "react-icons/rx";
import { ImTable2 } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";
import { Outlet } from "react-router-dom";

import MenuItem from "../features/SideBar/components/MenuItem";
import Clock from '../features/SideBar/components/Clock';
import Logout from '../features/Logout/page/Logout';

const Layout: React.FC = () => {
    return (
        <div className="App flex items-stretch">
          <div className="bg-thin-gray h-screen py-5 flex flex-col fixed top-0 left-0 bottom-0 w-48">
            <Clock />
            <nav className="mt-2">
              <ul>
                <MenuItem icon={<RxTimer />} text="タイマー" url="/" />
                <MenuItem icon={<ImTable2 />} text="勤怠表" url="worklog" />
                <MenuItem icon={<IoSettingsSharp />} text="設定" url="setting" />
              </ul>
            </nav>
            <div className="mt-auto mx-auto">
              <Logout />
            </div>
          </div>
          <Outlet />
        </div>
    )
}

export default Layout