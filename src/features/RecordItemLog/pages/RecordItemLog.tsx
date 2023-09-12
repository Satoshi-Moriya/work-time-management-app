import CustomDatePicker from "../components/CustomDatePicker";
import MonthlyTotalTime from "../components/MonthlyTotalTime";
import StackedBarChart from "../components/StackedBarChart";
import convertSecondsToTime from "../../../functions/convertSecondsToTime";
import Loading from "../../../components/Loading";
import EditModal from "../components/EditModal";
import { useRecordItemLog } from "../hooks/useRecordItemLog";

const RecordItemLog = () => {
  const [
    isRecordItemLogsLoading,
    isRecordItemsLoading,
    error,
    recordItems,
    selectedRecordItem,
    date,
    selectedMonthlyRecordItemLogs,
    openModal,
    editModalData,
    toast,
    {
      selectedRecordItemChangeHandler,
      dateChangeHandler,
      recordItemLogEditHandler,
      setOpenModal,
      setEditModalData,
      setSelectedMonthlyRecordItemLogs,
      setToast
    }
  ] = useRecordItemLog();

  return (
    <main className="md:pl-48 w-full min-h-screen relative z-1">
      {
        isRecordItemsLoading ? <Loading/>
        :
        !error && recordItems.length !== 0 && (
        <div className="mt-52 mb-24 md:my-24 mx-auto px-7 w-[1137px] max-w-full">
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
            isRecordItemLogsLoading ? <Loading/>
            :
            <>
              <div className="mt-20 flex justify-end items-center">
                <span className="bg-[#BAD3FF] block w-5 h-5 mr-2"></span>
                <p className="">{selectedRecordItem!.text}</p>
              </div>
              <div className="overflow-x-scroll">
                <table className="w-[1031px] sm:w-[1081px] mt-2 table-fixed border-separate border-spacing-0 text-sm sm:text-base">
                  <thead>
                    <tr>
                      <th className="border-t border-l border-r sm:border-r-0 border-gray-500 px-4 py-2 bg-dark-gray w-[70px] sm:w-[100px] sticky left-0 z-30" rowSpan={2}>日付</th>
                      <th className="border-t sm:border-l border-gray-500 px-4 py-2 bg-dark-gray w-[80px] sm:w-[100px] sticky left-70px sm:left-[100px] z-20" rowSpan={2}>時間</th>
                      <th className="border-t border-x border-gray-500 px-4 py-2 bg-dark-gray w-[80px] sm:w-auto sticky left-150px sm:left-[200px] z-20" rowSpan={2}>編集</th>
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
                          <td className="border-t border-l border-r sm:border-r-0 group-last:border-b border-gray-500 px-2 py-3 text-center sticky left-0 z-30 bg-white">{data.recordItemLogDate}({data.recordItemLogDay})</td>
                          <td className="border-t sm:border-l group-last:border-b border-gray-500 px-2 py-3 text-center sticky left-70px sm:left-[100px] z-20 bg-white">{convertSecondsToTime(data.recordItemLogSumSeconds)}</td>
                          <td className="border-t border-x group-last:border-b border-gray-500 px-2 py-3 text-center sticky left-150px sm:left-[200px] z-20 bg-white">
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
      {!error && recordItems.length === 0 && <p className="flex justify-center items-center h-full">記録項目の登録がまだありません。</p>}
      {error && <p className="flex justify-center items-center h-full">{error}</p>}
    </main>
  );
};

export default RecordItemLog;
