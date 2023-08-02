import { render, screen, waitFor } from "@testing-library/react";
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
      rest.delete("http://localhost:8080/user/:userId", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            status: 500,
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

    test("アカウント削除が失敗した場合", async () => {
      const user = userEvent.setup();
      render(<RouterProvider router={router} />);
      const buttonEl = screen.getByRole("button", {name: "退会する"});
      const confirmMock = jest.spyOn(window, "confirm");
      confirmMock.mockImplementation(() => true);

      user.click(buttonEl);

      // ToDo ログアウト失敗のトースターを実装したらfindByRoleにすべき場所
      const failToastEl = await screen.findByText("予期せぬ問題が発生し、アカウントを削除できませんでした。時間をおいて再度お試しください。")
      expect(failToastEl).toBeInTheDocument();

      confirmMock.mockRestore();
    })

    test("アカウント削除が成功した場合", async () => {
      server.use(
        rest.delete("http://localhost:8080/user/:userId", (req, res, ctx) => {
          return res(
            ctx.status(204)
          );
        })
      );
      const user = userEvent.setup();
      render(<RouterProvider router={router} />);
      const buttonEl = screen.getByRole("button", {name: "退会する"});
      const confirmMock = jest.spyOn(window, "confirm");
      confirmMock.mockImplementation(() => true);

      user.click(buttonEl);

      const textEl = await screen.findByRole("heading", { name: "ログイン" });
      expect(textEl).toBeInTheDocument();

      confirmMock.mockRestore();
    })
  })
});