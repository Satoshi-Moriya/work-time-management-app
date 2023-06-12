import CustomDatePicker from "../components/CustomDatePicker";
import StackedBarChart from "../components/StackedBarChart";

const data: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
// const data: string[] = [];

const WorKLog = () => {

  return (
    <main className="grow flex flex-col ml-48">
      <div className="w-[1024px] my-24 mx-auto">
        <CustomDatePicker />
        <div className="mt-10">
          {
            !data.length ? <p>選択された月には記録がありません。</p>
          :
          <>
            <table className="w-80">
              <tbody>
                <tr>
                  <th className="border border-gray-500 px-4 py-2 bg-dark-gray">月合計稼働時間</th>
                  <td className="border border-gray-500 px-4 py-2 text-center">142:34</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-20 flex justify-end items-center">
              <span className="bg-[#BAD3FF] block w-5 h-5 mr-2"></span>
              <p className="">稼働時間</p>
            </div>
            <table className="table-auto w-full mt-2">
              <thead>
                <tr>
                  <th className="border border-gray-500 px-4 py-2 bg-dark-gray" rowSpan={2}>日付</th>
                  <th className="border border-gray-500 px-4 py-2 bg-dark-gray" rowSpan={2}>稼働時間</th>
                  <th className="border border-gray-500 px-4 py-2 bg-dark-gray" colSpan={24}>稼働グラフ</th>
                </tr>
                <tr>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">5</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">6</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">7</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">8</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">9</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">10</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">11</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">12</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">13</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">14</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">15</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">16</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">17</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">18</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">19</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">20</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">21</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">22</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">23</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">0</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">1</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">2</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">3</th>
                  <th className="border border-gray-500 px-1 py-1 bg-dark-gray">4</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((day, index) => (
                  <tr key={index}>
                    <td className="border border-gray-500 px-4 py-3 text-center">{day}（月）</td>
                    <td className="border border-gray-500 px-4 py-3 text-center">10:45</td>
                    <td className="border border-gray-500 px-4 py-3" colSpan={24} ><StackedBarChart /></td>
                  </tr>
                  ))
                }
              </tbody>
            </table>
          </>
        }
        </div>
      </div>
    </main>
  );
}

export default WorKLog;
