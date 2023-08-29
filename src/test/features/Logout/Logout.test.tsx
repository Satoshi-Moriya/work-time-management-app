import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";

import { routesConfig } from "../../mock/index";

//  テストに関係ない無駄なapi通信をなくすためsettingに設定
const router = createMemoryRouter(routesConfig, {initialEntries: ["/setting"]});

const server = setupServer(
  rest.post("http://localhost:8080/csrf", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: "testToken"
      })
    );
  }),

  rest.post("http://localhost:8080/logout", (req, res, ctx) => {
    return res(
      ctx.status(403)
    );
  })
);

// ToDO ページ遷移のため順番を変えると落ちる可能性があるのを単体テストなのでどうにかしたい
describe("Logoutの単体テスト", () => {

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  test("ログアウトに失敗した場合", async () => {
    const user = userEvent.setup();
    // toastのターゲットの要素がid="root"
    render(
      <div id="root">
        <RouterProvider router={router} />
      </div>
    );
    const logoutButtonEl = screen.getByRole("button", { name: "ログアウト" });

    user.click(logoutButtonEl);

    const alertEl = await screen.findByRole("alert");
    const toastTextEl = await within(alertEl).findByText("予期せぬエラーが起こり、ログアウトができませんでした。")
    expect(toastTextEl).toBeInTheDocument();
  });

  test("ログアウトに成功した場合", async () => {
    server.use(
      rest.post("http://localhost:8080/logout", (req, res, ctx) => {
        return res(
          ctx.status(200)
        );
      })
    );
    const user = userEvent.setup();
    render(
      <div id="root">
        <RouterProvider router={router} />
      </div>
    );
    const logoutButtonEl = screen.getByRole("button", { name: "ログアウト" });

    user.click(logoutButtonEl);

    const textEl = await screen.findByRole("heading", { name: "ログイン" });
    expect(textEl).toBeInTheDocument();
  });
});
