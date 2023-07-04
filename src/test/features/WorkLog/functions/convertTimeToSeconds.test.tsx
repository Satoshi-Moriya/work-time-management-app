import convertTimeToSeconds from "../../../../features/WorkLog/functions/convertTimeToSeconds"

describe("convertTimeToSecondsの単体テスト", () => {

  test("「00:mm:ss」が秒数に変換されている", () => {
    expect(convertTimeToSeconds("2023-06-29 00:01:59")).toBe(119);
  });

  test("「0H:mm:ss」が秒数に変換されている", () => {
    expect(convertTimeToSeconds("2023-06-29 09:00:59")).toBe(32459);
  });

  test("「HH:mm:ss」が秒数に変換されている", () => {
    expect(convertTimeToSeconds("2023-06-29 13:15:00")).toBe(47700);
  });
});