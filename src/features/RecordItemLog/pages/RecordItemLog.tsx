import { useContext, useEffect, useState } from "react";

import CustomDatePicker from "../components/CustomDatePicker";
import MonthlyTotalTime from "../components/MonthlyTotalTime";
import StackedBarChart from "../components/StackedBarChart";
import convertSecondsToTime from "../../../functions/convertSecondsToTime";
import Loading from "../../../components/Loading";
import { AuthContext } from "../../Auth/components/AuthProvider";
import EditModal from "../components/EditModal";
import { api } from "../../../lib/api-client/ApiClientProvider";
import { RecordItemType } from "../../../types/index";
import { getDateParams } from "../functions/getDateParams";
import { convertToClientRecordItemLogList } from "../functions/convertToClientRecordItemLogList";
import { convertToDailyRecordItemLogData } from "../functions/convertToDailyRecordItemLogData";
import { addDayNotRecordItemLog } from "../functions/addDayNotRecordItemLog";
import { RecordItemLogType, DailyClientRecordItemLog } from "../types";

const fetchRecordItemLogsAndConverted = async(
  selectedRecordItemId: number,
  selectedMonthFrom: string,
  selectedMonthTo: string
): Promise<DailyClientRecordItemLog[]> => {
  const recordItemLogResponse =
    await api.get<RecordItemLogType[]>(`/record-item-logs/${selectedRecordItemId}`, {
      params: {
        from: selectedMonthFrom,
        to: selectedMonthTo
      }
    });
    const recordItemLogsData = convertToClientRecordItemLogList(recordItemLogResponse.data!);
    const monthlyRecordItemLogsData: DailyClientRecordItemLog[] = convertToDailyRecordItemLogData(recordItemLogsData);
    return addDayNotRecordItemLog(selectedRecordItemId, monthlyRecordItemLogsData, selectedMonthTo);
}

const RecordItemLog = () => {
  const [ userId ] = useContext(AuthContext);
  const [recordItems, setRecordItems] = useState<{recordItemId: number, recordItemName: string}[]>([]);
  const [selectedRecordItem, setSelectedRecordItem] = useState<{text: string, value: string}>();
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [editModalData, setEditModalData] = useState<{yyyymm: Date, date: number, recordItemLog: DailyClientRecordItemLog}>({
    yyyymm: new Date(),
    date: 0,
    recordItemLog: {recordItemId: 0, recordItemLogDate: 0, recordItemLogDay: "", recordItemLogTime: [{recordItemLogId: 0, start: 0, end: 0}], recordItemLogSumSeconds: 0}
  });
  const currentDate = new Date();
  const [initFromQueryParam, initToQueryParam] = getDateParams(currentDate);
  const [fromQuery, setFromQuery] = useState<string>(initFromQueryParam);
  const [toQuery, setToQuery] = useState(initToQueryParam);
  const [date, setDate] = useState(currentDate);
  const [selectedMonthlyRecordItemLogs, setSelectedMonthlyRecordItemLogs] = useState<DailyClientRecordItemLog[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});

  useEffect(() => {
    (async() => {
      try {
        // 記録項目取得&表示
        const recordItemsResponse = await api.get(`/record-items/${userId}`);
        const recordItems: RecordItemType[] = recordItemsResponse.data;
        const recordItemsWithoutUserId = recordItems.map(({recordItemId, recordItemName}) => ({recordItemId, recordItemName}));
        setRecordItems(recordItemsWithoutUserId);
        // /record-items/:userIdで取得してきたデータの1つ目のrecordItemが初期値になるから[0]
        const initRecordItem = recordItemsWithoutUserId[0];
        setSelectedRecordItem({text: initRecordItem.recordItemName, value: initRecordItem.recordItemId.toString()})

        // 記録表のデータ取得&表示
        const monthlyRecordItemLogDataIncludingDayNotRecordItem =
          await fetchRecordItemLogsAndConverted(initRecordItem.recordItemId, fromQuery, toQuery);
        setSelectedMonthlyRecordItemLogs(monthlyRecordItemLogDataIncludingDayNotRecordItem)
        setIsLoading(false);
      } catch(error) {
        setError("接続エラーが起きました。時間をおいて再度お試しください。");
      }
    })();
  }, []);

  const selectedRecordItemChangeHandler = async(event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRecordItemValue = event.target.value;
    const selectedRecordItemText = event.target.options[event.target.selectedIndex].text;
    try {
        const monthlyRecordItemLogDataIncludingDayNotRecordItem =
          await fetchRecordItemLogsAndConverted(Number(selectedRecordItemValue), fromQuery, toQuery);
        setSelectedMonthlyRecordItemLogs(monthlyRecordItemLogDataIncludingDayNotRecordItem)
        setIsLoading(false);
    } catch(error) {
      setError("接続エラーが起きました。時間をおいて再度お試しください。");
    }
    setSelectedRecordItem({text: selectedRecordItemText, value: selectedRecordItemValue});
  }

  const dateChangeHandler = async(date: Date) => {
    const [fromQueryParam, toQueryParam] = getDateParams(date);
    try {
        const monthlyRecordItemLogDataIncludingDayNotRecordItem =
          await fetchRecordItemLogsAndConverted(Number(selectedRecordItem?.value), fromQueryParam, toQueryParam);
        setSelectedMonthlyRecordItemLogs(monthlyRecordItemLogDataIncludingDayNotRecordItem)
        setIsLoading(false);
    } catch(error) {
      setError("接続エラーが起きました。時間をおいて再度お試しください。");
    }
    setDate(date);
    setFromQuery(fromQueryParam);
    setToQuery(toQueryParam);
  }

  const recordItemLogEditHandler = (yyyymm: Date, date: number, selectedRecordItemLog: DailyClientRecordItemLog) => {
    setToast({ message: null, isSuccess: null });
    setOpenModal('default');
    setEditModalData({yyyymm: yyyymm, date: date, recordItemLog: selectedRecordItemLog});
  }

  return (
    <main className="pl-48 w-full min-h-screen">
      {
        !error && recordItems.length !== 0 && (
        <div className="my-24 mx-auto px-7 w-[1137px] max-w-full">
          {/* recordItemsのlengthが0でない場合selectedRecordItemはdefinedではない */}
          <select value={selectedRecordItem!.value} onChange={selectedRecordItemChangeHandler} className="w-[200px] bg-gray-50 border border-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block p-1 hover:cursor-pointer">
            {
              recordItems.map((recordItem, index) => {
                return (
                  <option key={index} value={recordItem.recordItemId}>{recordItem.recordItemName}</option>
                );
              })
            }
          </select>
          <div className="mt-10">
            <CustomDatePicker selectedDate={date} onChange ={dateChangeHandler} />
          </div>
          <div className="mt-10">
            <MonthlyTotalTime dateSumSeconds={selectedMonthlyRecordItemLogs.map(data => data.recordItemLogSumSeconds)} />
            {
              isLoading ? <Loading/>
            :
            <>
              <div className="mt-20 flex justify-end items-center">
                <span className="bg-[#BAD3FF] block w-5 h-5 mr-2"></span>
                <p className="">{selectedRecordItem!.text}</p>
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
                      selectedMonthlyRecordItemLogs.map((data, index) => (
                        <tr key={index} className="group">
                          <td className="border-t border-l group-last:border-b border-gray-500 px-2 py-3 text-center sticky left-0 z-10 bg-white">{data.recordItemLogDate}（{data.recordItemLogDay}）</td>
                          <td className="border-t border-l group-last:border-b border-gray-500 px-2 py-3 text-center sticky left-[100px] z-20 bg-white">{convertSecondsToTime(data.recordItemLogSumSeconds)}</td>
                          <td className="border-t border-x group-last:border-b border-gray-500 px-2 py-3 text-center sticky left-[200px] z-20 bg-white">
                            <button onClick={() => recordItemLogEditHandler(date, data.recordItemLogDate, data)} className="text-sm bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg text-white font-bold px-2 py-1">編集</button>
                          </td>
                          <td className="border-t border-r group-last:border-b border-gray-500 px-0 py-3 w-[801px] bg-white relative" colSpan={24} ><StackedBarChart timeData={data.recordItemLogTime} /></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <EditModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                recordItem={selectedRecordItem}
                editModalData={editModalData}
                setEditModalData={setEditModalData}
                selectedMonthlyRecordItemLogs={selectedMonthlyRecordItemLogs}
                setSelectedMonthlyRecordItemLogs={setSelectedMonthlyRecordItemLogs}
                toast={toast}
                setToast={setToast}
              />
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

export default RecordItemLog;
