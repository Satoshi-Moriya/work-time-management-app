import getLastDayOfMonth from "../../../../features/WorkLog/functions/getLastDayOfMonth"

describe("getLastDayOfMonthの単体テスト", () => {

  test("年月の最終日の取得ができる。（2023年6月）", () => {
    const selectedYear = 2023;
    const selectedMonth = 6;
    expect(getLastDayOfMonth(selectedYear, selectedMonth)).toBe(30);
  })

  test("年月の最終日の取得ができる。（2023年7月）", () => {
    const selectedYear = 2023;
    const selectedMonth = 7;
    expect(getLastDayOfMonth(selectedYear, selectedMonth)).toBe(31);
  })

  test("年月の最終日の取得ができる。（2023年2月）", () => {
    const selectedYear = 2023;
    const selectedMonth = 2;
    expect(getLastDayOfMonth(selectedYear, selectedMonth)).toBe(28);
  })

  test("年月の最終日の取得ができる。（閏年の2024年2月）", () => {
    const selectedYear = 2024;
    const selectedMonth = 2;
    expect(getLastDayOfMonth(selectedYear, selectedMonth)).toBe(29);
  })
})