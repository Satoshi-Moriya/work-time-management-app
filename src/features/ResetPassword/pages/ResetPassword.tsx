import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordValidationSchema } from "../../../lib/zod/validationSchema";

type FormValues = {
  email: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordValidationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data); // apiを叩く予定（？）
    navigate("/resetpasswordsubmitted");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10">
        <h1 className="text-7xl">パスワードを忘れた場合</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 max-w-sm mx-auto">
          <div className="mt-4">
            <label htmlFor="email">メールアドレス</label>
            <p className="mt-1 text-sm text-slate-400">登録したメールアドレスを入力してください。</p>
            <input type="email" id="email" placeholder="メールアドレス" {...register("email")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 w-full rounded-md sm:text-sm"/>
            <p className="text-red-500">{errors.email && errors.email.message}</p>
          </div>
          <div className="mt-8">
            <button type="submit" disabled={!isValid} className="bg-orange-400 border-orange-400 rounded-lg text-white font-bold px-3 py-2 w-full disabled:opacity-50 disabled:cursor-not-allowed">送信</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
