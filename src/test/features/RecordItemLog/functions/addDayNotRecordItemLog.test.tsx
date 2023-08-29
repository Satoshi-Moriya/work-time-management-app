import { addDayNotRecordItemLog } from "../../../../features/RecordItemLog/functions/addDayNotRecordItemLog";
import { DailyClientRecordItemLog } from "../../../../features/RecordItemLog/types";

describe("addDayNotRecordItemLogの単体テスト", () => {

  test("月内に、recordItemLogがない日がある場合（2023年6月）", () => {
    const monthlyRecordItemLogList: DailyClientRecordItemLog[] = [
      { recordItemId: 1, recordItemLogDate: 1, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 1, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 2, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 2, start: 36000, end: 37800}], recordItemLogSumSeconds: 1800 },
    ];
    const expectedOutput = [
      { recordItemId: 1, recordItemLogDate: 1, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 1, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 2, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 2, start: 36000, end: 37800}], recordItemLogSumSeconds: 1800 },
      { recordItemId: 1, recordItemLogDate: 3, recordItemLogDay: "土", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 4, recordItemLogDay: "日", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 5, recordItemLogDay: "月", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 6, recordItemLogDay: "火", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 7, recordItemLogDay: "水", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 8, recordItemLogDay: "木", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 9, recordItemLogDay: "金", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 10, recordItemLogDay: "土", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 11, recordItemLogDay: "日", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 12, recordItemLogDay: "月", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 13, recordItemLogDay: "火", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 14, recordItemLogDay: "水", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 15, recordItemLogDay: "木", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 16, recordItemLogDay: "金", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 17, recordItemLogDay: "土", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 18, recordItemLogDay: "日", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 19, recordItemLogDay: "月", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 20, recordItemLogDay: "火", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 21, recordItemLogDay: "水", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 22, recordItemLogDay: "木", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 23, recordItemLogDay: "金", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 24, recordItemLogDay: "土", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 25, recordItemLogDay: "日", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 26, recordItemLogDay: "月", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 27, recordItemLogDay: "火", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 28, recordItemLogDay: "水", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 29, recordItemLogDay: "木", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 30, recordItemLogDay: "金", recordItemLogTime: [], recordItemLogSumSeconds: 0 }
    ];

    expect(addDayNotRecordItemLog(1, monthlyRecordItemLogList, "20230630")).toStrictEqual(expectedOutput);
  })

  test("月内に、recordItemLogがない日がない場合（2023年6月）", () => {
    const monthlyRecordItemLogList: DailyClientRecordItemLog[] = [
      { recordItemId: 1, recordItemLogDate: 1, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 1, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 2, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 2, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 3, recordItemLogDay: "土", recordItemLogTime: [{recordItemLogId: 3, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 4, recordItemLogDay: "日", recordItemLogTime: [{recordItemLogId: 4, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 5, recordItemLogDay: "月", recordItemLogTime: [{recordItemLogId: 5, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 6, recordItemLogDay: "火", recordItemLogTime: [{recordItemLogId: 6, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 7, recordItemLogDay: "水", recordItemLogTime: [{recordItemLogId: 7, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 8, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 8, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 9, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 9, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 10, recordItemLogDay: "土", recordItemLogTime: [{recordItemLogId: 10, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 11, recordItemLogDay: "日", recordItemLogTime: [{recordItemLogId: 11, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 12, recordItemLogDay: "月", recordItemLogTime: [{recordItemLogId: 12, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 13, recordItemLogDay: "火", recordItemLogTime: [{recordItemLogId: 13, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 14, recordItemLogDay: "水", recordItemLogTime: [{recordItemLogId: 14, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 15, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 15, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 16, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 16, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 17, recordItemLogDay: "土", recordItemLogTime: [{recordItemLogId: 17, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 18, recordItemLogDay: "日", recordItemLogTime: [{recordItemLogId: 18, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 19, recordItemLogDay: "月", recordItemLogTime: [{recordItemLogId: 19, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 20, recordItemLogDay: "火", recordItemLogTime: [{recordItemLogId: 20, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 21, recordItemLogDay: "水", recordItemLogTime: [{recordItemLogId: 21, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 22, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 22, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 23, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 23, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 24, recordItemLogDay: "土", recordItemLogTime: [{recordItemLogId: 24, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 25, recordItemLogDay: "日", recordItemLogTime: [{recordItemLogId: 25, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 26, recordItemLogDay: "月", recordItemLogTime: [{recordItemLogId: 26, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 27, recordItemLogDay: "火", recordItemLogTime: [{recordItemLogId: 27, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 28, recordItemLogDay: "水", recordItemLogTime: [{recordItemLogId: 28, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 29, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 29, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 30, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 30, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 }
    ];

    const expectedOutput: DailyClientRecordItemLog[] = [
      { recordItemId: 1, recordItemLogDate: 1, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 1, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 2, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 2, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 3, recordItemLogDay: "土", recordItemLogTime: [{recordItemLogId: 3, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 4, recordItemLogDay: "日", recordItemLogTime: [{recordItemLogId: 4, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 5, recordItemLogDay: "月", recordItemLogTime: [{recordItemLogId: 5, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 6, recordItemLogDay: "火", recordItemLogTime: [{recordItemLogId: 6, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 7, recordItemLogDay: "水", recordItemLogTime: [{recordItemLogId: 7, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 8, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 8, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 9, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 9, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 10, recordItemLogDay: "土", recordItemLogTime: [{recordItemLogId: 10, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 11, recordItemLogDay: "日", recordItemLogTime: [{recordItemLogId: 11, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 12, recordItemLogDay: "月", recordItemLogTime: [{recordItemLogId: 12, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 13, recordItemLogDay: "火", recordItemLogTime: [{recordItemLogId: 13, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 14, recordItemLogDay: "水", recordItemLogTime: [{recordItemLogId: 14, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 15, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 15, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 16, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 16, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 17, recordItemLogDay: "土", recordItemLogTime: [{recordItemLogId: 17, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 18, recordItemLogDay: "日", recordItemLogTime: [{recordItemLogId: 18, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 19, recordItemLogDay: "月", recordItemLogTime: [{recordItemLogId: 19, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 20, recordItemLogDay: "火", recordItemLogTime: [{recordItemLogId: 20, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 21, recordItemLogDay: "水", recordItemLogTime: [{recordItemLogId: 21, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 22, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 22, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 23, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 23, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 24, recordItemLogDay: "土", recordItemLogTime: [{recordItemLogId: 24, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 25, recordItemLogDay: "日", recordItemLogTime: [{recordItemLogId: 25, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 26, recordItemLogDay: "月", recordItemLogTime: [{recordItemLogId: 26, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 27, recordItemLogDay: "火", recordItemLogTime: [{recordItemLogId: 27, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 28, recordItemLogDay: "水", recordItemLogTime: [{recordItemLogId: 28, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 29, recordItemLogDay: "木", recordItemLogTime: [{recordItemLogId: 29, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 },
      { recordItemId: 1, recordItemLogDate: 30, recordItemLogDay: "金", recordItemLogTime: [{recordItemLogId: 30, start: 5400, end: 9000}], recordItemLogSumSeconds: 3600 }
    ];

    expect(addDayNotRecordItemLog(1, monthlyRecordItemLogList, "20230630")).toStrictEqual(expectedOutput);
  });

  test("二桁の月でもしっかりと曜日が表示される（2023年10月）", () => {
    const monthlyRecordItemLogList: DailyClientRecordItemLog[] = [];
    const expectedOutput: DailyClientRecordItemLog[] = [
      { recordItemId: 1, recordItemLogDate: 1, recordItemLogDay: "日", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 2, recordItemLogDay: "月", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 3, recordItemLogDay: "火", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 4, recordItemLogDay: "水", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 5, recordItemLogDay: "木", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 6, recordItemLogDay: "金", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 7, recordItemLogDay: "土", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 8, recordItemLogDay: "日", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 9, recordItemLogDay: "月", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 10, recordItemLogDay: "火", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 11, recordItemLogDay: "水", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 12, recordItemLogDay: "木", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 13, recordItemLogDay: "金", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 14, recordItemLogDay: "土", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 15, recordItemLogDay: "日", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 16, recordItemLogDay: "月", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 17, recordItemLogDay: "火", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 18, recordItemLogDay: "水", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 19, recordItemLogDay: "木", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 20, recordItemLogDay: "金", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 21, recordItemLogDay: "土", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 22, recordItemLogDay: "日", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 23, recordItemLogDay: "月", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 24, recordItemLogDay: "火", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 25, recordItemLogDay: "水", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 26, recordItemLogDay: "木", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 27, recordItemLogDay: "金", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 28, recordItemLogDay: "土", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 29, recordItemLogDay: "日", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 30, recordItemLogDay: "月", recordItemLogTime: [], recordItemLogSumSeconds: 0 },
      { recordItemId: 1, recordItemLogDate: 31, recordItemLogDay: "火", recordItemLogTime: [], recordItemLogSumSeconds: 0 }
    ];

    expect(addDayNotRecordItemLog(1, monthlyRecordItemLogList, "20231031")).toStrictEqual(expectedOutput);
  });

})