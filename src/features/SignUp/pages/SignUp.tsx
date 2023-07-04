import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { signUpValidationSchema } from "../../../lib/zod/validationSchema";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
}

const SingUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(signUpValidationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data); // apiを叩く予定（？）
    navigate("/preregistrationcomplete");
  }

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
            <label htmlFor="password">パスワード</label>
            <p className="mt-1 text-sm text-slate-400">※半角英数字8文字以上16文字以下</p>
            <input type="password" id="password" placeholder="パスワード" {...register("password")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
            <p className="text-red-500">{errors.password && errors.password.message}</p>
          </div>
          <div className="mt-4">
            <label htmlFor="confirmPassword">パスワード（確認）</label>
            <p className="mt-1 text-sm text-slate-400">※入力したパスワードを再入力してください。</p>
            <input type="password" id="confirmPassword" placeholder="パスワード（確認）" {...register("confirmPassword")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
            <p className="text-red-500">{errors.confirmPassword && errors.confirmPassword.message}</p>
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