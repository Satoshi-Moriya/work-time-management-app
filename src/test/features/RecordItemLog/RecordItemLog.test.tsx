import { render, screen, within } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

import RecordItemLog from "../../../features/RecordItemLog/pages/RecordItemLog";
import { AuthContext } from "../../../features/Auth/components/AuthProvider";

const server = setupServer(
  rest.get("http://localhost:8080/record-item-logs/:recordItemId",
  (req, res, ctx) => {
    const fromQuery = req.url.searchParams.get("from");
    const toQuery = req.url.searchParams.get("to");

    // ToDo 年月が変わると落ちるからどうにかしたい
    if (fromQuery === "20230801" && toQuery === "20230831") {
      return res(
        ctx.status(200),
        ctx.json(
          [
            {
              recordItemLogId: 1,
              recordItemId: 1,
              recordItemLogDate: "2023-08-29",
              recordItemLogStartTime: "2023-08-29 9:00:59",
              recordItemLogEndTime: "2023-08-29 12:00:00",
              recordItemLogSeconds: 10741
            },
          ]
        )
      )
    }
  })
)

describe("RecordItemLogのテスト", () => {

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
      render(
        <AuthContext.Provider value={[ 1, "mock@email.com", () => {}, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      server.use(
        rest.get("http://localhost:8080/record-item-logs/:recordItemId",
          (req, res, ctx) => {
            const fromQuery = req.url.searchParams.get("from");
            const toQuery = req.url.searchParams.get("to");

            if (fromQuery === "20230601" && toQuery === "20230630") {
              return res(
                ctx.status(200),
                ctx.json(
                  [
                    {
                      recordItemLogId: 1,
                      recordItemId: 1,
                      recordItemLogDate: "2023-06-29",
                      recordItemLogStartTime: "2023-06-29 09:00:59",
                      recordItemLogEndTime: "2023-06-29 12:00:00",
                      recordItemLogSeconds: 10741
                    },
                    {
                      recordItemLogId: 1,
                      recordItemId: 1,
                      recordItemLogDate: "2023-06-30",
                      recordItemLogStartTime: "2023-06-30 13:00:00",
                      recordItemLogEndTime: "2023-06-30 13:30:00",
                      recordItemLogSeconds: 1800
                    }
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
      const yearOptionEl = await screen.findByLabelText("month 2023-08");
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
          "http://localhost:8080/record-item-logs/:recordItemId",
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
      render(
        <AuthContext.Provider value={[ 1, "mock@email.com", () => {}, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      const selectYearAndMonthEl = screen.getByRole("textbox");
      await user.click(selectYearAndMonthEl);
      // ToDo 年月が変わると落ちるからどうにかしたい
      const yearOptionEl = await screen.findByLabelText("month 2023-08");
      const monthOptionEl = await within(yearOptionEl).findByText("6月")
      await user.click(monthOptionEl);

      expect(await screen.findByText("接続エラーが起きました。時間をおいて再度お試しください。")).toBeInTheDocument();
    })
  })
})