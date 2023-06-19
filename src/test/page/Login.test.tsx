import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";

import { loginValidationSchema } from "../../utils/validationSchema";
import Login from "../../page/Login";

describe("Loginページの単体テスト", () => {

  test("初期状態でログインボタンは非活性", () => {
    render(<Login />);
    const loginButtonEl = screen.getByRole("button", {name: "ログイン"});
    expect(loginButtonEl).toBeDisabled();
  });

  test("メールアドレスとパスワードを入力するとログインボタンが活性化する", async() => {
    const user = userEvent.setup();
    render(<Login />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const loginButtonEl = screen.getByRole("button", {name: "ログイン"});

    user.type(emailInputEl, "test@test.com");
    user.type(passwordInputEl, "test1234");

    await waitFor(() => expect(loginButtonEl).toBeEnabled());
  });

  test("メールアドレスとパスワードを入力後メールアドレスを削除した場合ログインボタンが非活性化する", async() => {
    const user = userEvent.setup();
    render(<Login />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const loginButtonEl = screen.getByRole("button", {name: "ログイン"});

    user.type(emailInputEl, "test@test.com");
    user.type(passwordInputEl, "test1234");

    await user.clear(emailInputEl);

    await waitFor(() => expect(loginButtonEl).toBeDisabled());
  });

  test("メールアドレスとパスワードを入力後パスワードを削除した場合ログインボタンが非活性化する", async() => {
    const user = userEvent.setup();
    render(<Login />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const loginButtonEl = screen.getByRole("button", {name: "ログイン"});

    user.type(emailInputEl, "test@test.com");
    user.type(passwordInputEl, "test1234");

    await user.clear(passwordInputEl);

    await waitFor(() => expect(loginButtonEl).toBeDisabled());
  });

  test("正しい値が送信される", () => {
    const{ result } = renderHook(() =>
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

  test("メールアドレスのバリデーションチェック", async() => {
    const user = userEvent.setup();
    render(<Login />);
    const emailInputEl = screen.getByPlaceholderText('メールアドレス');

    user.type(emailInputEl, "email");

    const emailFormatErrorMessageEl = await screen.findByText("メールアドレスが正しい形式ではありません。");
    expect(emailFormatErrorMessageEl).toBeInTheDocument();
  });

  test("フォームのバリデーションチェック", async() => {
    const user = userEvent.setup();
    render(<Login />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const loginButtonEl = screen.getByRole("button", {name: "ログイン"});

    user.type(emailInputEl, "test@test.com");
    user.type(passwordInputEl, "test1234");
    user.click(loginButtonEl);

    const emailOrPasswordErrorMessageEl = await screen.findByText("メールアドレスまたはパスワードが正しくありません。");
    expect(emailOrPasswordErrorMessageEl).toBeInTheDocument();
  });

});