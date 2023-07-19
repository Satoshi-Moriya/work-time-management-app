import { render, screen, within } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

import WorKLog, { addWithoutWorkDays, getWeekdayFromDate, convertToWorkLogArrayData, convertWorkLogArrayDataToWorkLogArrayData, getDateParams } from "../../../features/WorkLog/pages/WorkLog";
import { DailyWorkLogData, WorkLogData, TimeRange} from "../../../features/WorkLog/types";

const server = setupServer(
  rest.get("http://localhost:8080/work-logs/user-id/1",
  (req, res, ctx) => {
    const fromQuery = req.url.searchParams.get("from");
    const toQuery = req.url.searchParams.get("to");

    // ToDo 年月が変わると落ちるからどうにかしたい
    if (fromQuery === "20230701" && toQuery === "20230731") {
      return res(
        ctx.status(200),
        ctx.json(
          [
            {
              workLogId: 3,
              workLogUserId: 1,
              workLogDate: "2023-07-29",
              workLogStartTime: "2023-07-29 9:00:59",
              workLogEndTime: "2023-07-29 12:00:00",
              workLogSeconds: 10741
            },
          ]
        )
      )
    }
  })
)

describe("WorkLogのテスト", () => {

  describe("コンポーネント内の関数のテスト", () => {

    test("getWeekdayFromDateのテスト", () => {
      const normalDayOfTheWeek = "2020-02-28";
      const leapYear29thDayOfTheWeek = "2020-02-29";
      expect(getWeekdayFromDate(normalDayOfTheWeek)).toBe("金");
      expect(getWeekdayFromDate(leapYear29thDayOfTheWeek)).toBe("土");
    })

    test("convertToWorkLogArrayDataのテスト", () => {
      const selectedMonthlyWorkLogRes = [
        {
          workLogId: 1,
          workLogUserId: 1,
          workLogDate: "2023-06-29",
          workLogStartTime: "2023-06-29 9:00:59",
          workLogEndTime: "2023-06-29 12:00:00",
          workLogSeconds: 10741
        },
      ];
      const expectedOutput: WorkLogData[] = [
        {
          workLogId: 1,
          workLogUserId: 1,
          date: 29,
          day: "木",
          workLogTime: {
            start: 32459,
            end: 43200,
          } as TimeRange,
          workLogSeconds: 10741
        }
      ]
      expect(convertToWorkLogArrayData(selectedMonthlyWorkLogRes)).toStrictEqual(expectedOutput);
    })

    describe("convertWorkLogArrayDataToWorkLogArrayDataのテスト", () => {

      test("workLogUserIdとdateが一緒のデータが存在する場合", ()=> {
        const convertData: WorkLogData[] = [
          { workLogId: 1, workLogUserId: 1, date: 1, day: "土", workLogTime: {start: 5400, end: 9000}, workLogSeconds: 3600 },
          { workLogId: 1, workLogUserId: 1, date: 1, day: "土", workLogTime: {start: 36000, end: 37800}, workLogSeconds: 1800 },
        ];
        const expectedOutput = [
          {
            workLogUserId: 1,
            date: 1,
            day: "土",
            workLogTime: [{start: 5400, end: 9000}, {start: 36000, end: 37800}],
            workLogSumSeconds: 5400,
          },
        ];
        expect(convertWorkLogArrayDataToWorkLogArrayData(convertData)).toStrictEqual(expectedOutput);
      })

      test("workLogUserIdが一致しないデータが存在する場合", ()=> {
        const convertData: WorkLogData[] = [
          { workLogId: 1, workLogUserId: 1, date: 1, day: "土", workLogTime: {start: 5400, end: 9000}, workLogSeconds: 3600 },
          { workLogId: 2, workLogUserId: 2, date: 1, day: "土", workLogTime: {start: 36000, end: 37800}, workLogSeconds: 1800 },
        ];
        const expectedOutput = [
          {
            workLogUserId: 1,
            date: 1,
            day: "土",
            workLogTime: [{start: 5400, end: 9000}],
            workLogSumSeconds: 3600,
          },
          {
            workLogUserId: 2,
            date: 1,
            day: "土",
            workLogTime: [{start: 36000, end: 37800}],
            workLogSumSeconds: 1800,
          },
        ];
        expect(convertWorkLogArrayDataToWorkLogArrayData(convertData)).toStrictEqual(expectedOutput);
      })

      test("dateが一致しないデータが存在する場合", ()=> {
        const convertData: WorkLogData[] = [
          { workLogId: 1, workLogUserId: 1, date: 1, day: "土", workLogTime: {start: 5400, end: 9000}, workLogSeconds: 3600 },
          { workLogId: 2, workLogUserId: 1, date: 2, day: "日", workLogTime: {start: 36000, end: 37800}, workLogSeconds: 1800 },
        ];
        const expectedOutput = [
          {
            workLogUserId: 1,
            date: 1,
            day: "土",
            workLogTime: [{start: 5400, end: 9000}],
            workLogSumSeconds: 3600,
          },
          {
            workLogUserId: 1,
            date: 2,
            day: "日",
            workLogTime: [{start: 36000, end: 37800}],
            workLogSumSeconds: 1800,
          },
        ];
        expect(convertWorkLogArrayDataToWorkLogArrayData(convertData)).toStrictEqual(expectedOutput);
      })

      test("workLogUserIdとdateが一致しないデータが存在する場合", ()=> {
        const convertData: WorkLogData[] = [
          { workLogId: 1, workLogUserId: 1, date: 1, day: "土", workLogTime: {start: 5400, end: 9000}, workLogSeconds: 3600 },
          { workLogId: 2, workLogUserId: 2, date: 2, day: "日", workLogTime: {start: 36000, end: 37800}, workLogSeconds: 1800 },
        ];
        const expectedOutput = [
          {
            workLogUserId: 1,
            date: 1,
            day: "土",
            workLogTime: [{start: 5400, end: 9000}],
            workLogSumSeconds: 3600,
          },
          {
            workLogUserId: 2,
            date: 2,
            day: "日",
            workLogTime: [{start: 36000, end: 37800}],
            workLogSumSeconds: 1800,
          },
        ];
        expect(convertWorkLogArrayDataToWorkLogArrayData(convertData)).toStrictEqual(expectedOutput);
      })
    })

    test("getDateParamsのテスト", () => {
      const [fromDate, toDate] = getDateParams(new Date(2023, 5));
      expect(fromDate).toBe("20230601");
      expect(toDate).toBe("20230630");
    })

    describe("addWithoutWorkDaysのテスト", () => {

      test("作業してない日がある場合（2023年6月）", () => {
        const monthlyWorkLogData: DailyWorkLogData[] = [
          { workLogUserId: 1, date: 1, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 2, day: "金", workLogTime: [{start: 36000, end: 37800}], workLogSumSeconds: 1800 },
        ];
        const expectedOutput = [
          { workLogUserId: 1, date: 1, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 2, day: "金", workLogTime: [{start: 36000, end: 37800}], workLogSumSeconds: 1800 },
          { workLogUserId: 1, date: 3, day: "土", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 4, day: "日", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 5, day: "月", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 6, day: "火", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 7, day: "水", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 8, day: "木", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 9, day: "金", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 10, day: "土", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 11, day: "日", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 12, day: "月", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 13, day: "火", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 14, day: "水", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 15, day: "木", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 16, day: "金", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 17, day: "土", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 18, day: "日", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 19, day: "月", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 20, day: "火", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 21, day: "水", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 22, day: "木", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 23, day: "金", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 24, day: "土", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 25, day: "日", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 26, day: "月", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 27, day: "火", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 28, day: "水", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 29, day: "木", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 30, day: "金", workLogTime: [], workLogSumSeconds: 0 }
        ];

        expect(addWithoutWorkDays(monthlyWorkLogData, "20230630")).toStrictEqual(expectedOutput);
      })

      test("作業してない日がない場合（2023年6月）", () => {
        const monthlyWorkLogData: DailyWorkLogData[] = [
          { workLogUserId: 1, date: 1, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 2, day: "金", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 3, day: "土", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 4, day: "日", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 5, day: "月", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 6, day: "火", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 7, day: "水", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 8, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 9, day: "金", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 10, day: "土", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 11, day: "日", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 12, day: "月", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 13, day: "火", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 14, day: "水", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 15, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 16, day: "金", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 17, day: "土", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 18, day: "日", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 19, day: "月", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 20, day: "火", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 21, day: "水", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 22, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 23, day: "金", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 24, day: "土", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 25, day: "日", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 26, day: "月", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 27, day: "火", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 28, day: "水", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 29, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 30, day: "金", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 }
        ];

        const expectedOutput: DailyWorkLogData[] = [
          { workLogUserId: 1, date: 1, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 2, day: "金", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 3, day: "土", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 4, day: "日", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 5, day: "月", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 6, day: "火", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 7, day: "水", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 8, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 9, day: "金", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 10, day: "土", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 11, day: "日", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 12, day: "月", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 13, day: "火", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 14, day: "水", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 15, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 16, day: "金", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 17, day: "土", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 18, day: "日", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 19, day: "月", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 20, day: "火", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 21, day: "水", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 22, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 23, day: "金", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 24, day: "土", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 25, day: "日", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 26, day: "月", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 27, day: "火", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 28, day: "水", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 29, day: "木", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 },
          { workLogUserId: 1, date: 30, day: "金", workLogTime: [{start: 5400, end: 9000}], workLogSumSeconds: 3600 }
        ];

        expect(addWithoutWorkDays(monthlyWorkLogData, "20230630")).toStrictEqual(expectedOutput);
      });

      test("二桁の月でもしっかりと曜日が表示される（2023年10月", () => {
        const monthlyWorkLogData: DailyWorkLogData[] = [];
        const expectedOutput: DailyWorkLogData[] = [
          { workLogUserId: 1, date: 1, day: "日", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 2, day: "月", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 3, day: "火", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 4, day: "水", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 5, day: "木", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 6, day: "金", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 7, day: "土", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 8, day: "日", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 9, day: "月", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 10, day: "火", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 11, day: "水", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 12, day: "木", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 13, day: "金", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 14, day: "土", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 15, day: "日", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 16, day: "月", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 17, day: "火", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 18, day: "水", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 19, day: "木", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 20, day: "金", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 21, day: "土", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 22, day: "日", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 23, day: "月", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 24, day: "火", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 25, day: "水", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 26, day: "木", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 27, day: "金", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 28, day: "土", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 29, day: "日", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 30, day: "月", workLogTime: [], workLogSumSeconds: 0 },
          { workLogUserId: 1, date: 31, day: "火", workLogTime: [], workLogSumSeconds: 0 }
        ];

        expect(addWithoutWorkDays(monthlyWorkLogData, "20231031")).toStrictEqual(expectedOutput);
      });

    })
  })

  describe("api通信のテスト（年月が変わると落ちる）", () => {

    beforeAll(() => {
      server.listen();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => server.close());

    test("フェッチしてきたデータが勤怠表画面に正しく表示される", async () => {
      const user = userEvent.setup();
      render(<WorKLog />);
      server.use(
        rest.get("http://localhost:8080/work-logs/user-id/1",
          (req, res, ctx) => {
            const fromQuery = req.url.searchParams.get("from");
            const toQuery = req.url.searchParams.get("to");

            if (fromQuery === "20230601" && toQuery === "20230630") {
              return res(
                ctx.status(200),
                ctx.json(
                  [
                    {
                      workLogId: 1,
                      workLogUserId: 1,
                      workLogDate: "2023-06-29",
                      workLogStartTime: "2023-06-29 9:00:59",
                      workLogEndTime: "2023-06-29 12:00:00",
                      workLogSeconds: 10741
                    },
                    {
                      workLogId: 2,
                      workLogUserId: 1,
                      workLogDate: "2023-06-30",
                      workLogStartTime: "2023-06-30 13:00:00",
                      workLogEndTime: "2023-06-30 13:30:00",
                      workLogSeconds: 1800
                    },
                  ]
                )
              )
            }
          }
        )
      )
      const selectYearAndMonthEl = screen.getByRole("textbox");
      await user.click(selectYearAndMonthEl);
      // ToDo 年月が変わると落ちるからどうにかしたい
      const yearOptionEl = await screen.findByLabelText("month 2023-07");
      const monthOptionEl = await within(yearOptionEl).findByText("6月")
      await user.click(monthOptionEl);

      const expectedOutput1 = await screen.findByText("02:59:01")
      const expectedOutput2 = await screen.findByText("29（木）")
      const expectedOutput3 = await screen.findByText("30（金）")
      expect(expectedOutput1).toBeInTheDocument();
      expect(expectedOutput2).toBeInTheDocument();
      expect(expectedOutput3).toBeInTheDocument();

      const tableEls = await screen.findAllByRole("table");
      const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
      const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
      const cellAllEl = await within(rowEl[0]).findAllByRole("cell");
      expect((cellAllEl[0]).textContent).toEqual("1（木）");
      expect((cellAllEl[1]).textContent).toEqual("00:00:00");
    })

    test("データ取得に失敗した時、画面にエラーメッセージが表示される", async () => {
      server.use(
        rest.get(
          "http://localhost:8080/work-logs/user-id/1",
          (req, res, ctx) => {
            const fromQuery = req.url.searchParams.get("from");
            const toQuery = req.url.searchParams.get("to");

            if (fromQuery === "20230601" && toQuery === "20230630") {
              return res(ctx.status(404));
            }
          }
        )
      );
      const user = userEvent.setup();
      render(<WorKLog />);
      const selectYearAndMonthEl = screen.getByRole("textbox");
      await user.click(selectYearAndMonthEl);
      // ToDo 年月が変わると落ちるからどうにかしたい
      const yearOptionEl = await screen.findByLabelText("month 2023-07");
      const monthOptionEl = await within(yearOptionEl).findByText("6月")
      await user.click(monthOptionEl);

      expect(await screen.findByText("接続エラーが起きました。時間をおいて再度お試しください。")).toBeInTheDocument();
    })
  })
})