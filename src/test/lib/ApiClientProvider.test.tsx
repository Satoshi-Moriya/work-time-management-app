import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { routesConfig } from "../mock";

const router = createMemoryRouter(routesConfig, {initialEntries: ["/setting/changeemail"]});

const mockFn = jest.fn();

const server = setupServer(
  rest.put("http://localhost:8080/users/:userId/email", (req, res, ctx) => {
    const testToken = req.headers.get("X-CSRF-TOKEN");
    mockFn(testToken);
    return res(
      ctx.status(200),
      ctx.json(
        {
          message: "メールアドレスが更新されました。",
          isSuccess: true
        }
      )
    );
  }),

  rest.get("http://localhost:8080/users/:userId/email", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        {
          data: "mockEmail@test.com"
        }
      )
    );
  }),

  rest.post("http://localhost:8080/csrf", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: "testToken"
      })
    );
  }),
);

describe("ApiClientProviderのテスト", () => {

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close()
  });

  // csrfトークンがつくリクエストを代表してemailアドレスの変更で確認
  test("リクエストヘッダーに「X-CSRF-TOKEN」が設定されている", async() => {
    const user = userEvent.setup();
    // toastのターゲットの要素がid="root"
    render(
      <div id="root">
        <RouterProvider router={router} />
      </div>
    );
    const passwordInputEl = screen.getByPlaceholderText('パスワード');
    const emailInputEl = screen.getByPlaceholderText('メールアドレス');
    const buttonEl = screen.getByRole("button", {name: "保存する"});

    await user.type(passwordInputEl, "testpassdata001");
    await user.clear(emailInputEl);
    await user.type(emailInputEl, "newEmail@test.com");
    await user.click(buttonEl);

    expect(mockFn).toHaveBeenCalledWith("testToken");
    mockFn.mockClear();
  });
});