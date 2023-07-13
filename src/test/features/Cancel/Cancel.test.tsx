import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { routesConfig } from "../../../pages/Router";

const router = createMemoryRouter(routesConfig, {initialEntries: ["/setting/cancel"]});

describe("Cancelコンポーネントの単体テスト", () => {

  test("退会するボタンのアラートが表示される", async() => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const buttonEl = screen.getByRole("button");
    const confirmMock = jest.spyOn(window, "confirm");
    confirmMock.mockImplementation(() => true);

    user.click(buttonEl);

    await waitFor(() => expect(confirmMock).toHaveBeenCalled());

    confirmMock.mockRestore();
  });
});