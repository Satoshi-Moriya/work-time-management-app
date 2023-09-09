import axios from "axios";
import { useContext, useState } from "react";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { loginValidationSchema } from "../../../lib/zod/validationSchema";
import { AuthContext } from "../../Auth/components/AuthProvider";
import { login } from "../repositories/login";

type FormValues = {
  email: string;
  password: string;
};

export const useLogin = (): [
  SubmitHandler<FormValues>,
  FieldErrors<FormValues>,
  boolean,
  UseFormRegister<FormValues>,
  UseFormHandleSubmit<FormValues, undefined>,
  boolean,
  string,
  {
    setFailAlert: React.Dispatch<React.SetStateAction<boolean>>
  }
] => {
  const [errorMessage, setErrorMessage] = useState("");
  const [failAlert, setFailAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const [ , setUserId] = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormValues>({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async(data) => {
    try {
      const response = await login(data.email, data.password);
      setUserId(response.data.userId as number | null);
      navigate("/");
    } catch(error) {
      let message = "";
      if (axios.isAxiosError(error)) {
        message = "メールアドレスかパスワードが間違っており、ログインに失敗しました。";
      } else {
        message = "予期せぬエラーが起こり、ログインに失敗しました。時間をおいて再度お試しください。";
      }
      setErrorMessage(message);
      setFailAlert(true);
    }
  };

  return [onSubmit, errors, isValid, register, handleSubmit, failAlert, errorMessage, {setFailAlert}];
};