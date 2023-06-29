import { render, screen, within, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import WorKLog from "../../page/WorkLog";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  rest.get("http://localhost:8080/work-logs?from=20230601&to=20230630",
  (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        workLogId: 1,
        workLogUserId: 1,
        workLogDate: "2023-06-29",
        workLogStartTime: "2023-06-29 9:00:59",
        workLogEndTime: "2023-06-29 12:00:00",
        workLogSeconds: 10701
      })
    )
  })
)

describe("WorkLogのテスト", () => {

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
    const yearOptionEl = await screen.findByLabelText("month 2023-06");
    const monthOptionEl = await within(yearOptionEl).findByText("6月")
    await user.click(monthOptionEl);

    const tableEls = await screen.findAllByRole("table");
    const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
    const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
    const cellAllEl = await within(rowEl[0]).findAllByRole("cell");
    await waitFor(() => expect((cellAllEl[0]).textContent).toEqual("29"));
    await waitFor(() => expect((cellAllEl[1]).textContent).toEqual("2:59:01"));
  })

  test("データ取得に失敗した時、画面にエラーメッセージが表示される", async () => {
    server.use(
      rest.get(
        "http://localhost:8080/work-logs?from=20230601&to=20230630",
        (_, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    const user = userEvent.setup();
    render(<WorKLog />);
    const selectYearAndMonthEl = screen.getByRole("textbox");
    await user.click(selectYearAndMonthEl);
    const yearOptionEl = await screen.findByLabelText("month 2023-06");
    const monthOptionEl = await within(yearOptionEl).findByText("6月")
    await user.click(monthOptionEl);

    await waitFor(() => expect("接続エラー 時間をおいて再度お試しください。").toBeInTheDocument());
  })
})