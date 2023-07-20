import CustomDatePicker from "../components/CustomDatePicker";
import MonthlyTotalTime from "../components/MonthlyTotalTime";
import StackedBarChart from "../components/StackedBarChart";
import convertSecondsToTime from "../../../functions/convertSecondsToTime";
import { useWorkLog } from "../hooks/useWorkLog";;

const userId = 1;

const WorKLog = () => {
  const [date, monthlyWorkLogData, error, {dateChangeHandler}] = useWorkLog(userId);

  return (
    <main className="pl-48 w-full">
      {
        !error && (
        <div className="my-24 mx-auto px-7 w-[1080px] max-w-full">
          <CustomDatePicker selectedDate={date} onChange ={dateChangeHandler}/>
          <div className="mt-10">
            <MonthlyTotalTime dateSumSeconds={monthlyWorkLogData.map(data => data.workLogSumSeconds)} />
            {
              !monthlyWorkLogData.length ? <p>選択された月には記録がありません。</p>
            :
            <>
              <div className="mt-20 flex justify-end items-center">
                <span className="bg-[#BAD3FF] block w-5 h-5 mr-2"></span>
                <p className="">稼働時間</p>
              </div>
              <div className="overflow-x-scroll">
                <table className="w-[1025px] mt-2 table-fixed border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="border-t border-l border-gray-500 px-4 py-2 bg-dark-gray sticky left-0 z-10" rowSpan={2}>日付</th>
                      <th className="border-t border-x border-gray-500 px-4 py-2 bg-dark-gray sticky left-[112px] z-20" rowSpan={2}>稼働時間</th>
                      <th className="border-t border-r border-gray-500 px-4 py-2 bg-dark-gray w-[801px]" colSpan={24}>稼働グラフ</th>
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
                          <td className="border-t border-l group-last:border-b border-gray-500 px-4 py-3 text-center sticky left-0 z-10 bg-white">{data.date}（{data.day}）</td>
                          <td className="border-t border-x group-last:border-b border-gray-500 px-4 py-3 text-center sticky left-[112px] z-20 bg-white">{convertSecondsToTime(data.workLogSumSeconds)}</td>
                          <td className="border-t border-r group-last:border-b border-gray-500 px-0 py-3 w-[801px] bg-white relative" colSpan={24} ><StackedBarChart timeData={data.workLogTime} /></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </>
          }
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </main>
  );
}

export default WorKLog;
