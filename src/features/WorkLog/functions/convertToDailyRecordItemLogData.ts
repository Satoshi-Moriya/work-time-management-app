import { DailyClientRecordItemLog, ClientRecordItemLog } from "../types";

export const convertToDailyRecordItemLogData = (convertData: ClientRecordItemLog[]): DailyClientRecordItemLog[] => {
  const convertedData = convertData.reduce((result: DailyClientRecordItemLog[], item: ClientRecordItemLog) => {
    // 既存のデータと同じ項目かつ同じ日のデータかをチェック 例：「稼働」という項目が2023年の5月1の9時から12時と、14時から18時で登録がある。
    const existingData = result.find((data) => data.recordItemId === item.recordItemId && data.recordItemLogDate === item.recordItemLogDate);

    if (existingData) {
      // 同じ日のデータがある場合は recordItemLogTime を追加し、recordItemLogSumSeconds を更新
      existingData.recordItemLogTime.push(item.recordItemLogTime);
      existingData.recordItemLogSumSeconds += item.recordItemLogSeconds;
    } else {
      // 一致するデータがない場合は新しいオブジェクトを作成して追加
      const newData: DailyClientRecordItemLog = {
        recordItemId: item.recordItemId,
        recordItemLogDate: item.recordItemLogDate,
        recordItemLogDay: item.recordItemLogDay,
        recordItemLogTime: [item.recordItemLogTime],
        recordItemLogSumSeconds: item.recordItemLogSeconds
      };
      result.push(newData);
    }

    return result;
  }, []);
  return convertedData;
}