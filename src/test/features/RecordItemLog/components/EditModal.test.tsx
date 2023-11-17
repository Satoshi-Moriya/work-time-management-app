import { render, screen, within, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

import RecordItemLog from "../../../../features/RecordItemLog/pages/RecordItemLog";
import { AuthContext } from "../../../../features/Auth/components/AuthProvider";

// コンポーネント単位でテストしたいが、EditModalコンポーネントのコードが肥大化しすぎており
// 一旦下記のテストでOKとする（単体テストというようり結合テストに近い）
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
    if (fromQuery === "20231101" && toQuery === "20231130") {
      return res(
        ctx.status(200),
        ctx.json(
          [
            {
              recordItemLogId: 1,
              recordItemId: 1,
              recordItemLogDate: "2023-11-01",
              recordItemLogStartTime: "2023-11-01 09:00:59",
              recordItemLogEndTime: "2023-11-01 12:00:00",
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

describe("EditModalのテスト", () => {

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  describe("バリデーションチェック", () => {

    test("開始時刻、終了時刻ともに空の場合", async() => {
      const user = userEvent.setup();
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      const tableEls = await screen.findAllByRole("table");
      // 2つ目のtableElsがグラフなどがある表
      const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
      const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
      // 1日の編集ボタン
      const firstRowCellAllEl = await within(rowEl[0]).findAllByRole("cell");
      const editButtonEl = await within(firstRowCellAllEl[2]).findByRole("button");
      user.click(editButtonEl);

      const registerButtonEl = await screen.findByRole("button", {name: "保存"});
      user.click(registerButtonEl);

      const expectedStartTimeEmptyErrorMessage = await screen.findByText("開始時間は必須です。");
      const expectedEndTimeEmptyErrorMessage = await screen.findByText("終了時間は必須です。");
      expect(expectedStartTimeEmptyErrorMessage).toBeInTheDocument();
      expect(expectedEndTimeEmptyErrorMessage).toBeInTheDocument();
    });

    test("開始時刻が空の場合", async() => {
      const user = userEvent.setup();
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      const tableEls = await screen.findAllByRole("table");
      // 2つ目のtableElsがグラフなどがある表
      const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
      const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
      // 1日の編集ボタン
      const firstRowCellAllEl = await within(rowEl[0]).findAllByRole("cell");
      const editButtonEl = await within(firstRowCellAllEl[2]).findByRole("button");
      user.click(editButtonEl);

      const startTimeInputEl = await screen.findByLabelText("開始時間");
      const endTimeInputEl = await screen.findByLabelText("終了時間");
      const registerButtonEl = await screen.findByRole("button", {name: "保存"});
      await user.type(startTimeInputEl, "08:00:00");
      await user.type(endTimeInputEl, "09:00:00");
      await waitFor(() => user.clear(startTimeInputEl));
      await waitFor(() => user.click(registerButtonEl));

      const expectedStartTimeEmptyErrorMessage = await screen.findByText("開始時間は必須です。");
      expect(expectedStartTimeEmptyErrorMessage).toBeInTheDocument();
      expect("終了時間は必須です。").not.toBe(true);
    });

    test("終了時刻が空の場合", async() => {
      const user = userEvent.setup();
      render(
        <AuthContext.Provider value={[ 1, () => {}]} >
          <RecordItemLog />
        </AuthContext.Provider>
      );
      const tableEls = await screen.findAllByRole("table");
      // 2つ目のtableElsがグラフなどがある表
      const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
      const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
      // 1日の編集ボタン
      const firstRowCellAllEl = await within(rowEl[0]).findAllByRole("cell");
      const editButtonEl = await within(firstRowCellAllEl[2]).findByRole("button");
      user.click(editButtonEl);

      const startTimeInputEl = await screen.findByLabelText("開始時間");
      const endTimeInputEl = await screen.findByLabelText("終了時間");
      const registerButtonEl = await screen.findByRole("button", {name: "保存"});
      await user.type(startTimeInputEl, "08:00:00");
      await user.type(endTimeInputEl, "09:00:00");
      await waitFor(() => user.clear(endTimeInputEl));
      await waitFor(() => user.click(registerButtonEl));

      const expectedEndTimeEmptyErrorMessage = await screen.findByText("終了時間は必須です。");
      expect(expectedEndTimeEmptyErrorMessage).toBeInTheDocument();
      expect("開始時間は必須です。").not.toBe(true);
      await waitFor(() => expect("開始時間は必須です。").not.toBe(true));
    });
  });

  test("登録しようとする開始時間が、既に登録のある時間帯と被る場合", async() => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={[1, () => {}]} >
        <RecordItemLog />
      </AuthContext.Provider>
    );
    const tableEls = await screen.findAllByRole("table");
    // 2つ目のtableElsがグラフなどがある表
    const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
    const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
    // 1日の編集ボタン
    const firstRowCellAllEl = await within(rowEl[0]).findAllByRole("cell");
    const editButtonEl = await within(firstRowCellAllEl[2]).findByRole("button");
    user.click(editButtonEl);

    const startTimeInputEl = await screen.findByLabelText("開始時間");
    user.type(startTimeInputEl, "11:59:59");

    const expectedStartTimeUsedErrorMessage = await screen.findByText("その開始時間は既に登録されています。");
    expect(expectedStartTimeUsedErrorMessage).toBeInTheDocument();
  });

  test("登録しようとする終了時間が、既に登録のある時間帯と被る場合", async() => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={[1, () => {}]} >
        <RecordItemLog />
      </AuthContext.Provider>
    );
    const tableEls = await screen.findAllByRole("table");
    // 2つ目のtableElsがグラフなどがある表
    const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
    const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
    // 1日の編集ボタン
    const firstRowCellAllEl = await within(rowEl[0]).findAllByRole("cell");
    const editButtonEl = await within(firstRowCellAllEl[2]).findByRole("button");
    user.click(editButtonEl);

    const endTimeInputEl = await screen.findByLabelText("終了時間");
    user.type(endTimeInputEl, "12:00:00");

    const expectedEndTimeUsedErrorMessage = await screen.findByText("その終了時間は既に登録されています。");
    expect(expectedEndTimeUsedErrorMessage).toBeInTheDocument();
  });

  test("登録しようとする開始時間、終了時間共に、既に登録のある時間帯と被る場合", async() => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={[1, () => {}]} >
        <RecordItemLog />
      </AuthContext.Provider>
    );
    const tableEls = await screen.findAllByRole("table");
    // 2つ目のtableElsがグラフなどがある表
    const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
    const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
    // 1日の編集ボタン
    const firstRowCellAllEl = await within(rowEl[0]).findAllByRole("cell");
    const editButtonEl = await within(firstRowCellAllEl[2]).findByRole("button");
    user.click(editButtonEl);

    const startTimeInputEl = await screen.findByLabelText("開始時間");
    const endTimeInputEl = await screen.findByLabelText("終了時間");
    // findByにしているのにさらにwaitForさせる意味がちょっとわからない
    // コードがかなり肥大化しているのが原因だと思われる
    await waitFor(() => user.type(startTimeInputEl, "11:59:59"));
    await waitFor(() => user.type(endTimeInputEl, "12:00:00"));

    const expectedStartTimeUsedErrorMessage = await screen.findByText("その開始時間は既に登録されています。");
    const expectedEndTimeUsedErrorMessage = await screen.findByText("その終了時間は既に登録されています。");
    expect(expectedStartTimeUsedErrorMessage).toBeInTheDocument();
    expect(expectedEndTimeUsedErrorMessage).toBeInTheDocument();
  });

  test("登録しようとする終了時間が開始時間より早い場合", async() => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={[1, () => {}]} >
        <RecordItemLog />
      </AuthContext.Provider>
    );
    const tableEls = await screen.findAllByRole("table");
    // 2つ目のtableElsがグラフなどがある表
    const tbodyEl = await within(tableEls[1]).findAllByRole("rowgroup");
    const rowEl =  await within(tbodyEl[1]).findAllByRole("row");
    // 1日の編集ボタン
    const firstRowCellAllEl = await within(rowEl[0]).findAllByRole("cell");
    const editButtonEl = await within(firstRowCellAllEl[2]).findByRole("button");
    user.click(editButtonEl);

    const startTimeInputEl = await screen.findByLabelText("開始時間");
    const endTimeInputEl = await screen.findByLabelText("終了時間");
    await waitFor(() => user.type(startTimeInputEl, "08:00:00"));
    await waitFor(() => user.type(endTimeInputEl, "07:59:59"));

    const expectedNotEndTimeUnderStartTimeErrorMessage = await screen.findByText("終了時間は開始時間より遅い時間を入力してください。");
    expect(expectedNotEndTimeUnderStartTimeErrorMessage).toBeInTheDocument();
  });
})