import { z } from "zod";

export const changeEmailValidationSchema = z.object({
  password: z
  .string()
  .nonempty("パスワードは必須です。"),
  email: z
  .string()
  .nonempty("メールアドレスは必須です。")
  .email("メールアドレスが正しい形式ではありません。")
})

export const changePasswordValidationSchema = z.object({
  currentPassword: z
  .string()
  .nonempty("現在のパスワードは必須です。"),
  newPassword: z
  .string()
  .nonempty("新しいパスワードは必須です。")
  .min(8, "パスワードは8文字以上で入力してください。")
  .max(16, "パスワードは16文字以下で入力してください")
  .regex(
    /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,16}$/i,
    "パスワードは半角英数字混合で入力してください"
  ),
  confirmNewPassword: z
  .string()
  .nonempty("新しいパスワード（確認）は必須です。")
})
.superRefine(({ currentPassword, newPassword, confirmNewPassword }, ctx) => {
  if (newPassword !== confirmNewPassword) {
    ctx.addIssue({
      path: ["confirmNewPassword"],
      code: "custom",
      message: "パスワードが一致しません",
    });
  }
  if (currentPassword === newPassword) {
    ctx.addIssue({
      path: ["newPassword"],
      code: "custom",
      message: "現在のパスワードと同じです",
    });
  }
});

export const loginValidationSchema = z.object({
  email: z
  .string()
  .nonempty("メールアドレスは必須です。"),
  password: z
  .string()
  .nonempty("パスワードは必須です。"),
})