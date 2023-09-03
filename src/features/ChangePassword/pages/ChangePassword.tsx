import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import axios from "axios";

import { changePasswordValidationSchema } from "../../../lib/zod/validationSchema";
import { AuthContext } from "../../Auth/components/AuthProvider";
import { changePassword } from "../repository/repository";
import Toast from "../../Toast/components/Toast";
import { api } from "../../../lib/api-client/ApiClientProvider";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword = () => {
  const [ userId ] = useContext(AuthContext);
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(changePasswordValidationSchema)
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await api.put(`/users/${userId}/password`, {
        userId: userId,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      setToast({message: response.data!.message, isSuccess: true});
    } catch(error) {
      setToast({message: "予期せぬエラーが起こり、パスワードの更新ができませんでした。", isSuccess: false});
    }
    reset();
  }

  return (
    <div className="p-10">
      <h3 className="text-l font-bold">パスワード変更</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div>
          <label htmlFor="currentPassword">現在のパスワード</label>
          <input type="password" id="currentPassword" placeholder="現在のパスワード" {...register("currentPassword")} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
          <p className="text-red-500">{errors.currentPassword && errors.currentPassword.message}</p>
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
          <button type="submit" className="bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg text-white font-bold px-3 py-2">変更する</button>
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

export default ChangePassword;
