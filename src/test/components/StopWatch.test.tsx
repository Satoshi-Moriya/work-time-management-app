import { render, screen, act, waitFor } from "@testing-library/react";
import App from "../../page/App";
import StopWatch from "../../components/StopWatch";
import userEvent from "@testing-library/user-event";

describe("StopWatchコンポーネントの単体テスト", () => {

  describe("初期状態の確認", () => {

    test("「業務開始」ボタンが活性", () => {
      render(<StopWatch />);
      const startButtonEl = screen.getByRole("button", {name: "業務開始" });
      expect(startButtonEl).toBeEnabled();
    });

    test("「業務終了」ボタンが非活性", () => {
      render(<StopWatch />);
      const endButtonEl = screen.getByRole("button", {name: "業務終了" });
      expect(endButtonEl).toBeDisabled();
    });

    test("表示されている時間が「00:00:00」である", () => {
      render(<StopWatch />);

      const hoursAndMinutesDisplayEl = screen.getAllByText("00:");
      const secondsDisplayEl = screen.getByText("00");
      expect(hoursAndMinutesDisplayEl).toHaveLength(2);
      expect(secondsDisplayEl).toBeInTheDocument();
    });
  });

  describe("「業務開始」ボタンの動作確認", () => {

    test("「業務開始」ボタンを押下後、「業務終了」ボタンが活性化、「業務開始」ボタンが非活性化、表示される時間が増加し続ける。", async() => {
      const user = userEvent.setup();
      render(<StopWatch />);
      const startButtonEl = screen.getByRole("button", {name: "業務開始" });
      const endButtonEl = screen.getByRole("button", {name: "業務終了" });
      const timeDisplayEl = screen.getByText(/(?!\b00:)\d{2}/);

      user.click(startButtonEl);
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      })

      await waitFor(() => expect(endButtonEl).toBeEnabled());
      await waitFor(() => expect(startButtonEl).toBeDisabled());
      await waitFor(() => expect(timeDisplayEl.textContent).not.toBe("00"));
    });
  })

  describe("「業務終了」ボタンの動作確認", () => {

    test("「業務終了」ボタンを押下後、「業務開始」ボタンが活性化、「業務終了」ボタンが非活性化、表示される時間が「00:00:00」になる", async() => {
      const user = userEvent.setup();
      render(<StopWatch />);
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

  test("ストップウォッチが動作中の状態で、他のページに遷移しようとするとアラートが発生する", async() => {
    const user = userEvent.setup();
    render(<App />);
    const startButtonEl = screen.getByRole("button", {name: "業務開始"});
    const otherPageLinkEl = screen.getAllByRole("link")[1]; // 勤怠表リンクを指定

    user.click(startButtonEl);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    })
    user.click(otherPageLinkEl);

    const alert = screen.getByRole("alert");
    await waitFor(() => expect(alert).toBeInTheDocument());
    await waitFor(() => expect(startButtonEl).toBeInTheDocument());
  });
});