import './App.css';
import { RxTimer } from "react-icons/rx";
import { ImTable2 } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";
import { AiOutlineArrowRight } from "react-icons/ai";

import MenuItem from "../components/MenuItem";
import Clock from '../components/Clock';

const App = () => {
  return (
    <div className="flex items-stretch">
      <div className="bg-thin-gray h-screen py-5 flex flex-col">
        <Clock />
        <nav className="mt-2">
          <ul>
            <MenuItem icon={<RxTimer />} text="タイマー" />
            <MenuItem icon={<ImTable2 />} text="勤怠表" />
            <MenuItem icon={<IoSettingsSharp />} text="設定" />
          </ul>
        </nav>
        <div className="mt-auto mx-auto">
          <a href="/logout" className="flex items-center hover:opacity-50 focus:opacity-50"><span>ログアウト</span><AiOutlineArrowRight className="ml-1" /></a>
        </div>
      </div>
      <main className="grow flex flex-col items-center justify-center">
        <p className="text-9xl">00:00:00</p>
        <div className="mt-20 flex">
          <div><a href="#" className="bg-dark-gray py-3 px-5 rounded-lg text-xl hover:opacity-50 focus:opacity-50">業務開始</a></div>
          <div className="ml-6"><a href="#" className="bg-dark-gray py-3 px-5 rounded-lg text-xl hover:opacity-50 focus:opacity-50">業務終了</a></div>
        </div>
      </main>
    </div>
  );
}

export default App;
