import { useCallback, useEffect, useState } from "react";

import { DailyClientWorkLogData } from "../types";
import { fetchMonthlyWorkLog } from "../repository/repository";
import { convertToWorkLogDataList } from "../functions/convertToWorkLogDataList";
import { convertToDailyWorkLogData } from "../functions/convertToDailyWorkLogData";
import { getDateParams } from "../functions/getDateParams";
import { addDayNotWork } from "../functions/addDayNotWork";

export const useWorkLog = (userId: number): [
  Date,
  DailyClientWorkLogData[],
  string,
  boolean,
  {
    dateChangeHandler: (date: Date) => void
  }
] => {
  const currentDate = new Date();
  const [initFromQueryParam, initToQueryParam] = getDateParams(currentDate);
  const [fromQuery, setFromQuery] = useState(initFromQueryParam);
  const [toQuery, setToQuery] = useState(initToQueryParam);
  const [date, setDate] = useState(currentDate);
  const [monthlyWorkLogData, setMonthlyWorkLogData] = useState<DailyClientWorkLogData[]>([])
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async() => {

        const response = await fetchMonthlyWorkLog(userId, fromQuery, toQuery);
        console.log(response)
        if (response.status === 200) {
          const workLogData = convertToWorkLogDataList(response.data!);
          const monthlyWorkLogData: DailyClientWorkLogData[] = convertToDailyWorkLogData(workLogData);
          const monthlyWorkLogDataIncludingDayNotWork: DailyClientWorkLogData[] = addDayNotWork(userId, monthlyWorkLogData, toQuery)
          setMonthlyWorkLogData(monthlyWorkLogDataIncludingDayNotWork);
          setIsLoading(false);
        } else {
          setError("接続エラーが起きました。時間をおいて再度お試しください。");
        }
      }
    )();
  }, [date]);

  const dateChangeHandler = useCallback((date: Date) => {
    const [fromQueryParam, toQueryParam] = getDateParams(date);
    setDate(date);
    setFromQuery(fromQueryParam);
    setToQuery(toQueryParam);
  }, [])

  return [date, monthlyWorkLogData, error, isLoading, { dateChangeHandler } ]
}