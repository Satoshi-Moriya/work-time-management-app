import { render, screen } from "@testing-library/react";

import MonthlyTotalTime from '../../components/MonthlyTotalTime';

describe("MonthlyTotalTimeコンポーネントの単体テスト", () => {

  test("その月の合計秒数が「7:15」と表示される（「hhh:mm」の形式で表示される）", () => {
    const dateSumSeconds = [10800, 3600, 11700];
    render(<MonthlyTotalTime dateSumSeconds={dateSumSeconds}/>);
    const monthlyTotalTimeEl = screen.getByText("7:15");

    expect(monthlyTotalTimeEl).toBeInTheDocument();
  });

  test("稼働時間がない月は「00:00」と表示される", () => {
    const dataSumSecondsNothing: number[] = [];
    render(<MonthlyTotalTime dateSumSeconds={dataSumSecondsNothing} />);
    const monthlyTotalTimeEl = screen.getByText("00:00");

    expect(monthlyTotalTimeEl).toBeInTheDocument();
  });
});