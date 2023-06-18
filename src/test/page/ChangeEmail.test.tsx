import { render, renderHook, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";

import { changeEmailValidationSchema } from "../../utils/validationSchema";
import ChangeEmail from "../../page/ChangeEmail";

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

  test("メールアドレスのバリデーションチェック", async() => {
    const user = userEvent.setup();
    render(<ChangeEmail />);
    const emailInputEl = screen.getByPlaceholderText('メールアドレス');

    user.clear(emailInputEl);

    const emailNoEmptyErrorMessageEl = await screen.findByText("メールアドレスは必須です。");
    expect(emailNoEmptyErrorMessageEl).toBeInTheDocument();

    user.type(emailInputEl, "email");

    const emailFormatErrorMessageEl = await screen.findByText("メールアドレスが正しい形式ではありません。");
    expect(emailFormatErrorMessageEl).toBeInTheDocument();
  });
});