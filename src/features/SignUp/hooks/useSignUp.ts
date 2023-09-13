import { useState } from "react";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { signUpValidationSchema } from "../../../lib/zod/validationSchema";
import { createUser } from "../repositories/createUser";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const useSignUp = (): [
  boolean,
  string,
  UseFormHandleSubmit<FormValues, undefined>,
  SubmitHandler<FormValues>,
  FieldErrors<FormValues>,
  UseFormRegister<FormValues>,
  boolean,
  {
    setFailAlert: React.Dispatch<React.SetStateAction<boolean>>
  }
] => {
  const [errorMessage, setErrorMessage] = useState("");
  const [failAlert, setFailAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(signUpValidationSchema),
  });
  const onSubmit: SubmitHandler<FormValues> = async(data) => {
    try {
      await createUser(data.email, data.password);
      navigate("/preregistrationcomplete");
    } catch(error: any) {
      setErrorMessage("予期せぬエラーが発生し、ユーザー登録ができませんでした。時間をおいて再度お試しください。");
      setFailAlert(true);
    }
  };

  return [failAlert, errorMessage, handleSubmit, onSubmit, errors, register, isValid, {setFailAlert}];
};