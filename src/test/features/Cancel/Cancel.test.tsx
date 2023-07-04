import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import Cancel from "../../../features/Cancel/pages/Cancel";

describe("Cancelコンポーネントの単体テスト", () => {

  test("退会するボタンのアラートが表示される", async() => {
    const user = userEvent.setup();
    render(<Cancel />, {wrapper: BrowserRouter});
    const buttonEl = screen.getByRole("button");
    const confirmMock = jest.spyOn(window, "confirm");
    confirmMock.mockImplementation(() => true);

    user.click(buttonEl);

    await waitFor(() => expect(confirmMock).toHaveBeenCalled());

    confirmMock.mockRestore();
  });
});