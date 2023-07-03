import { renderHook } from "@testing-library/react";

import convertTimeToSeconds from "../../functions/convertTimeToSeconds"

describe("convertTimeToSecondsの単体テスト", () => {

  test("「00:mm:ss」が秒数に変換されている", () => {
    const dateTimeString = "2023-06-29 00:01:59";
    const { result } = renderHook(() =>
      convertTimeToSeconds(dateTimeString)
    );
    expect(result.current).toBe(119);
  });

  test("「0H:mm:ss」が秒数に変換されている", () => {
    const dateTimeString = "2023-06-29 09:00:59";
    const { result } = renderHook(() =>
      convertTimeToSeconds(dateTimeString)
    );
    expect(result.current).toBe(32459);
  });

  test("「HH:mm:ss」が秒数に変換されている", () => {
    const dateTimeString = "2023-06-29 13:15:00";
    const { result } = renderHook(() =>
      convertTimeToSeconds(dateTimeString)
    );
    expect(result.current).toBe(47700);
  });
});