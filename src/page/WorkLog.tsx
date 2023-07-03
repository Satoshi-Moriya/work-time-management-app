import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from 'date-fns/locale/ja';
import axios from "axios";
import "react-datepicker/dist/react-datepicker.min.css"

import MonthlyTotalTime from "../components/MonthlyTotalTime";
import StackedBarChart from "../components/StackedBarChart";
import { WorkLogsData, WorkLogData, TimeRange } from "../types";
import getLastDayOfMonth from "../functions/getLastDayOfMonth";
import '../components/CustomDatePicker.css';
import convertTimeToSeconds from "../functions/convertTimeToSeconds";

registerLocale('ja', ja);
const WEEK = ["日", "月", "火", "水", "木", "金", "土"];

export const getWeekdayFromDate = (dateString: string): string => WEEK[new Date(dateString).getDay()];

const WorKLog = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const lastDayOfCurrentMonth = getLastDayOfMonth(currentYear, currentMonth);
  const initFromQueryParam = currentYear + currentMonth.toString().padStart(2, "0") + "01";
  const initToQueryParam = currentYear + currentMonth.toString().padStart(2, "0") + lastDayOfCurrentMonth;

  const [fromQuery, setFromQuery] = useState(initFromQueryParam);
  const [toQuery, setToQuery] = useState(initToQueryParam);
  const [date, setDate] = useState(currentDate);
  const [workLogsData, setWorkLogsData] = useState<WorkLogsData[]>([])
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async() => {
      try {
        // 'http://localhost:8080/work-logs?from=20230601&to=20230630'
        const res = await axios.get("http://localhost:8080/work-logs", {
          params: {
            from: fromQuery,
            to: toQuery
          }
        });
        const typeConversionRes: WorkLogData[] = res.data.map((data: any) => {
          const convertedStartTime: number = convertTimeToSeconds(data.workLogStartTime);
          const convertedEndTime: number = convertTimeToSeconds(data.workLogEndTime);
          const convertedDate: number = Number(data.workLogDate.substring(data.workLogDate.length - 2));
          const day: string = getWeekdayFromDate(data.workLogDate);

          return {
            workLogId: Number(data.workLogId),
            workLogUserId: Number(data.workLogUserId),
            date: convertedDate,
            day: day,
            workLogTime: {
              start: convertedStartTime,
              end: convertedEndTime,
            } as TimeRange,
            workLogSeconds: Number(data.workLogSeconds)
          }
        });

        // 整形処理
        const workLogsData: WorkLogsData[] = typeConversionRes.reduce((result: WorkLogsData[], item: WorkLogData) => {
          // 既存のデータと一致するかをチェック
          const existingData = result.find((data) => data.workLogUserId === item.workLogUserId && data.date === item.date);

          if (existingData) {
            // 一致するデータがある場合は workLogTime を追加し、workLogSumSeconds を更新
            existingData.workLogTime.push(item.workLogTime);
            existingData.workLogSumSeconds += item.workLogSeconds;
          } else {
            // 一致するデータがない場合は新しいオブジェクトを作成して追加
            const newData: WorkLogsData = {
              workLogUserId: item.workLogUserId,
              date: item.date,
              day: item.day,
              workLogTime: [item.workLogTime],
              workLogSumSeconds: item.workLogSeconds,
            };
            result.push(newData);
          }

          return result;
        }, []);

        setWorkLogsData(workLogsData);
      } catch (e) {
        setError("接続エラーが起きました。時間をおいて再度お試しください。");
      }
    })();
  }, [date, fromQuery, toQuery]);

  const dateChangeHandler = (date: Date) => {
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth() + 1;
    const lastDayOfSelectedMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const fromQueryParam = selectedYear + selectedMonth.toString().padStart(2, "0") + "01";
    const toQueryParam = selectedYear + selectedMonth.toString().padStart(2, "0") + lastDayOfSelectedMonth;
    setDate(date);
    setFromQuery(fromQueryParam);
    setToQuery(toQueryParam);
  }

  return (
    <main className="pl-48 w-full">
      {
        !error && (
        <div className="my-24 mx-auto px-7 w-[1080px] max-w-full">
          <DatePicker
            locale="ja"
            showIcon
            selected={date}
            onChange={dateChangeHandler}
            dateFormat="yyyy/MM"
            showMonthYearPicker
            className="bg-gray-50 border border-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 hover:cursor-pointer"
          />
          <div className="mt-10">
            <MonthlyTotalTime dateSumSeconds={workLogsData.map(data => data.workLogSumSeconds)} />
            {
              !workLogsData.length ? <p>選択された月には記録がありません。</p>
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
                      workLogsData.map((data, index) => (
                        <tr key={index} className="group">
                          <td className="border-t border-l group-last:border-b border-gray-500 px-4 py-3 text-center sticky left-0 z-10 bg-white">{data.date}（{data.day}）</td>
                          <td className="border-t border-x group-last:border-b border-gray-500 px-4 py-3 text-center sticky left-[112px] z-20 bg-white">
                            {
                              (function () {
                                const dateSumSeconds = data.workLogSumSeconds;
                                if (!dateSumSeconds || dateSumSeconds === 0) {
                                  return "00:00";
                                }
                                const calculateSumHour = Math.floor(dateSumSeconds / 3600);
                                const calculateSumMin = Math.floor(dateSumSeconds % 3600 / 60);
                                const remainSumMin = dateSumSeconds % 60;
                                const displayHour = calculateSumHour.toString();
                                const displayMin = calculateSumMin.toString().padStart(2, "0");
                                const displaySeconds = remainSumMin.toString().padStart(2, "0");

                                return `${displayHour}:${displayMin}:${displaySeconds}`;
                              })()
                            }
                          </td>
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
