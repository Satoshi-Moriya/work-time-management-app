import { render, renderHook, screen, act, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";

import { signUpValidationSchema } from "../../utils/validationSchema";
import SingUp from "../../page/SignUp";

describe("SingUpページの単体テスト", () => {

  test("初期状態で送信ボタンは非活性", () => {
    render(<SingUp />);
    const submitButtonEl = screen.getByRole("button", {name: "送信"});
    expect(submitButtonEl).toBeDisabled();
  });

  test("メールアドレスとパスワードとパスワード（確認）を入力すると送信ボタンが活性化する", async() => {
    const user = userEvent.setup();
    render(<SingUp />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const confirmPasswordInputEl = screen.getByPlaceholderText("パスワード（確認）");
    const submitButtonEl = screen.getByRole("button", {name: "送信"});

    await act(async () => {
      await user.type(emailInputEl, "test@test.com");
      await user.type(passwordInputEl, "test1234");
      await user.type(confirmPasswordInputEl, "test1234");
    });

    expect(submitButtonEl).toBeEnabled();
  });

  test("メールアドレスとパスワードとパスワード（確認）を入力後メールアドレスを削除した場合送信ボタンが非活性化する", async() => {
    const user = userEvent.setup();
    render(<SingUp />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const confirmPasswordInputEl = screen.getByPlaceholderText("パスワード（確認）");
    const submitButtonEl = screen.getByRole("button", {name: "送信"});

    await act(async () => {
      user.type(emailInputEl, "test@test.com");
      user.type(passwordInputEl, "test1234");
      user.type(confirmPasswordInputEl, "test1234");
    });
    user.clear(emailInputEl);

    await waitFor(() => expect(submitButtonEl).toBeDisabled());
  });

  test("メールアドレスとパスワードとパスワード（確認）を入力後パスワードを削除した場合送信ボタンが非活性化する", async() => {
    const user = userEvent.setup();
    render(<SingUp />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const confirmPasswordInputEl = screen.getByPlaceholderText("パスワード（確認）");
    const submitButtonEl = screen.getByRole("button", {name: "送信"});

    await act(async () => {
      user.type(emailInputEl, "test@test.com");
      user.type(passwordInputEl, "test1234");
      user.type(confirmPasswordInputEl, "test1234");
    });
    user.clear(passwordInputEl);

    await waitFor(() => expect(submitButtonEl).toBeDisabled());
  });

  test("メールアドレスとパスワードとパスワード（確認）を入力後パスワード（確認）を削除した場合送信ボタンが非活性化する", async() => {
    const user = userEvent.setup();
    render(<SingUp />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const confirmPasswordInputEl = screen.getByPlaceholderText("パスワード（確認）");
    const submitButtonEl = screen.getByRole("button", {name: "送信"});

    await act(async () => {
      user.type(emailInputEl, "test@test.com");
      user.type(passwordInputEl, "test1234");
      user.type(confirmPasswordInputEl, "test1234");
    });
    user.clear(confirmPasswordInputEl);

    await waitFor(() => expect(submitButtonEl).toBeDisabled());
  });

  test("正しい値が送信される", () => {
    const{ result } = renderHook(() =>
      useForm({
        resolver: zodResolver(signUpValidationSchema),
      })
    );

    const { setValue, handleSubmit } = result.current;

    setValue("email", "test@test.com");
    setValue("password", "test1234");
    setValue("confirmPassword", "test1234");

    handleSubmit((data) => {
      expect(data.email).toBe("test@test.com");
      expect(data.password).toBe("test1234");
      expect(data.confirmPassword).toBe("test1234");
    })();
  });

  // ToDo バックエンドと連携させるときな気がする（？）
  test.skip("フォームのバリデーションチェック", async() => {
    const user = userEvent.setup();
    render(<SingUp />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const passwordInputEl = screen.getByPlaceholderText("パスワード");
    const confirmPasswordInputEl = screen.getByPlaceholderText("パスワード（確認）");
    const submitButtonEl = screen.getByRole("button", {name: "送信"});

    user.type(emailInputEl, "test@test.com");
    user.type(passwordInputEl, "test1234");
    user.type(confirmPasswordInputEl, "test1234");
    user.click(submitButtonEl);

    const emailOrPasswordErrorMessageEl = await screen.findByText("メールアドレスまたはパスワードが正しくありません。");
    expect(emailOrPasswordErrorMessageEl).toBeInTheDocument();
  });

});