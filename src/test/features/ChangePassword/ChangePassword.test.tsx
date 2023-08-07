import { render, renderHook, screen, act, within } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";

import { changePasswordValidationSchema } from "../../../lib/zod/validationSchema";
import ChangePassword from "../../../features/ChangePassword/pages/ChangePassword";

const server = setupServer(
  rest.put("http://localhost:8080/users/:userId/password", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        {
          message: "パスワードが更新されました。",
          isSuccess: true
        }
      )
    );
  })
);

describe("ChangePasswordコンポーネントの単体テスト", () => {

  test("正しい値が送信される", () => {
    const{ result } = renderHook(() =>
      useForm({
        mode: "onChange",
        resolver: zodResolver(changePasswordValidationSchema),
      })
    );

    const { setValue, handleSubmit } = result.current;

    setValue("currentPassword", "testpassdata001");
    setValue("newPassword", "newEmail@test.com");
    setValue("confirmNewPassword", "newEmail@test.com");

    handleSubmit((data) => {
      expect(data.currentPassword).toBe("testpassdata001");
      expect(data.newPassword).toBe("newEmail@test.com");
      expect(data.confirmNewPassword).toBe("newEmail@test.com");
    })();
  });

  test("現在のパスワードのバリデーションチェック", async() => {
    const user = userEvent.setup();
    render(<ChangePassword />);
    const currentPasswordInputEl = screen.getByPlaceholderText("現在のパスワード");

    await user.type(currentPasswordInputEl, "パスワード");
    user.clear(currentPasswordInputEl);

    const passwordNoEmptyErrorMessageEl = await screen.findByText("現在のパスワードは必須です。");
    expect(passwordNoEmptyErrorMessageEl).toBeInTheDocument();
  });

  describe("新しいパスワードのバリデーションチェック", () => {

    test("必須のバリデーションチェック", async() => {
      const user = userEvent.setup();
      render(<ChangePassword />);
      const newPasswordInputEl = screen.getByPlaceholderText("新しいパスワード");

      // ToDo ここをactで囲まなければいけない理由がいまいちわからない
      await act(async() => {
        await user.type(newPasswordInputEl, "test");
      });
      user.clear(newPasswordInputEl);

      const newPasswordNoEmptyErrorMessageEl = await screen.findByText("新しいパスワードは必須です。");
      expect(newPasswordNoEmptyErrorMessageEl).toBeInTheDocument();
    });

    test("最低文字数のバリデーションチェック", async() => {
      const user = userEvent.setup();
      render(<ChangePassword />);
      const newPasswordInputEl = screen.getByPlaceholderText('新しいパスワード');

      user.type(newPasswordInputEl, "test123");

      const newPasswordMinErrorMessageEl = await screen.findByText("パスワードは8文字以上で入力してください。");
      expect(newPasswordMinErrorMessageEl).toBeInTheDocument();

      // ToDo ここをactで囲まなければいけない理由がいまいちわからない
      await act(async() => {
        await user.clear(newPasswordInputEl);
        await user.type(newPasswordInputEl, "test1234");
      });

      expect(newPasswordMinErrorMessageEl).not.toBe("パスワードは8文字以上で入力してください。");
    });

    test("最高文字数のバリデーションチェック", async() => {
      const user = userEvent.setup();
      render(<ChangePassword />);
      const newPasswordInputEl = screen.getByPlaceholderText('新しいパスワード');

      user.type(newPasswordInputEl, "test1234test1234t");

      const newPasswordMaxErrorMessageEl = await screen.findByText("パスワードは16文字以下で入力してください");
      expect(newPasswordMaxErrorMessageEl).toBeInTheDocument();

      // ToDo ここをactで囲まなければいけない理由がいまいちわからない
      await act(async() => {
        await user.clear(newPasswordInputEl);
        await user.type(newPasswordInputEl, "test1234test1234");
      });

      expect(newPasswordMaxErrorMessageEl).not.toBe("パスワードは16文字以下で入力してください");
    });

    test("半角英数字混合のバリデーションチェック", async() => {
      const user = userEvent.setup();
      render(<ChangePassword />);
      const newPasswordInputEl = screen.getByPlaceholderText('新しいパスワード');

      user.type(newPasswordInputEl, "testtest");

      const newPasswordHalfWidthAlphanumericErrorMessageEl = await screen.findByText("パスワードは半角英数字混合で入力してください");
      expect(newPasswordHalfWidthAlphanumericErrorMessageEl).toBeInTheDocument();

      // ToDo ここをactで囲まなければいけない理由がいまいちわからない
      await act(async() => {
        await user.clear(newPasswordInputEl);
        await user.type(newPasswordInputEl, "test1234");
      });

      expect(newPasswordHalfWidthAlphanumericErrorMessageEl).not.toBe("パスワードは半角英数字混合で入力してください");
    });
  });

  test("新しいパスワード（確認）のバリデーションチェック", async() => {
    const user = userEvent.setup();
    render(<ChangePassword />);
    const confirmNewPasswordInputEl = screen.getByPlaceholderText('新しいパスワード（確認）');

    // ToDo ここをactで囲まなければいけない理由がいまいちわからない
    await act(async() => {
      await user.type(confirmNewPasswordInputEl, "test");
      user.clear(confirmNewPasswordInputEl);
    });

    const passwordNoEmptyErrorMessageEl = await screen.findByText("新しいパスワード（確認）は必須です。");
    expect(passwordNoEmptyErrorMessageEl).toBeInTheDocument();
  });

  test("新しいパスワードと新しいパスワード（確認）の一致チェック", async() => {
    const user = userEvent.setup();
    render(<ChangePassword />);
    const newPasswordInputEl = screen.getByPlaceholderText('新しいパスワード');
    const confirmNewPasswordInputEl = screen.getByPlaceholderText('新しいパスワード（確認）');

    user.type(newPasswordInputEl, "test1234");
    user.type(confirmNewPasswordInputEl, "test123");

    const passwordNotMatchErrorMessageEl = await screen.findByText("パスワードが一致しません");
    expect(passwordNotMatchErrorMessageEl).toBeInTheDocument();

    // ToDo ここをactで囲まなければいけない理由がいまいちわからない
    await act(async() => {
      await user.clear(confirmNewPasswordInputEl);
      await user.type(confirmNewPasswordInputEl, "test1234");
    });

    expect(passwordNotMatchErrorMessageEl).not.toBe("パスワードが一致しません");
  });

  test("現在のパスワードと新しいパスワードの不一致チェック", async() => {
    const user = userEvent.setup();
    render(<ChangePassword />);
    const currentPasswordInputEl = screen.getByPlaceholderText('現在のパスワード');
    const newPasswordInputEl = screen.getByPlaceholderText('新しいパスワード');

    // ToDo ここをactで囲まなければいけない理由がいまいちわからない
    await act(async() => {
      await user.type(currentPasswordInputEl, "test1234");
      await user.type(newPasswordInputEl, "test1234");
    });

    const passwordMatchErrorMessageEl = await screen.findByText("現在のパスワードと同じです");
    expect(passwordMatchErrorMessageEl).toBeInTheDocument();

    // ToDo ここをactで囲まなければいけない理由がいまいちわからない
    await act(async() => {
      await user.clear(newPasswordInputEl);
      await user.type(newPasswordInputEl, "test12345");
    });

    expect(passwordMatchErrorMessageEl).not.toBe("現在のパスワードと同じです");
  });

  describe("「変更する」ボタンのクリック後のテスト", () => {

    beforeAll(() => {
      server.listen();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => {
      server.close()
    });

    test("パスワードの変更が成功した場合", async () => {
      const user = userEvent.setup();
      render(<ChangePassword />);
      const currentPasswordInputEl = screen.getByPlaceholderText('現在のパスワード');
      const newPasswordInputEl = screen.getByPlaceholderText('新しいパスワード');
      const confirmNewPasswordInputEl = screen.getByPlaceholderText('新しいパスワード（確認）');
      const buttonEl = screen.getByRole("button", {name: "変更する"});

      await act(async () => {
        await user.type(currentPasswordInputEl, "testpassdata001");
        await user.type(newPasswordInputEl, "testpassdata002");
        await user.type(confirmNewPasswordInputEl, "testpassdata002");
      });
      user.click(buttonEl);

      const alertEl = await screen.findByRole("alert");
      const toastTextEl = await within(alertEl).findByText("パスワードが更新されました。");
      expect(toastTextEl).toBeInTheDocument();
    })

    test("パスワードの変更が失敗した場合", async () => {
      server.use(
        rest.put("http://localhost:8080/users/:userId/password", (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json(
              {
                message: "予期せぬエラーが起こり、パスワードの更新ができませんでした。",
                isSuccess: false
              }
            )
          );
        })
      );
      const user = userEvent.setup();
      render(<ChangePassword />);
      const currentPasswordInputEl = screen.getByPlaceholderText('現在のパスワード');
      const newPasswordInputEl = screen.getByPlaceholderText('新しいパスワード');
      const confirmNewPasswordInputEl = screen.getByPlaceholderText('新しいパスワード（確認）');
      const buttonEl = screen.getByRole("button", {name: "変更する"});

      await act(async () => {
        await user.type(currentPasswordInputEl, "testpassdata001");
        await user.type(newPasswordInputEl, "testpassdata002");
        await user.type(confirmNewPasswordInputEl, "testpassdata002");
      });
      user.click(buttonEl);

      const alertEl = await screen.findByRole("alert");
      const toastTextEl = await within(alertEl).findByText("予期せぬエラーが起こり、パスワードの更新ができませんでした。");
      expect(toastTextEl).toBeInTheDocument();
    })
  })
});