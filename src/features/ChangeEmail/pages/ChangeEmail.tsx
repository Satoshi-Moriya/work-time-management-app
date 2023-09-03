import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { changeEmailValidationSchema } from "../../../lib/zod/validationSchema";
import { AuthContext } from "../../Auth/components/AuthProvider";
import { changeEmail } from "../repository/repository";
import Toast from "../../Toast/components/Toast";
import { api } from "../../../lib/api-client/ApiClientProvider";

type FormValues = {
  password: string;
  email: string | null | undefined;
}

const ChangeEmail = () => {
  const [ userId ] = useContext(AuthContext);
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});

  useEffect(() => {
    (async() => {
      try {
        const responseData = await api.get(`/users/${userId}/email`);
        const userEmail: string = responseData.data;
        reset({password: "", email: userEmail});
      } catch(error) {
        setToast({message: "予期せぬエラーが発生し、記録項目を取得できませんでした。", isSuccess: false});
      }
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(changeEmailValidationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await api.put(`/users/${userId}/email`, {
        userId: userId,
        email: data.email,
        password: data.password,
      });
      setToast({message: response.data!.message, isSuccess: true});
    } catch(error) {
      setToast({message: "予期せぬエラーが起こり、メールアドレスの更新ができませんでした。", isSuccess: false});
    }
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
        toast.isSuccess != null && (
          <Toast toast={toast} setToast={setToast} />
        )
      }
    </div>
  );
}

export default ChangeEmail;
