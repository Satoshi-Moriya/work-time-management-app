import { render, renderHook, screen, act } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";

import { changeEmailValidationSchema } from "../../../lib/zod/validationSchema";
import ChangeEmail from "../../../features/ChangeEmail/pages/ChangeEmail";

const server = setupServer(
  rest.put("http://localhost:8080/users/:userId/email", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        {
          message: "メールアドレスが更新されました。"
        }
      )
    );
  })
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

    const passwordErrorMessageEl = await screen.findByText("パスワードは必須です。");
    expect(passwordErrorMessageEl).toBeInTheDocument();
  });

  test("メールアドレスのバリデーションチェック（形式チェック）", async() => {
    const user = userEvent.setup();
    render(<ChangeEmail />);
    const emailInputEl = screen.getByPlaceholderText('メールアドレス');

    user.type(emailInputEl, "email");

    const emailFormatErrorMessageEl = await screen.findByText("メールアドレスが正しい形式ではありません。");
    expect(emailFormatErrorMessageEl).toBeInTheDocument();
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

    const emailFormatErrorMessageEl = await screen.findByText("メールアドレスは必須です。");
    expect(emailFormatErrorMessageEl).toBeInTheDocument();
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
      render(<ChangeEmail />);
      const passwordInputEl = screen.getByPlaceholderText('パスワード');
      const emailInputEl = screen.getByPlaceholderText('メールアドレス');
      const buttonEl = screen.getByRole("button", {name: "保存する"});

      await act(async () => {
        await user.type(passwordInputEl, "testpassdata001");
        await user.type(emailInputEl, "newEmail@test.com");
      });
      user.click(buttonEl);

      // ToDo トースターを実装したらfindByRoleにすべき場所
      const toastEl = await screen.findByText("メールアドレスが更新されました。")
      expect(toastEl).toBeInTheDocument();
    })

    test("メールアドレスの変更が失敗した場合", async () => {
      server.use(
        rest.put("http://localhost:8080/users/:userId/email", (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json(
              {
                message: null
              }
            )
          );
        })
      );
      const user = userEvent.setup();
      render(<ChangeEmail />);
      const passwordInputEl = screen.getByPlaceholderText('パスワード');
      const emailInputEl = screen.getByPlaceholderText('メールアドレス');
      const buttonEl = screen.getByRole("button", {name: "保存する"});

      await act(async () => {
        await user.type(passwordInputEl, "testpassdata001");
        await user.type(emailInputEl, "newEmail@test.com");
      });
      user.click(buttonEl);

      // ToDo トースターを実装したらfindByRoleにすべき場所
      const toastEl = await screen.findByText("予期せぬエラーが起こり、メールアドレスの更新ができませんでした。")
      expect(toastEl).toBeInTheDocument();
    })
  })
});