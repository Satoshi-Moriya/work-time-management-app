import { render, screen, within } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { AuthContext } from "../../../features/Auth/components/AuthProvider";
import RecordItem from "../../../features/RecordItem/pages/RecordItem";
import userEvent from "@testing-library/user-event";

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
    );
  }),

  rest.post("http://localhost:8080/csrf", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: "testToken"
      })
    );
  }),

  rest.post("http://localhost:8080/record-items", (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.delete("http://localhost:8080/record-items/:rocordItemId", (req, res, ctx) => {
    return res(ctx.status(204));
  })
)

describe("RecordItemのテスト", () => {

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  describe("初期表示のテスト", () => {

    test("取得してきた記録項目がある場合、画面に記憶項目が表示される", async() => {
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItem />
        </AuthContext.Provider>
      );

      const expectedDisplayRecordItem1 = await screen.findByText("稼働時間");
      const expectedDisplayRecordItem2 = await screen.findByText("練習時間");
      const expectedDisplayRecordItem3 = await screen.findAllByText("削除");

      expect(expectedDisplayRecordItem1).toBeInTheDocument();
      expect(expectedDisplayRecordItem2).toBeInTheDocument();
      expect(expectedDisplayRecordItem3).toHaveLength(2);
    });

    test("取得してきた記録項目がない場合、画面に記録項目が表示されない", async() => {
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItem />
        </AuthContext.Provider>
      );

      const notDisplayText = screen.queryByText("削除");
      expect(notDisplayText).not.toBeInTheDocument();
    });

    test("記録項目の取得に失敗した場合、画面にエラーメッセージが表示される", async() => {
      server.use(
        rest.get("http://localhost:8080/record-items/:userId",
        (req, res, ctx) => {
          return res(ctx.status(403));
        })
      );

      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItem />
        </AuthContext.Provider>
      );

      const displayErrorMessage = await screen.findByText("接続エラーが起きました。時間をおいて再度お試しください。");
      expect(displayErrorMessage).toBeInTheDocument();
    });
  });

  describe("記録項目を登録するときのテスト", () => {

    test("記録項目の登録が成功した場合、登録した記録項目と成功メッセージが画面に表示される", async() => {
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
          );
        })
      );

      render(
        <div id="root">
          <AuthContext.Provider value={[ 1, () => {}]} >
            <RecordItem />
          </AuthContext.Provider>
        </div>
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
                {
                  recordItemId: 3,
                  userId: 1,
                  recordItemName: "睡眠時間"
                },
              ]
            )
          );
        })
      );

      const user = userEvent.setup();
      const textInputEl = screen.getByPlaceholderText("項目名を入力");
      const newButtonEl = screen.getByRole("button", {name: "新規"});

      await user.type(textInputEl, "睡眠時間");
      await user.click(newButtonEl);

      const alertEl = await screen.findByRole("alert");
      const expectedToastText = await within(alertEl).findByText("記録項目が登録されました。")
      expect(expectedToastText).toBeInTheDocument();

      const expectedDisplayRecordItem1 = await screen.findByText("稼働時間");
      const expectedDisplayRecordItem2 = await screen.findByText("練習時間");
      const expectedDisplayRecordItem3 = await screen.findByText("睡眠時間");
      const expectedDisplayRecordItem4 = await screen.findAllByText("削除");

      expect(expectedDisplayRecordItem1).toBeInTheDocument();
      expect(expectedDisplayRecordItem2).toBeInTheDocument();
      expect(expectedDisplayRecordItem3).toBeInTheDocument();
      expect(expectedDisplayRecordItem4).toHaveLength(3);
    });

    test("記録項目の登録が失敗した場合、元から登録されていた記録項目と失敗メッセージが画面に表示される", async() => {
      server.use(
        rest.post("http://localhost:8080/record-items", (req, res, ctx) => {
          return res(ctx.status(403));
        }),

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
          );
        })
      );

      render(
        <div id="root">
          <AuthContext.Provider value={[ 1, () => {}]} >
            <RecordItem />
          </AuthContext.Provider>
        </div>
      );

      const user = userEvent.setup();
      const textInputEl = screen.getByPlaceholderText("項目名を入力");
      const newButtonEl = screen.getByRole("button", {name: "新規"});

      await user.type(textInputEl, "睡眠時間");
      await user.click(newButtonEl);

      const alertEl = await screen.findByRole("alert");
      const expectedToastText = await within(alertEl).findByText("予期せぬエラーが発生し、記録項目が登録できませんでした。")
      expect(expectedToastText).toBeInTheDocument();

      const expectedDisplayRecordItem1 = await screen.findByText("稼働時間");
      const expectedDisplayRecordItem2 = await screen.findByText("練習時間");
      const expectedDisplayRecordItem3 = await screen.findAllByText("削除");

      expect(expectedDisplayRecordItem1).toBeInTheDocument();
      expect(expectedDisplayRecordItem2).toBeInTheDocument();
      expect(expectedDisplayRecordItem3).toHaveLength(2);
    });
  });

  describe("記録項目を削除するときのテスト", () => {

    test("記録項目の削除が成功した場合、残りの記録項目と成功メッセージが画面に表示される", async() => {
      render(
        <div id="root">
          <AuthContext.Provider value={[ 1, () => {}]} >
            <RecordItem />
          </AuthContext.Provider>
        </div>
      );

      server.use(
        rest.get("http://localhost:8080/record-items/:userId",
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json(
              [
                {
                  recordItemId: 2,
                  userId: 1,
                  recordItemName: "練習時間"
                },
              ]
            )
          );
        })
      );

      const user = userEvent.setup();
      const deleteButtonEls = await screen.findAllByRole("button", {name: "削除"});
      const confirmMock = jest.spyOn(window, "confirm");
      confirmMock.mockImplementation(() => true);

      await user.click(deleteButtonEls[0]);

      const alertEl = await screen.findByRole("alert");
      const expectedToastText = await within(alertEl).findByText("記録項目が削除されました。")
      expect(expectedToastText).toBeInTheDocument();

      const expectedDisplayRecordItem1 = await screen.findByText("練習時間");
      const expectedDisplayRecordItem2 = await screen.findAllByText("削除");

      expect(expectedDisplayRecordItem1).toBeInTheDocument();
      expect(expectedDisplayRecordItem2).toHaveLength(1);

      confirmMock.mockRestore();
    });

    test("記録項目の登録が失敗した場合、元から登録されていた記録項目と失敗メッセージが画面に表示される", async() => {
      server.use(
        rest.post("http://localhost:8080/record-items", (req, res, ctx) => {
          return res(ctx.status(403));
        })
      );

      render(
        <div id="root">
          <AuthContext.Provider value={[ 1, () => {}]} >
            <RecordItem />
          </AuthContext.Provider>
        </div>
      );

      const user = userEvent.setup();
      const textInputEl = screen.getByPlaceholderText("項目名を入力");
      const newButtonEl = screen.getByRole("button", {name: "新規"});

      await user.type(textInputEl, "睡眠時間");
      await user.click(newButtonEl);

      const alertEl = await screen.findByRole("alert");
      const expectedToastText = await within(alertEl).findByText("予期せぬエラーが発生し、記録項目が登録できませんでした。")
      expect(expectedToastText).toBeInTheDocument();
    });
  });
});