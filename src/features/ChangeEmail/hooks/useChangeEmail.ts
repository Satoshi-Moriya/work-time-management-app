import { useContext, useEffect, useState } from "react";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthContext } from "../../Auth/components/AuthProvider";
import { fetchEmail } from "../repositories/fetchEmail";
import { changeEmail } from "../repositories/changeEmail";
import { changeEmailValidationSchema } from "../../../lib/zod/validationSchema";

type FormValues = {
  password: string;
  email: string | null | undefined;
}

export const useChangeEmail = (): [
  SubmitHandler<FormValues>,
  FieldErrors<FormValues>,
  UseFormRegister<FormValues>,
  UseFormHandleSubmit<FormValues, undefined>,
  {message: string | null, isSuccess: boolean | null },
  {
    setToast: React.Dispatch<React.SetStateAction<{message: string | null, isSuccess: boolean | null }>>,
  }
] => {
  const [ userId ] = useContext(AuthContext);
  const [toast, setToast] = useState<{message: string | null, isSuccess: boolean | null }>({message: null, isSuccess: null});
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
      const response = await changeEmail(userId, data.email, data.password);
      setToast({message: response.data!.message, isSuccess: true});
    } catch(error) {
      setToast({message: "予期せぬエラーが起こり、メールアドレスの更新ができませんでした。", isSuccess: false});
    }
  };

  useEffect(() => {
    (async() => {
      try {
        const responseData = await fetchEmail(userId);
        const userEmail: string = responseData.data;
        reset({password: "", email: userEmail});
      } catch(error) {
        setToast({message: "予期せぬエラーが発生し、記録項目を取得できませんでした。", isSuccess: false});
      }
    })();
  }, [userId, reset]);

  return [onSubmit, errors, register, handleSubmit, toast, {setToast}];
}