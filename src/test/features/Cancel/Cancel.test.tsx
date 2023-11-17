import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";

import { routesConfig } from "../../mock/index";

const router = createMemoryRouter(routesConfig, {initialEntries: ["/setting/cancel"]});

describe("Cancelコンポーネントの単体テスト", () => {

  test("退会するボタンのアラートが表示される", async() => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const buttonEl = screen.getByRole("button", {name: "退会する"});
    const confirmMock = jest.spyOn(window, "confirm");
    confirmMock.mockImplementation(() => false);

    user.click(buttonEl);

    await waitFor(() => expect(confirmMock).toHaveBeenCalled());

    confirmMock.mockRestore();
  });

  describe("confirmダイアログのボタンクリック後のテスト", () => {
    const server = setupServer(
      rest.delete("http://localhost:8080/users/:userId", (req, res, ctx) => {
        return res(
          ctx.status(403)
        );
      }),
      rest.post("http://localhost:8080/csrf", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            token: "testToken"
          })
        );
      })
    );

    beforeAll(() => {
      server.listen();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => {
      server.close()
    });

    test.skip("アカウント削除が失敗した場合", async () => {
      const user = userEvent.setup();
      // toastのターゲットの要素がid="root"
      render(
        <div id="root">
          <RouterProvider router={router} />
        </div>
      );
      const buttonEl = screen.getByRole("button", {name: "退会する"});
      const confirmMock = jest.spyOn(window, "confirm");
      confirmMock.mockImplementation(() => true);

      user.click(buttonEl);

      const alertEl = await screen.findByRole("alert");
      const expectedToastText = await within(alertEl).findByText("予期せぬ問題が発生し、アカウントを削除できませんでした。時間をおいて再度お試しください。")
      expect(expectedToastText).toBeInTheDocument();

      confirmMock.mockRestore();
    })

    test.skip("アカウント削除が成功した場合", async () => {
      server.use(
        rest.delete("http://localhost:8080/users/:userId", (req, res, ctx) => {
          return res(
            ctx.status(200)
          );
        })
      );
      const user = userEvent.setup();
      // toastのターゲットの要素がid="root"
      render(
        <div id="root">
          <RouterProvider router={router} />
        </div>
      );
      const buttonEl = screen.getByRole("button", {name: "退会する"});
      const confirmMock = jest.spyOn(window, "confirm");
      confirmMock.mockImplementation(() => true);

      user.click(buttonEl);

      const expectedTargetPageText = await screen.findByRole("heading", { name: "ログイン" });
      expect(expectedTargetPageText).toBeInTheDocument();

      confirmMock.mockRestore();
    })
  })
});