import { convertToDailyRecordItemLogData } from "../../../../features/RecordItemLog/functions/convertToDailyRecordItemLogData";
import { ClientRecordItemLog, DailyClientRecordItemLog } from "../../../../features/RecordItemLog/types";

describe("convertToDailyRecordItemLogDataの単体テスト", () => {

  test("recordItemIdとrecordItemLogDateが一致するデータが存在する場合", ()=> {
    const convertData: ClientRecordItemLog[] = [
      {recordItemId: 1, recordItemLogDate: 1, recordItemLogDay: "土", recordItemLogTime: {recordItemLogId: 1, start: 5400, end: 9000}, recordItemLogSeconds: 3600},
      {recordItemId: 1, recordItemLogDate: 1, recordItemLogDay: "土", recordItemLogTime: {recordItemLogId: 2, start: 36000, end: 37800}, recordItemLogSeconds: 1800}
    ];
    const expectedOutput: DailyClientRecordItemLog[] = [
      {
        recordItemId: 1,
        recordItemLogDate: 1,
        recordItemLogDay: "土",
        recordItemLogTime: [{recordItemLogId: 1, start: 5400, end: 9000}, {recordItemLogId: 2, start: 36000, end: 37800}],
        recordItemLogSumSeconds: 5400
      },
    ];
    expect(convertToDailyRecordItemLogData(convertData)).toStrictEqual(expectedOutput);
  })

  test("recordItemIdが一致しないデータが存在する場合", ()=> {
    const convertData: ClientRecordItemLog[] = [
      {recordItemId: 1, recordItemLogDate: 1, recordItemLogDay: "土", recordItemLogTime: {recordItemLogId: 1, start: 5400, end: 9000}, recordItemLogSeconds: 3600},
      {recordItemId: 2, recordItemLogDate: 1, recordItemLogDay: "土", recordItemLogTime: {recordItemLogId: 2, start: 36000, end: 37800}, recordItemLogSeconds: 1800}
    ];
    const expectedOutput: DailyClientRecordItemLog[] = [
      {
        recordItemId: 1,
        recordItemLogDate: 1,
        recordItemLogDay: "土",
        recordItemLogTime: [{recordItemLogId: 1, start: 5400, end: 9000}],
        recordItemLogSumSeconds: 3600
      },
      {
        recordItemId: 2,
        recordItemLogDate: 1,
        recordItemLogDay: "土",
        recordItemLogTime: [{recordItemLogId: 2, start: 36000, end: 37800}],
        recordItemLogSumSeconds: 1800
      }
    ];
    expect(convertToDailyRecordItemLogData(convertData)).toStrictEqual(expectedOutput);
  })

  test("recordItemLogDateが一致しないデータが存在する場合", ()=> {
    const convertData: ClientRecordItemLog[] = [
      {recordItemId: 1, recordItemLogDate: 1, recordItemLogDay: "土", recordItemLogTime: {recordItemLogId: 1, start: 5400, end: 9000}, recordItemLogSeconds: 3600},
      {recordItemId: 1, recordItemLogDate: 2, recordItemLogDay: "日", recordItemLogTime: {recordItemLogId: 2, start: 36000, end: 37800}, recordItemLogSeconds: 1800}
    ];
    const expectedOutput: DailyClientRecordItemLog[] = [
      {
        recordItemId: 1,
        recordItemLogDate: 1,
        recordItemLogDay: "土",
        recordItemLogTime: [{recordItemLogId: 1, start: 5400, end: 9000}],
        recordItemLogSumSeconds: 3600
      },
      {
        recordItemId: 1,
        recordItemLogDate: 2,
        recordItemLogDay: "日",
        recordItemLogTime: [{recordItemLogId: 2, start: 36000, end: 37800}],
        recordItemLogSumSeconds: 1800
      }
    ];
    expect(convertToDailyRecordItemLogData(convertData)).toStrictEqual(expectedOutput);
  })

  test("recordItemIdとrecordItemLogDateが一致しないデータが存在する場合", ()=> {
    const convertData: ClientRecordItemLog[] = [
      {recordItemId: 1, recordItemLogDate: 1, recordItemLogDay: "土", recordItemLogTime: {recordItemLogId: 1, start: 5400, end: 9000}, recordItemLogSeconds: 3600},
      {recordItemId: 2, recordItemLogDate: 2, recordItemLogDay: "日", recordItemLogTime: {recordItemLogId: 2, start: 36000, end: 37800}, recordItemLogSeconds: 1800}
    ];
    const expectedOutput: DailyClientRecordItemLog[] = [
      {
        recordItemId: 1,
        recordItemLogDate: 1,
        recordItemLogDay: "土",
        recordItemLogTime: [{recordItemLogId: 1, start: 5400, end: 9000}],
        recordItemLogSumSeconds: 3600
      },
      {
        recordItemId: 2,
        recordItemLogDate: 2,
        recordItemLogDay: "日",
        recordItemLogTime: [{recordItemLogId: 2, start: 36000, end: 37800}],
        recordItemLogSumSeconds: 1800
      }
    ];
    expect(convertToDailyRecordItemLogData(convertData)).toStrictEqual(expectedOutput);
  })
})