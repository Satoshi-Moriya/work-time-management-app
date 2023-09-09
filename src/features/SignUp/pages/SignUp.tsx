import { useSignUp } from "../hooks/useSignUp";

const SingUp = () => {
  const [
    failAlert,
    errorMessage,
    handleSubmit,
    onSubmit,
    errors,
    register,
    isValid,
    {
      setFailAlert
    }
  ] = useSignUp()

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      {
        failAlert && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
            <span>
              <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={() => setFailAlert(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )
      }
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