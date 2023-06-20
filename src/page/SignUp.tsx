import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginValidationSchema } from "../utils/validationSchema";

type FormValues = {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}

const SingUp = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm<FormValues>({
    resolver: zodResolver(loginValidationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10">
        <h1 className="text-7xl">会員登録</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="mt-4">
            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" placeholder="メールアドレス" {...register("email")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 w-full rounded-md sm:text-sm"/>
            <p className="text-red-500">{errors.email && errors.email.message}</p>
          </div>
          <div className="mt-4">
            <label htmlFor="newPassword">新しいパスワード</label>
            <p className="mt-1 text-sm text-slate-400">※半角英数字8文字以上16文字以下</p>
            <input type="password" id="newPassword" placeholder="新しいパスワード" {...register("newPassword")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
            <p className="text-red-500">{errors.newPassword && errors.newPassword.message}</p>
          </div>
          <div className="mt-4">
            <label htmlFor="confirmNewPassword">新しいパスワード（確認）</label>
            <input type="password" id="confirmNewPassword" placeholder="新しいパスワード（確認）" {...register("confirmNewPassword")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
            <p className="text-red-500">{errors.confirmNewPassword && errors.confirmNewPassword.message}</p>
          </div>
          <div className="mt-8">
            <button type="submit" disabled={!isValid} className="bg-orange-400 border-orange-400 rounded-lg text-white font-bold px-3 py-2 w-full disabled:opacity-50 disabled:cursor-not-allowed">送信</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SingUp;