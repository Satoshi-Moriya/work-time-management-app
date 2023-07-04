import convertSecondsToTime from "../../../../features/WorkLog/functions/convertSecondsToTime"

describe("convertSecondsToTimeの単体テスト", () => {

  test("秒数が「HH:mm:ss」に変換されている", () => {
    const convertSeconds = 36000;
    expect(convertSecondsToTime(convertSeconds)).toBe("10:00:00");
  });

  test("秒数が「H:mm:ss」に変換されている", () => {
    const convertSeconds = 3600;
    expect(convertSecondsToTime(convertSeconds)).toBe("01:00:00");
  });

  test("秒数が「00:mm:ss」に変換されている", () => {
    const convertSeconds = 3599;
    expect(convertSecondsToTime(convertSeconds)).toBe("00:59:59");
  });

  test("秒数0の時「00:00:00」に変換されている", () => {
    const convertSeconds = 0;
    expect(convertSecondsToTime(convertSeconds)).toBe("00:00:00");
  });
});