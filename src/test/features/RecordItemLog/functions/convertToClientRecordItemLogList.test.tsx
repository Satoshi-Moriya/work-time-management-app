import { convertToClientRecordItemLogList } from "../../../../features/RecordItemLog/functions/convertToClientRecordItemLogList";
import { ClientRecordItemLog } from "../../../../features/RecordItemLog/types";

describe("convertToClientRecordItemLogListの単体テスト", () => {

  test("ClientRecordItemLog型の配列になっている", () => {
    const selectedMonthlyRecordItemLogRes = [
      {
        recordItemLogId: 1,
        recordItemId: 1,
        recordItemLogDate: "2023-06-29",
        recordItemLogStartTime: "2023-06-29 9:00:59",
        recordItemLogEndTime: "2023-06-29 12:00:00",
        recordItemLogSeconds: 10741
      },
    ];
    const expectedOutput: ClientRecordItemLog[] = [
      {
        recordItemId: 1,
        recordItemLogDate: 29,
        recordItemLogDay: "木",
        recordItemLogTime: {
          recordItemLogId: 1,
          start: 32459,
          end: 43200
        },
        recordItemLogSeconds: 10741
      }
    ]
    expect(convertToClientRecordItemLogList(selectedMonthlyRecordItemLogRes)).toStrictEqual(expectedOutput);
  });
});
