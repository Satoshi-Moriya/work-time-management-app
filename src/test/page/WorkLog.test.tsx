import { render, screen, within, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

import WorKLog, { getWeekdayFromDate, convertToWorkLogDataArray } from "../../page/WorkLog";
import { WorkLogData, TimeRange} from "../../types";

const server = setupServer(
  rest.get("http://localhost:8080/work-logs",
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
              workLogId: 1,
              workLogUserId: 1,
              workLogDate: "2023-06-29",
              workLogStartTime: "2023-06-29 9:00:59",
              workLogEndTime: "2023-06-29 12:00:00",
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

    test("convertToWorkLogDataArrayのテスト", () => {
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
      const comparisonWorkLogData: WorkLogData[] = [
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
      expect(convertToWorkLogDataArray(selectedMonthlyWorkLogRes)).toStrictEqual(comparisonWorkLogData);
    })
  })

  describe("api通信のテスト", () => {

    beforeAll(() => server.listen());

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => server.close());

    test("フェッチしてきたデータが勤怠表画面に正しく表示される", async () => {
      const user = userEvent.setup();
      render(<WorKLog />);
      const selectYearAndMonthEl = screen.getByRole("textbox");
      await user.click(selectYearAndMonthEl);
      // ToDo 年月が変わると落ちるからどうにかしたい
      const yearOptionEl = await screen.findByLabelText("month 2023-07");
      const monthOptionEl = await within(yearOptionEl).findByText("6月")
      await user.click(monthOptionEl);

      const tableEls = await screen.findAllByRole("table");
      const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
      const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
      const cellAllEl = await within(rowEl[0]).findAllByRole("cell");
      await waitFor(() => expect((cellAllEl[0]).textContent).toEqual("29（木）"));
      await waitFor(() => expect((cellAllEl[1]).textContent).toEqual("2:59:01"));
    })

    test("データ取得に失敗した時、画面にエラーメッセージが表示される", async () => {
      server.use(
        rest.get(
          "http://localhost:8080/work-logs",
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