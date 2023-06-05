import './App.css';
import { RxTimer } from "react-icons/rx";
import { ImTable2 } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";
import { AiOutlineArrowRight } from "react-icons/ai";

import MenuItem from "../components/MenuItem";

const App = () => {
  return (
    <div className="flex items-stretch">
      <div className="bg-thin-gray h-screen p-5 flex flex-col">
        <time>2023/05/26/15:23:22</time>
        <nav className="">
          <ul>
            <MenuItem icon={<RxTimer />} text="タイマー" />
            <MenuItem icon={<ImTable2 />} text="勤怠表" />
            <MenuItem icon={<IoSettingsSharp />} text="設定" />
          </ul>
        </nav>
        <div className="mt-auto mx-auto">
          <a href="/logout" className="flex items-center"><span>ログアウト</span><AiOutlineArrowRight className="ml-1" /></a>
        </div>
      </div>
      <main>

      </main>
    </div>
  );
}

export default App;
