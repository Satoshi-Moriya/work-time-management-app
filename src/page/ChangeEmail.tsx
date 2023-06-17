import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { changeMailValidationSchema } from "../utils/validationSchema";

// 現在のパスワード（DBを参照して取得してくる事になるはず）
const nowMailAddress = "nowMailAddress@gmail.com";

type FormValues = {
  password: string;
  email: string;
}

const ChangeMail = () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormValues>({
    defaultValues: { email: nowMailAddress },
    mode: "onChange",
    resolver: zodResolver(changeMailValidationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

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
    </div>
  );
}

export default ChangeMail;
