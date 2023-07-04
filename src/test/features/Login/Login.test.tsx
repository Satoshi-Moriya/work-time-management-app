import { render, renderHook, screen, act, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';

import { loginValidationSchema } from "../../../lib/zod/validationSchema";
import Login from "../../../features/Login/pages/Login";

describe("Loginページの単体テスト", () => {

  test("初期状態でログインボタンは非活性", () => {
    render(<Login />, {wrapper: BrowserRouter});
    const loginButtonEl = screen.getByRole("button", {name: "ログイン"});
    expect(loginButtonEl).toBeDisabled();
  });

  test("メールアドレスとパスワードを入力するとログインボタンが活性化する", async() => {
    const user = userEvent.setup();
    render(<Login />, {wrapper: BrowserRouter});
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const loginButtonEl = screen.getByRole("button", {name: "ログイン"});

    await act(async () => {
      await user.type(emailInputEl, "test@test.com");
      await user.type(passwordInputEl, "test1234");
    });

    expect(loginButtonEl).toBeEnabled();
  });

  test("メールアドレスとパスワードを入力後メールアドレスを削除した場合ログインボタンが非活性化する", async() => {
    const user = userEvent.setup();
    render(<Login />, {wrapper: BrowserRouter});
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
    render(<Login />, {wrapper: BrowserRouter});
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

  // ToDo バックエンドと連携させるときな気がする（？）
  test.skip("フォームのバリデーションチェック", async() => {
    const user = userEvent.setup();
    render(<Login />, {wrapper: BrowserRouter});
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