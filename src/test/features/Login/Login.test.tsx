import {
  render,
  renderHook,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";

import { loginValidationSchema } from "../../../lib/zod/validationSchema";
import { routesConfig } from "../../mock/index";

const router = createMemoryRouter(routesConfig, { initialEntries: ["/login"] });

const server = setupServer(
  rest.post("http://localhost:8080/login", (req, res, ctx) => {
    return res(
      ctx.status(403),
      ctx.json({
        status: 403,
        message:
          "メールアドレスかパスワードが間違っており、ログインに失敗しました。",
        data: null,
      }),
      ctx.set("Authorization", "")
    );
  })
);

describe("Loginページの単体テスト", () => {
  test("初期状態でログインボタンは非活性", () => {
    render(<RouterProvider router={router} />);
    const loginButtonEl = screen.getByRole("button", { name: "ログイン" });
    expect(loginButtonEl).toBeDisabled();
  });

  test("メールアドレスとパスワードを入力するとログインボタンが活性化する", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const loginButtonEl = screen.getByRole("button", { name: "ログイン" });

    await act(async () => {
      await user.type(emailInputEl, "test@test.com");
      await user.type(passwordInputEl, "test1234");
    });

    expect(loginButtonEl).toBeEnabled();
  });

  test("メールアドレスとパスワードを入力後メールアドレスを削除した場合ログインボタンが非活性化する", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const loginButtonEl = screen.getByRole("button", { name: "ログイン" });

    user.type(emailInputEl, "test@test.com");
    user.type(passwordInputEl, "test1234");
    await user.clear(emailInputEl);

    await waitFor(() => expect(loginButtonEl).toBeDisabled());
  });

  test("メールアドレスとパスワードを入力後パスワードを削除した場合ログインボタンが非活性化する", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const loginButtonEl = screen.getByRole("button", { name: "ログイン" });

    user.type(emailInputEl, "test@test.com");
    user.type(passwordInputEl, "test1234");
    await user.clear(passwordInputEl);

    await waitFor(() => expect(loginButtonEl).toBeDisabled());
  });

  test("正しい値が送信される", () => {
    const { result } = renderHook(() =>
      useForm({
        resolver: zodResolver(loginValidationSchema),
      })
    );

    const { setValue, handleSubmit } = result.current;

    setValue("email", "test@test.com");
    setValue("password", "test1234");

    handleSubmit((data) => {
      expect(data.email).toBe("test@test.com");
      expect(data.password).toBe("test1234");
    })();
  });

  // ToDO ページ遷移のため順番を変えると落ちる可能性があるのを単体テストなのでどうにかしたい
  describe("api通信のテスト", () => {
    beforeAll(() => {
      server.listen();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => server.close());

    test("ログインに失敗した場合", async () => {
      const user = userEvent.setup();
      render(<RouterProvider router={router} />);
      const emailInputEl = screen.getByPlaceholderText("メールアドレス");
      const passwordInputEl = screen.getByPlaceholderText("パスワード");
      const loginButtonEl = screen.getByRole("button", { name: "ログイン" });

      await user.type(emailInputEl, "test@test.com");
      await user.type(passwordInputEl, "test12345");
      await user.click(loginButtonEl);

      const alertEl = await screen.findByRole("alert");
      expect(alertEl).toBeInTheDocument();
    });

    test("ログインに成功した場合", async () => {
      server.use(
        rest.post("http://localhost:8080/login", (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              status: 200,
              message: "OK",
              data: {
                userId: 1,
                userEmail: "test@test.com",
                userPassword: "test1234hashhash",
                createdAt: "2023-07-26 09:00:59",
                updatedAt: null,
                deletedAt: null,
              },
            }),
            ctx.set("Authorization", "Bearer tokentesthogehoge1")
          );
        })
      );
      const user = userEvent.setup();
      render(<RouterProvider router={router} />);
      const emailInputEl = screen.getByPlaceholderText("メールアドレス");
      const passwordInputEl = screen.getByPlaceholderText("パスワード");
      const loginButtonEl = screen.getByRole("button", { name: "ログイン" });

      await user.type(emailInputEl, "test@test.com");
      await user.type(passwordInputEl, "test1234hashhash");
      await user.click(loginButtonEl);

      const textEl = await screen.findByText("00:00:00");
      expect(textEl).toBeInTheDocument();
    });
  });
});
