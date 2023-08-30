import { render, screen } from "@testing-library/react";
import Clock from "../../../features/SideBar/components/Clock";

describe("Clockコンポーネントの単体テスト", () => {

  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date("2023-06-05T16:31:24").getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("特定の時刻が画面に表示される", () => {
    render(<Clock />);
    const timeNowEl = screen.getByText("2023/06/05/16:31:24");
    expect(timeNowEl).toBeInTheDocument();
  });

  test("特定の時刻の1秒後の時刻が画面に表示される", () => {
    jest.advanceTimersByTime(1000);
    render(<Clock />);
    const timeAdvEl = screen.getByText("2023/06/05/16:31:25");
    expect(timeAdvEl).toBeInTheDocument();
  })
});