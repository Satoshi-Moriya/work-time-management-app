import { useContext, useState } from "react";

import CustomDatePicker from "../components/CustomDatePicker";
import MonthlyTotalTime from "../components/MonthlyTotalTime";
import StackedBarChart from "../components/StackedBarChart";
import convertSecondsToTime from "../../../functions/convertSecondsToTime";
import { useWorkLog } from "../hooks/useWorkLog";
import Loading from "../../../components/Loading";
import { AuthContext } from "../../Auth/components/AuthProvider";
import EditModal from "../components/EditModal";

const WorKLog = () => {
  const [ userId ] = useContext(AuthContext);
  const [date, monthlyWorkLogData, error, isLoading, {dateChangeHandler}] = useWorkLog(userId);
  const [recordItems, setRecordItems] = useState(["ドラム練習", "稼働時間"]);
  const [selectedRecordItem, seSelectedRecordItem] = useState({text: "ドラム練習", value: "option1"});
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [editModalData, setEditModalData] = useState<{yyyymm: Date, userId: number, date: number}>({
    yyyymm: new Date(),
    userId: 0,
    date: 0
  });

  const selectedRecordItemChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.options[event.target.selectedIndex].text;
    seSelectedRecordItem({text: selectedText, value: event.target.value});
  }

  const workLogEditHandler = (yyyymm: Date, userId: number, date: number) => {
    setOpenModal('default');
    setEditModalData({yyyymm: yyyymm, userId: userId, date: date});
  }

  return (
    <main className="pl-48 w-full min-h-screen">
      {
        !error && recordItems.length !== 0 && (
        <div className="my-24 mx-auto px-7 w-[1137px] max-w-full">
          <select value={selectedRecordItem.value} onChange={selectedRecordItemChangeHandler} className="w-[200px] bg-gray-50 border border-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block p-1 hover:cursor-pointer">
            {
              recordItems.map((recordItem, index) => {
                return (
                  <option key={recordItem} value={`option${index + 1}`}>{recordItem}</option>
                );
              })
            }
          </select>
          <div className="mt-10">
            <CustomDatePicker selectedDate={date} onChange ={dateChangeHandler} />
          </div>
          <div className="mt-10">
            <MonthlyTotalTime dateSumSeconds={monthlyWorkLogData.map(data => data.workLogSumSeconds)} />
            {
              isLoading ? <Loading/>
            :
            <>
              <div className="mt-20 flex justify-end items-center">
                <span className="bg-[#BAD3FF] block w-5 h-5 mr-2"></span>
                <p className="">{selectedRecordItem.text}</p>
              </div>
              <div className="overflow-x-scroll">
                <table className="w-[1081px] mt-2 table-fixed border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="border-t border-l border-gray-500 px-4 py-2 bg-dark-gray w-[100px] sticky left-0 z-10" rowSpan={2}>日付</th>
                      <th className="border-t border-l border-gray-500 px-4 py-2 bg-dark-gray w-[100px] sticky left-[100px] z-20" rowSpan={2}>時間</th>
                      <th className="border-t border-x border-gray-500 px-4 py-2 bg-dark-gray sticky left-[200px] z-20" rowSpan={2}>編集</th>
                      <th className="border-t border-r border-gray-500 px-4 py-2 bg-dark-gray w-[801px]" colSpan={24}>時間グラフ</th>
                    </tr>
                    <tr>
                      <th className="border-t border-gray-500 px-1 py-1 bg-dark-gray">0</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">1</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">2</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">3</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">4</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">5</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">6</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">7</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">8</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">9</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">10</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">11</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">12</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">13</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">14</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">15</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">16</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">17</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">18</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">19</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">20</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">21</th>
                      <th className="border-t border-l border-gray-500 px-1 py-1 bg-dark-gray">22</th>
                      <th className="border-t border-l border-x border-gray-500 px-1 py-1 bg-dark-gray">23</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      monthlyWorkLogData.map((data, index) => (
                        <tr key={index} className="group">
                          <td className="border-t border-l group-last:border-b border-gray-500 px-2 py-3 text-center sticky left-0 z-10 bg-white">{data.date}（{data.day}）</td>
                          <td className="border-t border-l group-last:border-b border-gray-500 px-2 py-3 text-center sticky left-[100px] z-20 bg-white">{convertSecondsToTime(data.workLogSumSeconds)}</td>
                          <td className="border-t border-x group-last:border-b border-gray-500 px-2 py-3 text-center sticky left-[200px] z-20 bg-white">
                            <button onClick={() => workLogEditHandler(date, data.workLogUserId, data.date)} className="text-sm bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg text-white font-bold px-2 py-1">編集</button>
                          </td>
                          <td className="border-t border-r group-last:border-b border-gray-500 px-0 py-3 w-[801px] bg-white relative" colSpan={24} ><StackedBarChart timeData={data.workLogTime} /></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <EditModal openModal={openModal} setOpenModal={setOpenModal} editModalData={editModalData} recordItemText={selectedRecordItem.text}/>
            </>
          }
          </div>
        </div>
      )}
      {error && <p className="flex justify-center items-center h-full">{error}</p>}
      {recordItems.length === 0 && <p className="flex justify-center items-center h-full">記録項目の登録がまだありません。</p>}
    </main>
  );
}

export default WorKLog;
