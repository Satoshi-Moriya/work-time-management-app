import { render, renderHook, screen, act, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";

import { resetPasswordValidationSchema } from "../../utils/validationSchema";
import ResetPassword from "../../page/ResetPassword";

describe("ResetPasswordページの単体テスト", () => {

  test("初期状態で送信ボタンは非活性", () => {
    render(<ResetPassword />);
    const submitButtonEl = screen.getByRole("button", {name: "送信"});
    expect(submitButtonEl).toBeDisabled();
  });

  test("メールアドレスを入力すると送信ボタンが活性化する", async() => {
    const user = userEvent.setup();
    render(<ResetPassword />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const submitButtonEl = screen.getByRole("button", {name: "送信"});

    await act(async() => {
      await user.type(emailInputEl, "test@test.com");
    });

    await waitFor(() => expect(submitButtonEl).toBeEnabled());
  });

  test("メールアドレスを入力後メールアドレスを削除した場合送信ボタンが非活性化する", async() => {
    const user = userEvent.setup();
    render(<ResetPassword />);
    const emailInputEl = screen.getByPlaceholderText("メールアドレス");
    const submitButtonEl = screen.getByRole("button", {name: "送信"});

    await act(async() => {
      await user.type(emailInputEl, "test@test.com");
      await user.clear(emailInputEl);
    });

    await waitFor(() => expect(submitButtonEl).toBeDisabled());
  });

  test("正しい値が送信される", () => {
    const{ result } = renderHook(() =>
      useForm({
        resolver: zodResolver(ValidationSchema),
      })
    );

    const { setValue, handleSubmit } = result.current;

    setValue("email", "test@test.com");

    handleSubmit((data) => {
      expect(data.email).toBe("test@test.com");
    })();
  });

  describe("メールアドレスのバリデーションチェック", () => {

    test("必須のバリデーションチェック", async() => {
      const user = userEvent.setup();
      render(<ResetPassword />);
      const emailInputEl = screen.getByPlaceholderText('メールアドレス');

      // ToDo ここをactで囲まなければいけない理由がいまいちわからない
      await act(async() => {
        await user.type(emailInputEl, "email@test.com");
      });
      user.clear(emailInputEl);

      const emailNoEmptyErrorMessageEl = await screen.findByText("メールアドレスは必須です。");
      expect(emailNoEmptyErrorMessageEl).toBeInTheDocument();
    });

    test("形式のバリデーションチェック", async() => {
      const user = userEvent.setup();
      render(<ResetPassword />);
      const emailInputEl = screen.getByPlaceholderText('メールアドレス');

      await act(async() => {
        await user.type(emailInputEl, "email");
      });

      const emailFormatErrorMessageEl = await screen.findByText("メールアドレスが正しい形式ではありません。");
      expect(emailFormatErrorMessageEl).toBeInTheDocument();
    });
  });
});