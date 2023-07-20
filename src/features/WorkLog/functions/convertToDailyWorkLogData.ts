import { DailyClientWorkLogData, ClientWorkLogData } from "../types";

export const convertToDailyWorkLogData = (convertData: ClientWorkLogData[]): DailyClientWorkLogData[] => {
  const convertedData = convertData.reduce((result: DailyClientWorkLogData[], item: ClientWorkLogData) => {
    // 既存のデータと一致するかをチェック
    const existingData = result.find((data) => data.workLogUserId === item.workLogUserId && data.date === item.date);

    if (existingData) {
      // 一致するデータがある場合は workLogTime を追加し、workLogSumSeconds を更新
      existingData.workLogTime.push(item.workLogTime);
      existingData.workLogSumSeconds += item.workLogSeconds;
    } else {
      // 一致するデータがない場合は新しいオブジェクトを作成して追加
      const newData: DailyClientWorkLogData = {
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
  return convertedData;
}