import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { routesConfig } from "../../mock/index";

const router = createMemoryRouter(routesConfig, {initialEntries: ["/"]});

const server = setupServer(
  rest.post("http://localhost:8080/work-log",
   (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json(
        [
          {
            workLogId: 1,
            workLogUserId: 1,
            workLogDate: "2023-07-15",
            workLogStartTime: "2023-07-15 9:00:59",
            workLogEndTime: "2023-07-15 12:00:00",
            workLogSeconds: 10741,
          },
        ]
      )
    );
  })
);


// ToDo
// render(<RouterProvider router={router} />);でのレンダリングは単体テスト的にはあまりよろしくない気がする！（やり方がわからん）
// 時間待つのももっと良い方法がある気がする！
// ログイン機能をつけて単体テストがむずくなったのでmockのrouterを使用（単体テストなら問題ない気がしてきた）
describe("StopWatchコンポーネントの単体テスト", () => {

  describe("初期状態の確認", () => {

    test("「業務開始」ボタンが活性", () => {
      render(<RouterProvider router={router} />);

      const startButtonEl = screen.getByRole("button", {name: "業務開始" });
      expect(startButtonEl).toBeEnabled();
    });

    test("「業務終了」ボタンが非活性", () => {
      render(<RouterProvider router={router} />);
      const endButtonEl = screen.getByRole("button", {name: "業務終了" });
      expect(endButtonEl).toBeDisabled();
    });

    test("表示されている時間が「00:00:00」である", () => {
      render(<RouterProvider router={router} />);
      const timeDisplayEl = screen.getByText("00:00:00");
      expect(timeDisplayEl).toBeInTheDocument();
    });
  });

  describe("「業務開始」ボタンの動作確認", () => {

    test("「業務開始」ボタンを押下後、「業務終了」ボタンが活性化、「業務開始」ボタンが非活性化、表示される時間が増加し続ける。", async() => {
      const user = userEvent.setup();
      render(<RouterProvider router={router} />);
      const startButtonEl = screen.getByRole("button", {name: "業務開始" });
      const endButtonEl = screen.getByRole("button", {name: "業務終了" });
      const timeDisplayEl = await screen.findByText("00:00:00");

      await act(async() => {
        await user.click(startButtonEl);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      });

      await waitFor(() => expect(endButtonEl).toBeEnabled());
      await waitFor(() => expect(startButtonEl).toBeDisabled());
      await waitFor(() => expect(timeDisplayEl.textContent).not.toBe("00:00:00"));
    });
  })

  describe("「業務終了」ボタンの動作確認", () => {

    test("「業務終了」ボタンを押下後、「業務開始」ボタンが活性化、「業務終了」ボタンが非活性化、表示される時間が「00:00:00」になる", async() => {
      const user = userEvent.setup();
      render(<RouterProvider router={router} />);
      const startButtonEl = screen.getByRole("button", {name: "業務開始" });
      const endButtonEl = screen.getByRole("button", {name: "業務終了" });

      user.click(startButtonEl);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      });
      user.click(endButtonEl);

      const timeDisplayEl = await screen.findByText("00:00:00");

      await waitFor(() => expect(startButtonEl).toBeEnabled());
      await waitFor(() => expect(endButtonEl).toBeDisabled());
      await waitFor(() => expect(timeDisplayEl).toBeInTheDocument());
    });
  });

  describe("アラートの動作確認", () => {

    test("ストップウォッチが動作中の状態で、他のページに遷移しようとするとアラートが発生する", async() => {
      const user = userEvent.setup();
      render(<RouterProvider router={router} />);
      const startButtonEl = screen.getByRole("button", {name: "業務開始"});


      await user.click(startButtonEl);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const linkEl = await screen.findAllByRole("link");
      await user.click(linkEl[2]); // 設定ページに遷移
      const confirmText = await screen.findByText("作業中のままページを移動すると作業時間は保存されません！ページを移動しますか？");

      await waitFor(() => expect(confirmText).toBeInTheDocument());
    });

    test("ストップウォッチが動作していない状態で、他のページに遷移しようとしてもアラートは発生しない", async() => {
      const user = userEvent.setup();
      render(<RouterProvider router={router} />);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const linkEl = await screen.findAllByRole("link");
      await user.click(linkEl[2]); // 設定ページに遷移
      const confirmText = screen.queryByText('作業中のままページを移動すると作業時間は保存されません！ページを移動しますか？')

      await waitFor(() => expect(confirmText).not.toBeInTheDocument());

      await user.click(linkEl[0]); // タイマーページに遷移
    });
  });

  describe("api通信のテスト", () => {

    beforeAll(() => server.listen());

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => server.close());

    test("データ保存が成功した時、成功のアラートが表示される", async () => {
      const user = userEvent.setup();
      render(<RouterProvider router={router} />);
      const startButtonEl = screen.getByRole("button", {name: "業務開始" });
      const endButtonEl = screen.getByRole("button", {name: "業務終了" });

      await user.click(startButtonEl);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      });
      await user.click(endButtonEl);

      const successAlertTextEl = await screen.findByText("作業記録が保存されました！");
      expect(successAlertTextEl).toBeInTheDocument();
    })

    test("データ保存に失敗した時、失敗アラートが表示される", async () => {
      server.use(
        rest.post(
          "http://localhost:8080/work-log",
          (req, res, ctx) => {
            return res(
              ctx.status(400),
              ctx.json(
                [
                  {
                    workLogId: 1,
                    workLogUserId: 1,
                    workLogDate: "2023-07-15",
                    workLogStartTime: "2023-07-15 9:00:59",
                    workLogEndTime: "2023-07-15 12:00:00",
                    workLogSeconds: 10741,
                  },
                ]
              )
            );
          }
        )
      );
      const user = userEvent.setup();
      render(<RouterProvider router={router} />);
      const startButtonEl = screen.getByRole("button", {name: "業務開始" });
      const endButtonEl = screen.getByRole("button", {name: "業務終了" });

      await user.click(startButtonEl);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      });
      await user.click(endButtonEl);

      const failAlertTextEl = await screen.findByText("予期せぬエラーが発生し、作業記録が保存できませんでした！");
      expect(failAlertTextEl).toBeInTheDocument();
    })
  })
});