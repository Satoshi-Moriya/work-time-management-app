import { render, screen, act } from "@testing-library/react";
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
      const timeDisplay = screen.getByText("00:00:00");
      expect(timeDisplay.textContent).toBeInTheDocument();
    });
  });

  describe("「業務開始」ボタンの動作確認", () => {

    test("「業務開始」ボタンを押下後、「業務終了」ボタンが活性化され、「業務開始」ボタンが非活性化される", () => {
      render(<StopWatch />);
      const startButtonEl = screen.getByRole("button", {name: "業務開始" });
      const endButtonEl = screen.getByRole("button", {name: "業務終了" });
      userEvent.click(startButtonEl);
      expect(endButtonEl).toBeEnabled();
      expect(startButtonEl).toBeDisabled();
    });

    test("「業務開始」ボタンを押下後、表示される時間が増加し続ける", async() => {
      render(<StopWatch />);
      const startButtonEl = screen.getByRole("button", {name: "業務開始"});
      userEvent.click(startButtonEl);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      })

      const timeDisplay = screen.getByText(/(\d{2}):(\d{2}):(\d{2})/);
      expect(timeDisplay.textContent).not.toBe("00:00:00");
    });
  })

  describe("「業務終了」ボタンの動作確認", () => {

    test("「業務終了」ボタンを押下後、「業務開始」ボタンが活性化され、「業務終了」ボタンが非活性化される", () => {
      // render(<StopWatch />);
      const startButtonEl = screen.getByRole("button", {name: "業務開始" });
      const endButtonEl = screen.getByRole("button", {name: "業務終了" });
      // userEvent.click(startButtonEl);
      // act(async () => {
      //   await new Promise(() =>
      //   setTimeout(() => {userEvent.click(endButtonEl);}, 1000));
      // })
      userEvent.click(endButtonEl);
      expect(startButtonEl).toBeEnabled();
      expect(endButtonEl).toBeDisabled();
    });

    test("「業務終了」ボタンを押下後、表示される時間が「00:00:00」", () => {
      const timeDisplay = screen.getByText("00:00:00");
      expect(timeDisplay.textContent).toBeInTheDocument();
    });
  });

  test("ストップウォッチが動作中の状態で、他のページに遷移しようとするとアラートが発生する", () => {
    render(<StopWatch />);
    const startButtonEl = screen.getByRole("button", {name: "業務開始"});
    const settingLinkEl = screen.getByText("設定")
    userEvent.click(startButtonEl);
    userEvent.click(settingLinkEl);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });
});