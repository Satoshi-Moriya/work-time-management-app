import { render, screen } from "@testing-library/react";

import MonthlyTotalTime, { calculateSum } from '../../components/MonthlyTotalTime';

describe("MonthlyTotalTimeコンポーネントの単体テスト", () => {

  test("その月の合計の秒数の計算", () => {
    const totalSeconds = calculateSum(10800 + 3600 + 11700);

    expect(totalSeconds).toBe(26100);
  })

  test("その月の合計秒数が「7:15」と表示される（「mmm:ss」の形式で表示される）", () => {
    render(<MonthlyTotalTime />);
    const monthlyTotalTimeEl = screen.getByText("7:15");

    expect(monthlyTotalTimeEl).toBeInTheDocument();
  });

  test("稼働時間がない月は「00:00」と表示される", () => {
    render(<MonthlyTotalTime />);
    const monthlyTotalTimeEl = screen.getByText("00:00");

    expect(monthlyTotalTimeEl).toBeInTheDocument();
  });
});