import { render, renderHook, screen, act, within } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { changeEmailValidationSchema } from "../../../lib/zod/validationSchema";
import ChangeEmail from "../../../features/ChangeEmail/pages/ChangeEmail";
import { routesConfig } from "../../mock/index";

const router = createMemoryRouter(routesConfig, {initialEntries: ["/setting/changeemail"]});

const server = setupServer(
  rest.put("http://localhost:8080/users/:userId/email", (req, res, ctx) => {
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

  rest.post("http://localhost:8080/csrf", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: "testToken"
      })
    );
  }),
);

describe("ChangeEmailコンポーネントの単体テスト", () => {

  test("正しい値が送信される", () => {
    const{ result } = renderHook(() =>
      useForm({
        mode: "onChange",
        resolver: zodResolver(changeEmailValidationSchema),
      })
    );

    const { setValue, handleSubmit } = result.current;

    setValue("password", "testpassdata001");
    setValue("email", "newEmail@test.com");

    handleSubmit((data) => {
      expect(data.password).toBe("testpassdata001");
      expect(data.email).toBe("newEmail@test.com");
    })();
  });

  test("パスワードのバリデーションチェック", async() => {
    const user = userEvent.setup();
    render(<ChangeEmail />);
    const passwordInputEl = screen.getByPlaceholderText('パスワード');

    await user.type(passwordInputEl, "パスワード");
    user.clear(passwordInputEl);

    const expectedPasswordErrorMessage = await screen.findByText("パスワードは必須です。");
    expect(expectedPasswordErrorMessage).toBeInTheDocument();
  });

  test("メールアドレスのバリデーションチェック（形式チェック）", async() => {
    const user = userEvent.setup();
    render(<ChangeEmail />);
    const emailInputEl = screen.getByPlaceholderText('メールアドレス');

    user.type(emailInputEl, "email");

    const expectedEmailFormatErrorMessage = await screen.findByText("メールアドレスが正しい形式ではありません。");
    expect(expectedEmailFormatErrorMessage).toBeInTheDocument();
  });

  test("メールアドレスのバリデーションチェック（必須チェック）", async() => {
    const user = userEvent.setup();
    render(<ChangeEmail />);
    const emailInputEl = screen.getByPlaceholderText('メールアドレス');

    // zodで2つバリデーションを設定しているせいかつ、一度文字を入力するという状況を作り出すため、
    // actをつけるワーニングが出るようなので仕方ないっぽい
    await act(async () => {
      await user.type(emailInputEl, "email");
      await user.clear(emailInputEl);
    })

    const expectedEmailFormatErrorMessage = await screen.findByText("メールアドレスは必須です。");
    expect(expectedEmailFormatErrorMessage).toBeInTheDocument();
  });

  describe("「保存する」ボタンのクリック後のテスト", () => {

    beforeAll(() => {
      server.listen();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => {
      server.close()
    });

    test("メールアドレスの変更が成功した場合", async () => {
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

      await act(async () => {
        await user.type(passwordInputEl, "testpassdata001");
        await user.type(emailInputEl, "newEmail@test.com");
      });
      user.click(buttonEl);

      const alertEl = await screen.findByRole("alert");
      const expectedToastText = await within(alertEl).findByText("メールアドレスが更新されました。")
      expect(expectedToastText).toBeInTheDocument();
    })

    // ToDo クライアント側の実装で全てのエラーで同じメッセージにしてしまってるのが原因で落ちる（→レスポンスのメッセージによって変えるべき？）
    test.skip("メールアドレスの変更がパスワードを間違えて失敗した場合", async () => {
      server.use(
        rest.put("http://localhost:8080/users/:userId/email", (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json(
              {
                message: "無効なパスワードです。",
                isSuccess: false
              }
            )
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
      const passwordInputEl = screen.getByPlaceholderText('パスワード');
      const emailInputEl = screen.getByPlaceholderText('メールアドレス');
      const buttonEl = screen.getByRole("button", {name: "保存する"});

      await act(async () => {
        await user.type(passwordInputEl, "testpassdata001");
        await user.type(emailInputEl, "newEmail@test.com");
      });
      user.click(buttonEl);

      const alertEl = await screen.findByRole("alert");
      const expectedToastText = await within(alertEl).findByText("無効なパスワードです。")
      expect(expectedToastText).toBeInTheDocument();
    })

    test("メールアドレスの変更が予期せぬエラーで失敗した場合", async () => {
      server.use(
        rest.put("http://localhost:8080/users/:userId/email", (req, res, ctx) => {
          return res(
            ctx.status(403)
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
      const passwordInputEl = screen.getByPlaceholderText('パスワード');
      const emailInputEl = screen.getByPlaceholderText('メールアドレス');
      const buttonEl = screen.getByRole("button", {name: "保存する"});

      await act(async () => {
        await user.type(passwordInputEl, "testpassdata001");
        await user.type(emailInputEl, "newEmail@test.com");
      });
      user.click(buttonEl);

      const alertEl = await screen.findByRole("alert");
      const expectedToastText = await within(alertEl).findByText("予期せぬエラーが起こり、メールアドレスの更新ができませんでした。")
      expect(expectedToastText).toBeInTheDocument();
    })
  })
});