import { useContext, useState } from "react";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthContext } from "../../Auth/components/AuthProvider";
import { changePasswordValidationSchema } from "../../../lib/zod/validationSchema";
import { changePassword } from "../repositories/changePassword";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const useChangePassword = (): [
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
    resolver: zodResolver(changePasswordValidationSchema)
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await changePassword(userId, data.currentPassword, data.newPassword);
      setToast({message: response.data!.message, isSuccess: true});
    } catch(error) {
      setToast({message: "予期せぬエラーが起こり、パスワードの更新ができませんでした。", isSuccess: false});
    }
    reset();
  }

  return [onSubmit, errors, register, handleSubmit, toast, {setToast}];
}