import { render, screen, act, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { routesConfig } from "../../../pages/Router";

// ToDo
// render(<RouterProvider router={router} />);でのレンダリングは単体テスト的にはあまりよろしくない気がする！（やり方がわからん）
// 時間待つのももっと良い方法がある気がする！
const router = createBrowserRouter(routesConfig);

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

      const hoursAndMinutesDisplayEl = screen.getAllByText("00:");
      const secondsDisplayEl = screen.getByText("00");
      expect(hoursAndMinutesDisplayEl).toHaveLength(2);
      expect(secondsDisplayEl).toBeInTheDocument();
    });
  });

  describe("「業務開始」ボタンの動作確認", () => {

    test("「業務開始」ボタンを押下後、「業務終了」ボタンが活性化、「業務開始」ボタンが非活性化、表示される時間が増加し続ける。", async() => {
      const user = userEvent.setup();
      render(<RouterProvider router={router} />);
      const startButtonEl = screen.getByRole("button", {name: "業務開始" });
      const endButtonEl = screen.getByRole("button", {name: "業務終了" });
      const mainEl = screen.getByRole("main");
      const timeDisplayEl = within(mainEl).getByText(/(?!\b00:)\d{2}/);

      await act(async() => {
        await user.click(startButtonEl);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      });

      await waitFor(() => expect(endButtonEl).toBeEnabled());
      await waitFor(() => expect(startButtonEl).toBeDisabled());
      await waitFor(() => expect(timeDisplayEl.textContent).not.toBe("00"));
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

      const hoursAndMinutesDisplayEl = await screen.findAllByText("00:");
      const secondsDisplayEl = await screen.findByText("00");

      await waitFor(() => expect(startButtonEl).toBeEnabled());
      await waitFor(() => expect(endButtonEl).toBeDisabled());
      await waitFor(() => expect(hoursAndMinutesDisplayEl).toHaveLength(2));
      await waitFor(() => expect(secondsDisplayEl).toBeInTheDocument());
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
    });
  });
});