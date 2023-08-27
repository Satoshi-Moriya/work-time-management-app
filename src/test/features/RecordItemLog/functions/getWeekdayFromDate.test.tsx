import { getWeekdayFromDate } from "../../../../features/RecordItemLog/functions/getWeekdayFromDate";

describe("getWeekdayFromDateの単体テスト", () => {

  test("普通の日の曜日を取得できる", () => {
    const normalDayOfTheWeek = "2020-02-28";
    expect(getWeekdayFromDate(normalDayOfTheWeek)).toBe("金");
  })

  test("閏年の2月29日の曜日を取得できる", () => {
    const leapYear29thDayOfTheWeek = "2020-02-29";
    expect(getWeekdayFromDate(leapYear29thDayOfTheWeek)).toBe("土");
  })
})