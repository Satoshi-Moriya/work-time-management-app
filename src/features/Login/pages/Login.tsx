import { Link } from "react-router-dom";

import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [
    onSubmit,
    errors,
    isValid,
    register,
    handleSubmit,
    failAlert,
    errorMessage,
    {
      setFailAlert
    }
  ] = useLogin();

  return (
    <div className="h-screen">
      <header className="sm:h-12 bg-thin-gray p-4 sm:py-0 fixed z-10 top-0 right-0 left-0 w-full">
        <div className="mx-auto max-w-[1280px] w-full h-full flex flex-col sm:flex-row items-center sm:justify-between">
          <h1 className="text-2xl font-bold">
            <Link to="/about">時間管理君</Link>
          </h1>
          <nav className="mt-4 sm:mt-0">
            <ul className="flex flex-wrap">
              <li className="w-1/2 sm:w-auto text-center"><Link className="p-2 text-sm sm:text-base" to="../login" relative="path">ログイン</Link></li>
              <li className="w-1/2 sm:w-auto text-center"><Link className="p-2 text-sm sm:text-base" to="../terms" relative="path">利用規約</Link></li>
              <li className="w-1/2 sm:w-auto text-center mt-4 sm:mt-0"><Link className="p-2 text-sm sm:text-base" to="../privacypolicy" relative="path">プライバシーポリシー</Link></li>
              <li className="w-1/2 sm:w-auto text-center mt-4 sm:mt-0"><Link className="p-2 text-sm sm:text-base" to="https://docs.google.com/forms/d/1VkZ6plbTQlcDHEBJ2ND-KEiRKaq6KZKHuu3mWAPqSnI/edit" target="_blank">お問い合わせ</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex justify-center items-center flex-col h-full">
        {failAlert && (
          <div className="px-10">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
              <span>
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  onClick={() => setFailAlert(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          </div>
        )}
        <div className="p-10">
          <h2 className="text-center text-4xl">ログイン</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="mt-4">
              <input
                type="email"
                id="email"
                placeholder="メールアドレス"
                {...register("email")}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 w-full rounded-md"
              />
              <p className="text-red-500">
                {errors.email && errors.email.message}
              </p>
            </div>
            <div className="mt-8">
              <input
                type="password"
                id="password"
                placeholder="パスワード"
                {...register("password")}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 block w-full rounded-md"
              />
              <p className="text-red-500">
                {errors.password && errors.password.message}
              </p>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                disabled={!isValid}
                className="bg-orange-400 border-orange-400 rounded-lg text-white font-bold px-3 py-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ログイン
              </button>
            </div>
          </form>
          <div className="flex flex-col mt-5">
            <Link
              to="../signup"
              relative="path"
              className="underline text-blue-500 hover:opacity-70 mt-4"
            >
              アカウントをお持ちでない場合
            </Link>
          </div>
        </div>
      </main>
      <footer className="p-3 text-center">
        <small>© 2023 時間管理君</small>
      </footer>
    </div>
  );
};

export default Login;
