import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginValidationSchema } from "../utils/validationSchema";

type FormValues = {
  email: string;
  password: string;
}

const Login = () => {
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
        <h1 className="text-7xl">ログイン</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="mt-4">
            <input type="email" id="email" placeholder="メールアドレス" {...register("email")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 w-full rounded-md sm:text-sm"/>
            <p className="text-red-500">{errors.email && errors.email.message}</p>
          </div>
          <div className="mt-8">
            <input type="password" id="password" placeholder="パスワード" {...register("password")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
            <p className="text-red-500">{errors.password && errors.password.message}</p>
          </div>
          <div className="mt-8">
            <button type="submit" disabled={!isValid} className="bg-orange-400 border-orange-400 rounded-lg text-white font-bold px-3 py-2 w-full disabled:opacity-50 disabled:cursor-not-allowed">ログイン</button>
          </div>
        </form>
        {/* ToDo テストを通すために一旦コメントアウト（たぶんルーディングを設定すればうまくいくはずうまくいくはず） */}
        {/* <div className="flex flex-col mt-5">
          <Link to="passwordreset" className="underline text-blue-500 hover:opacity-70">パスワードを忘れた場合</Link>
          <Link to="signup" className="underline text-blue-500 hover:opacity-70 mt-4">アカウントをお持ちでない場合</Link>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
