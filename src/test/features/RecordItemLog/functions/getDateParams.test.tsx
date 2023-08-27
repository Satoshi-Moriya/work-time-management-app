import { getDateParams } from "../../../../features/RecordItemLog/functions/getDateParams";

describe("getDateParamsの単体テスト", () => {

  test("「yyyymmdd」の文字列に変換されているな", () => {
    const [fromDate, toDate] = getDateParams(new Date(2023, 5));
    expect(fromDate).toBe("20230601");
    expect(toDate).toBe("20230630");
  });
});