import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  nowPassword: string;
  newPassword: string;
  confirmNowPassword: string;
}

const ChangePassword = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<FormValues>({ mode: "onChange" });
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <div className="p-10">
      <h3 className="text-l font-bold">パスワード変更</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div>
          <label htmlFor="nowPassword">現在のパスワード</label>
          <input type="password" id="nowPassword" placeholder="パスワード" {...register("nowPassword", {required: "パスワードを入力してください。"})} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
          <p className="text-red-500">{errors.nowPassword && errors.nowPassword.message}</p>
        </div>
        <div className="mt-4">
          <label htmlFor="newPassword">新しいパスワード</label>
          <input type="password" id="newPassword" placeholder="新しいパスワード" {...register("newPassword", {required: "パスワードを入力してください。"})} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
          <p className="text-red-500">{errors.newPassword && errors.newPassword.message}</p>
        </div>
        <div className="mt-4">
          <label htmlFor="confirmNowPassword">新しいパスワード（確認）</label>
          <input type="password" id="confirmNowPassword" placeholder="新しいパスワード（確認）" {...register("confirmNowPassword", {required: "パスワードを入力してください。"})} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md sm:text-sm"/>
          <p className="text-red-500">{errors.confirmNowPassword && errors.confirmNowPassword.message}</p>
        </div>
        <div className="mt-8">
          <button type="submit" className="bg-orange-400 hover:bg-orange-700 focus:bg-orange-700 border-orange-400 rounded-lg text-white font-bold px-3 py-2">変更する</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
