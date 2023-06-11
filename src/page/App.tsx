import { RxTimer } from "react-icons/rx";
import { ImTable2 } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Routes, Route } from "react-router-dom";

import MenuItem from "../components/MenuItem";
import Clock from '../components/Clock';
import Timer from "./Timer";
import WorKLog from "./WorkLog";
import Setting from "./Setting";
import ChangeMail from "./ChangeMail";
import ChangePassword from "./ChangePassword";
import Cancel from "./Cancel";

const App = () => {
  return (
    <div className="App flex items-stretch">
      <div className="bg-thin-gray h-screen py-5 flex flex-col">
        <Clock />
        <nav className="mt-2">
          <ul>
            <MenuItem icon={<RxTimer />} text="タイマー" url="/" />
            <MenuItem icon={<ImTable2 />} text="勤怠表" url="/worklog" />
            <MenuItem icon={<IoSettingsSharp />} text="設定" url="/setting" />
          </ul>
        </nav>
        <div className="mt-auto mx-auto">
          <a href="/logout" className="flex items-center hover:opacity-50 focus:opacity-50"><span>ログアウト</span><AiOutlineArrowRight className="ml-1" /></a>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Timer />}/>
        <Route path="worklog" element={<WorKLog />}/>
        <Route path="setting" element={<Setting />}>
          <Route path="changemail" element={<ChangeMail />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="cancel" element={<Cancel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
