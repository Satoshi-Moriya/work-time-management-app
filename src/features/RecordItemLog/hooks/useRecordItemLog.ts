import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../Auth/components/AuthProvider";
import { DailyClientRecordItemLog } from "../types";
import { getDateParams } from "../functions/getDateParams";
import { RecordItemType } from "../../../types";
import { fetchRecordItems } from "../../RecordItem/repositories/fetchRecordItems";
import { convertToDisplayData } from "../functions/convertToDisplayData";

export const useRecordItemLog = (): [
  boolean,
  boolean,
  string,
  {recordItemId: number, recordItemName: string}[],
  {text: string, value: string} | undefined,
  Date,
  DailyClientRecordItemLog[],
  string | undefined,
  {yyyymm: Date, date: number, recordItemLog: DailyClientRecordItemLog},
  {message: string | null, isSuccess: boolean | null },
  {
    selectedRecordItemChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    dateChangeHandler: (date: Date) => void,
    recordItemLogEditHandler: (yyyymm: Date, date: number, selectedRecordItemLog: DailyClientRecordItemLog) => void,
    setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>,
    setEditModalData: React.Dispatch<React.SetStateAction<{yyyymm: Date, date: number, recordItemLog: DailyClientRecordItemLog}>>,
    setSelectedMonthlyRecordItemLogs: React.Dispatch<React.SetStateAction<DailyClientRecordItemLog[]>>,
    setToast: React.Dispatch<React.SetStateAction<{message: string | null, isSuccess: boolean | null }>>
  }
] => {
  const [userId] = useContext(AuthContext);
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
  const [isRecordItemsLoading, setIsRecordItemsLoading] = useState(true);
  const [isRecordItemLogsLoading, setIsRecordItemLogsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});

  useEffect(() => {
    (async() => {
      try {
        // 記録項目取得&表示
        const recordItemsResponse = await fetchRecordItems(userId);
        const recordItems: RecordItemType[] = recordItemsResponse.data;
        const recordItemsWithoutUserId = recordItems.map(({recordItemId, recordItemName}) => ({recordItemId, recordItemName}));
        setRecordItems(recordItemsWithoutUserId);
        setIsRecordItemsLoading(false);
        if (recordItems.length !== 0) {
          // /record-items/:userIdで取得してきたデータの1つ目のrecordItemが初期値になるから[0]
          const initRecordItem = recordItemsWithoutUserId[0];
          setSelectedRecordItem({text: initRecordItem.recordItemName, value: initRecordItem.recordItemId.toString()})

          // 記録表のデータ取得&表示
          const monthlyRecordItemLogDataIncludingDayNotRecordItem =
            await convertToDisplayData(initRecordItem.recordItemId, fromQuery, toQuery);
          setSelectedMonthlyRecordItemLogs(monthlyRecordItemLogDataIncludingDayNotRecordItem)
          setIsRecordItemLogsLoading(false);
        }
      } catch(error) {
        setIsRecordItemsLoading(false);
        setIsRecordItemLogsLoading(false);
        setError("接続エラーが起きました。時間をおいて再度お試しください。");
      }
    })();
  }, []);

  const selectedRecordItemChangeHandler = async(event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRecordItemValue = event.target.value;
    const selectedRecordItemText = event.target.options[event.target.selectedIndex].text;
    try {
        const monthlyRecordItemLogDataIncludingDayNotRecordItem =
          await convertToDisplayData(Number(selectedRecordItemValue), fromQuery, toQuery);
        setSelectedMonthlyRecordItemLogs(monthlyRecordItemLogDataIncludingDayNotRecordItem)
        setIsRecordItemLogsLoading(false);
    } catch(error) {
      setError("接続エラーが起きました。時間をおいて再度お試しください。");
    }
    setSelectedRecordItem({text: selectedRecordItemText, value: selectedRecordItemValue});
  };

  const dateChangeHandler = async(date: Date) => {
    const [fromQueryParam, toQueryParam] = getDateParams(date);
    try {
        const monthlyRecordItemLogDataIncludingDayNotRecordItem =
          await convertToDisplayData(Number(selectedRecordItem?.value), fromQueryParam, toQueryParam);
        setSelectedMonthlyRecordItemLogs(monthlyRecordItemLogDataIncludingDayNotRecordItem)
        setIsRecordItemLogsLoading(false);
    } catch(error) {
      setError("接続エラーが起きました。時間をおいて再度お試しください。");
    }
    setDate(date);
    setFromQuery(fromQueryParam);
    setToQuery(toQueryParam);
  };

  const recordItemLogEditHandler = (yyyymm: Date, date: number, selectedRecordItemLog: DailyClientRecordItemLog) => {
    setToast({ message: null, isSuccess: null });
    setOpenModal('default');
    setEditModalData({yyyymm: yyyymm, date: date, recordItemLog: selectedRecordItemLog});
  };

  return [
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
  ];
};