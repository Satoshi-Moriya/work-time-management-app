import { render, screen, within } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

import RecordItemLog from "../../../features/RecordItemLog/pages/RecordItemLog";
import { AuthContext } from "../../../features/Auth/components/AuthProvider";

const server = setupServer(
  rest.get("http://localhost:8080/record-items/:userId",
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        [
          {
            recordItemId: 1,
            userId: 1,
            recordItemName: "稼働時間"
          },
          {
            recordItemId: 2,
            userId: 1,
            recordItemName: "練習時間"
          },
        ]
      )
    )}
  ),

  rest.get("http://localhost:8080/record-item-logs/:recordItemId",
  (req, res, ctx) => {
    const fromQuery = req.url.searchParams.get("from");
    const toQuery = req.url.searchParams.get("to");

    // ToDo 年月が変わると落ちるからどうにかしたい
    if (fromQuery === "20231001" && toQuery === "20231031") {
      return res(
        ctx.status(200),
        ctx.json(
          [
            {
              recordItemLogId: 1,
              recordItemId: 1,
              recordItemLogDate: "2023-10-29",
              recordItemLogStartTime: "2023-10-29 09:00:59",
              recordItemLogEndTime: "2023-10-29 12:00:00",
              recordItemLogSeconds: 10741
            },
          ]
        )
      )
    }
  }),

  rest.post("http://localhost:8080/csrf", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: "testToken"
      })
    );
  })
);

describe("RecordItemLogのテスト", () => {

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  describe("初期表示のテスト", () => {

    test("取得してきた記録項目がある場合、selectboxに記録項目が正しく表示される", async() => {
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );

      const selectRecordItemEl = await screen.findByRole("combobox");
      const optionListEl = await within(selectRecordItemEl).findAllByRole("option");
      const option1El = optionListEl[0];
      const option2El = optionListEl[1];

      expect(option1El.textContent).toBe("稼働時間");
      expect(option2El.textContent).toBe("練習時間");
    });

    test("取得してきた記録項目がない場合、画面に適切なメッセージが表示される", async() => {
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      server.use(
        rest.get("http://localhost:8080/record-items/:userId",
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([])
          )}
        )
      );

      const expectedMessage = await screen.findByText("記録項目の登録がまだありません。")
      expect(expectedMessage).toBeInTheDocument();
    });

    test("記録項目を取得に失敗した場合、画面にエラーメッセージが表示される", async() => {
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      server.use(
        rest.get("http://localhost:8080/record-items/:userId",
        (req, res, ctx) => {
          return res(ctx.status(403))}
        )
      );

      const expectedMessage = await screen.findByText("接続エラーが起きました。時間をおいて再度お試しください。")
      expect(expectedMessage).toBeInTheDocument();
    });

    test("記録項目と取得してきた記録項目のその月の記録が取得できた場合、記録表が画面に正しく表示される", async () => {
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      server.use(
        rest.get("http://localhost:8080/record-items/:userId",
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json(
                [
                  {
                    recordItemId: 1,
                    userId: 1,
                    recordItemName: "稼働時間"
                  },
                  {
                    recordItemId: 2,
                    userId: 1,
                    recordItemName: "練習時間"
                  },
                ]
              )
            )}
        ),

        rest.get("http://localhost:8080/record-item-logs/:recordItemId",
          (req, res, ctx) => {
            const fromQuery = req.url.searchParams.get("from");
            const toQuery = req.url.searchParams.get("to");

            // ToDo 年月が変わると落ちるからどうにかしたい
            if (fromQuery === "20231001" && toQuery === "20231031") {
              return res(
                ctx.status(200),
                ctx.json(
                  [
                    {
                      recordItemLogId: 1,
                      recordItemId: 1,
                      recordItemLogDate: "2023-10-29",
                      recordItemLogStartTime: "2023-10-29 09:00:59",
                      recordItemLogEndTime: "2023-10-29 12:00:00",
                      recordItemLogSeconds: 10741
                    },
                    {
                      recordItemLogId: 1,
                      recordItemId: 1,
                      recordItemLogDate: "2023-10-30",
                      recordItemLogStartTime: "2023-10-30 13:00:00",
                      recordItemLogEndTime: "2023-10-30 13:30:00",
                      recordItemLogSeconds: 1800
                    }
                  ]
                )
              )
            }
          }
        )
      )

      const expectedOutput1 = await screen.findByText("03:29:01");
      const expectedOutput2 = await screen.findAllByText("稼働時間");
      const expectedOutput3 = await screen.findByText("29(日)");
      const expectedOutput4 = await screen.findByText("30(月)");
      const expectedOutput5 = await screen.findByText("02:59:01");
      const expectedOutput6 = await screen.findByText("00:30:00");
      expect(expectedOutput1).toBeInTheDocument();
      expect(expectedOutput2).toHaveLength(2);
      expect(expectedOutput3).toBeInTheDocument();
      expect(expectedOutput4).toBeInTheDocument();
      expect(expectedOutput5).toBeInTheDocument();
      expect(expectedOutput6).toBeInTheDocument();

      const tableEls = await screen.findAllByRole("table");
      const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
      const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
      const cellAllEl = await within(rowEl[0]).findAllByRole("cell");
      expect((cellAllEl[0]).textContent).toEqual("1(日)");
      expect((cellAllEl[1]).textContent).toEqual("00:00:00");
    });

    test("記録項目は取得できたが、取得してきた記録項目のその月の記録が取得に失敗した場合、画面にエラーメッセージが表示される", async () => {
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      server.use(
        rest.get("http://localhost:8080/record-items/:userId",
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json(
                [
                  {
                    recordItemId: 1,
                    userId: 1,
                    recordItemName: "稼働時間"
                  },
                  {
                    recordItemId: 2,
                    userId: 1,
                    recordItemName: "練習時間"
                  },
                ]
              )
            )}
        ),

        rest.get("http://localhost:8080/record-item-logs/:recordItemId",
          (req, res, ctx) => {
            const fromQuery = req.url.searchParams.get("from");
            const toQuery = req.url.searchParams.get("to");

            if (fromQuery === "20231001" && toQuery === "20231031") {
              return res(ctx.status(403))
            }
          }
        )
      );

      const expectedMessage = await screen.findByText("接続エラーが起きました。時間をおいて再度お試しください。")
      expect(expectedMessage).toBeInTheDocument();
    });
  });

  describe("記録項目を変更するときのテスト", () => {

    test("記録項目を変更した場合、記録表が画面に正しく表示される", async () => {
      const user = userEvent.setup();
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      server.use(

        rest.get("http://localhost:8080/record-item-logs/:recordItemId",
        (req, res, ctx) => {
          const fromQuery = req.url.searchParams.get("from");
          const toQuery = req.url.searchParams.get("to");

          // ToDo 年月が変わると落ちるからどうにかしたい
          if (fromQuery === "20231001" && toQuery === "20231031") {
            return res(
              ctx.status(200),
              ctx.json(
                [
                  {
                    recordItemLogId: 2,
                    recordItemId: 2,
                    recordItemLogDate: "2023-10-29",
                    recordItemLogStartTime: "2023-10-29 09:00:59",
                    recordItemLogEndTime: "2023-10-29 12:00:00",
                    recordItemLogSeconds: 10741
                  },
                  {
                    recordItemLogId: 3,
                    recordItemId: 2,
                    recordItemLogDate: "2023-10-15",
                    recordItemLogStartTime: "2023-10-15 10:00:00",
                    recordItemLogEndTime: "2023-10-15 12:00:00",
                    recordItemLogSeconds: 7200
                  },
                  {
                    recordItemLogId: 4,
                    recordItemId: 2,
                    recordItemLogDate: "2023-10-30",
                    recordItemLogStartTime: "2023-10-30 12:00:00",
                    recordItemLogEndTime: "2023-10-30 13:00:00",
                    recordItemLogSeconds: 3600
                  },
                ]
              )
            )
          }
        })
      );
      const selectRecordItemEl = await screen.findByRole("combobox");
      user.selectOptions(selectRecordItemEl, "2")

      const expectedOutput1 = await screen.findByText("05:59:01");
      const expectedOutput2 = await screen.findByText("29(日)");
      const expectedOutput3 = await screen.findByText("02:59:01");
      expect(expectedOutput1).toBeInTheDocument();
      expect(expectedOutput2).toBeInTheDocument();
      expect(expectedOutput3).toBeInTheDocument();

      const tableEls = await screen.findAllByRole("table");
      const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
      const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
      const cellAllEl = await within(rowEl[0]).findAllByRole("cell");
      expect((cellAllEl[0]).textContent).toEqual("1(日)");
      expect((cellAllEl[1]).textContent).toEqual("00:00:00");
    });

    test("記録項目を変更したとき、データ取得に失敗した場合、画面にエラーメッセージが表示される", async () => {
      const user = userEvent.setup();
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      server.use(
        rest.get("http://localhost:8080/record-item-logs/:recordItemId",
        (req, res, ctx) => {
          const fromQuery = req.url.searchParams.get("from");
          const toQuery = req.url.searchParams.get("to");
          const { recordItemId } = req.params;

          // ToDo 年月が変わると落ちるからどうにかしたい
          if (fromQuery === "20231001" && toQuery === "20231031") {
            if (recordItemId === "1") {
              return res(ctx.status(200),
              ctx.json(
                [
                  {
                    recordItemLogId: 2,
                    recordItemId: 1,
                    recordItemLogDate: "2023-10-29",
                    recordItemLogStartTime: "2023-10-29 09:00:59",
                    recordItemLogEndTime: "2023-10-29 12:00:00",
                    recordItemLogSeconds: 10741
                  },
                ]
              ))
            } else if (recordItemId === "2") {
              return res(ctx.status(403))
            }
          }
        })
      );
      const selectRecordItemEl = await screen.findByRole("combobox");
      user.selectOptions(selectRecordItemEl, "2")

      const expectedMessage = await screen.findByText("接続エラーが起きました。時間をおいて再度お試しください。")
      expect(expectedMessage).toBeInTheDocument();
    });
  })

  describe("年月を変更するときのテスト", () => {

    test("年月を変更した場合、記録表が画面に正しく表示される", async () => {
      const user = userEvent.setup();
      server.use(

        rest.get("http://localhost:8080/record-item-logs/:recordItemId",
        (req, res, ctx) => {
          const fromQuery = req.url.searchParams.get("from");
          const toQuery = req.url.searchParams.get("to");

          if (fromQuery === "20230701" && toQuery === "20230731") {
            return res(
              ctx.status(200),
              ctx.json(
                [
                  {
                    recordItemLogId: 2,
                    recordItemId: 1,
                    recordItemLogDate: "2023-07-29",
                    recordItemLogStartTime: "2023-07-29 09:00:59",
                    recordItemLogEndTime: "2023-07-29 12:00:00",
                    recordItemLogSeconds: 10741
                  },
                  {
                    recordItemLogId: 3,
                    recordItemId: 1,
                    recordItemLogDate: "2023-07-30",
                    recordItemLogStartTime: "2023-07-30 11:00:00",
                    recordItemLogEndTime: "2023-07-30 12:00:00",
                    recordItemLogSeconds: 3600
                  }
                ]
              )
            )
          }
        })
      );
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      const selectYearAndMonthEl = await screen.findByRole("textbox");
      await user.click(selectYearAndMonthEl);
      // ToDo 年月が変わると落ちるからどうにかしたい
      const yearOptionEl = await screen.findByLabelText("month 2023-10");
      const monthOptionEl = await within(yearOptionEl).findByText("7月")
      await user.click(monthOptionEl);

      const expectedOutput1 = await screen.findByText("03:59:01");
      const expectedOutput2 = await screen.findByText("29(土)");
      const expectedOutput3 = await screen.findByText("02:59:01");
      expect(expectedOutput1).toBeInTheDocument();
      expect(expectedOutput2).toBeInTheDocument();
      expect(expectedOutput3).toBeInTheDocument();

      const tableEls = await screen.findAllByRole("table");
      const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
      const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
      const cellAllEl = await within(rowEl[0]).findAllByRole("cell");
      expect((cellAllEl[0]).textContent).toEqual("1(土)");
      expect((cellAllEl[1]).textContent).toEqual("00:00:00");
    });

    test("年月を変更したときにデータ取得に失敗した場合、画面にエラーメッセージが表示される", async () => {
      const user = userEvent.setup();
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      server.use(
        rest.get("http://localhost:8080/record-item-logs/:recordItemId",
        (req, res, ctx) => {
          const fromQuery = req.url.searchParams.get("from");
          const toQuery = req.url.searchParams.get("to");

          if (fromQuery === "20230701" && toQuery === "20230731") {
            return res(ctx.status(403))
          }
        })
      );
      const selectYearAndMonthEl = await screen.findByRole("textbox");
      await user.click(selectYearAndMonthEl);
      // ToDo 年月が変わると落ちるからどうにかしたい
      const yearOptionEl = await screen.findByLabelText("month 2023-10");
      const monthOptionEl = await within(yearOptionEl).findByText("7月")
      await user.click(monthOptionEl);

      expect(await screen.findByText("接続エラーが起きました。時間をおいて再度お試しください。")).toBeInTheDocument();
    });
  })

  describe("記録を編集するときのテスト", () => {

    test("初期表示の記録表の編集ボタンを押した時、モーダルに正しく表示される", async () => {
      const user = userEvent.setup();
      server.use(
        rest.get("http://localhost:8080/record-item-logs/:recordItemId",
        (req, res, ctx) => {
          const fromQuery = req.url.searchParams.get("from");
          const toQuery = req.url.searchParams.get("to");

          // ToDo 年月が変わると落ちるからどうにかしたい
          if (fromQuery === "20231001" && toQuery === "20231031") {
            return res(ctx.status(200),
            ctx.json(
              [
                {
                  recordItemLogId: 1,
                  recordItemId: 1,
                  recordItemLogDate: "2023-10-01",
                  recordItemLogStartTime: "2023-10-01 09:00:00",
                  recordItemLogEndTime: "2023-10-01 11:00:00",
                  recordItemLogSeconds: 3600
                },
              ]
            ))
          }
        })
      );
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      const tableEls = await screen.findAllByRole("table");
      const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
      const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
      // 1日の編集ボタン
      const firstRowCellAllEl = await within(rowEl[0]).findAllByRole("cell");
      const targetButton1El = await within(firstRowCellAllEl[2]).findByRole("button");
      // 2日の編集ボタン
      const secondRowCellAllEl = await within(rowEl[1]).findAllByRole("cell");
      const targetButton2El = await within(secondRowCellAllEl[2]).findByRole("button");

      await user.click(targetButton1El);

      // ToDo 年月が変わると落ちるからどうにかしたい
      const expectedModal1Title = await screen.findByText("2023年10月1日の稼働時間の編集")
      const expectedModal1EL1 = await screen.findByText("登録済みの時間")
      const expectedModal1EL2 = await screen.findByText("09:00:00")
      const expectedModal1EL3 = await screen.findByText("11:00:00")
      expect(expectedModal1Title).toBeInTheDocument();
      expect(expectedModal1EL1).toBeInTheDocument();
      expect(expectedModal1EL2).toBeInTheDocument();
      expect(expectedModal1EL3).toBeInTheDocument();

      await user.click(targetButton2El);

      const expectedModal2Title = await screen.findByText("2023年10月2日の稼働時間の編集")
      expect(expectedModal2Title).toBeInTheDocument();
      expect(expectedModal1EL1).not.toBeInTheDocument();
    });
  })
})