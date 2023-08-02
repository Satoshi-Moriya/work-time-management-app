import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";

import { changeEmailValidationSchema } from "../../../lib/zod/validationSchema";
import { AuthContext } from "../../Auth/components/AuthProvider";
import { changeEmail } from "../repository/repository";

type FormValues = {
  password: string;
  email: string | null | undefined;
}

const ChangeEmail = () => {
  const [ userId, userEmail ] = useContext(AuthContext);
  const [toast, setToast] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<FormValues>({
    defaultValues: { email: userEmail },
    mode: "onChange",
    resolver: zodResolver(changeEmailValidationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await changeEmail(userId, data.password, data.email);
    if ( response.status === 204 ) {
      setToast("メールアドレスが更新されました。");
    } else {
      setToast("予期せぬエラーが起こり、メールアドレスの更新ができませんでした。");
    }
    reset();
  };

  return (
    <div className="p-10">
      <h3 className="text-l font-bold">メールアドレス変更</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div>
          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" placeholder="パスワード" {...register("password")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
          <p className="text-red-500">{errors.password && errors.password.message}</p>
        </div>
        <div className="mt-4">
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" placeholder="メールアドレス" {...register("email")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 w-full rounded-md sm:text-sm"/>
          <p className="text-red-500">{errors.email && errors.email.message}</p>
        </div>
        <div className="mt-8">
          <button type="submit" className="bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg text-white font-bold px-3 py-2">保存する</button>
        </div>
      </form>
      {
        toast && (
          <div>
            <p>{toast}</p>
          </div>
        )
      }
    </div>
  );
}

export default ChangeEmail;
