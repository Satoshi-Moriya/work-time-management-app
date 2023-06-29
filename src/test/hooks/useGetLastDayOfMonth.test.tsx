import { renderHook } from "@testing-library/react";

import useGetLastDayOfMonth from "../../hooks/useGetLastDayOfMonth"

describe("useGetLastDayOfMonthの単体テスト", () => {

  test("年月の最終日の取得ができる。（2023年6月）", () => {
    const selectedYear = 2023;
    const selectedMonth = 6;
    const { result } = renderHook(() =>
      useGetLastDayOfMonth(selectedYear, selectedMonth)
    );
    expect(result.current).toBe(30);
  })

  test("年月の最終日の取得ができる。（2023年7月）", () => {
    const selectedYear = 2023;
    const selectedMonth = 7;
    const { result } = renderHook(() =>
      useGetLastDayOfMonth(selectedYear, selectedMonth)
    );
    expect(result.current).toBe(31);
  })

  test("年月の最終日の取得ができる。（2023年2月）", () => {
    const selectedYear = 2023;
    const selectedMonth = 2;
    const { result } = renderHook(() =>
      useGetLastDayOfMonth(selectedYear, selectedMonth)
    );
    expect(result.current).toBe(28);
  })

  test("年月の最終日の取得ができる。（閏年の2024年2月）", () => {
    const selectedYear = 2024;
    const selectedMonth = 2;
    const { result } = renderHook(() =>
      useGetLastDayOfMonth(selectedYear, selectedMonth)
    );
    expect(result.current).toBe(29);
  })
})