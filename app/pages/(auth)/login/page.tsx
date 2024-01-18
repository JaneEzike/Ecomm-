"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { loginUserFn } from "@/services/api/auth/authApi";
import { CustomInput } from "@/components/CustomInput";
import Button from "@/components/buttons";
import { useLogin } from "@/services/api/auth/authApi";
import { ILoginResponse, IUser } from "@/app/types/general";
import { setCookie } from "cookies-next";
import { setToken } from "@/utils/securityUtils";
const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const useLoginMutation = useLogin();

  const onSubmit = async (values: any) => {
    try {
      const res = await useLoginMutation.mutateAsync(values);
      const token = res.access
      setToken(token)
      useLoginMutation.isSuccess &&
        setTimeout(() => {
          toast.success("Signup successful!");
          router.push("pages/dashboard");
        }, 2000);
    } catch (error) {
      useLoginMutation.isError &&
        setTimeout(() => {
          toast.error(useLoginMutation.error.message);
        }, 2000);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);
  return (
    <div className="w-screen h-screen bg-blue-400 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-[300px] w-[400px] bg-white flex items-center flex-col justify-center gap-3 p-4 "
      >
        <div className="mb-3 w-[100%]">
          <Controller
            control={control}
            name="email"
            rules={{
              required: {
                value: true,
                message: "email is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value }, formState }) => (
              <CustomInput
                size="sm"
                fullWidth
                LabelText="Email"
                isPassword={false}
                value={value}
                type="email"
                variant="outlined"
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
              />
            )}
          />
          {errors.email && <p>{errors?.email?.message}</p>}
        </div>
        <div className="mb-3 w-[100%]">
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                message: "Password must meet complexity requirements",
              },
            }}
            name="password"
            render={({ field: { onChange, onBlur, value }, formState }) => (
              <CustomInput
                size="sm"
                fullWidth
                LabelText="Password"
                isPassword
                value={value}
                type="text"
                variant="outlined"
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
              />
            )}
          />
          <p>{errors.password && errors.password.message}</p>
        </div>

        <Button
          size="md"
          variant="primary"
          loadingText="loading"
          text="register"
          disabled={false}
          fullWidth={true}
          loading={false}
        />
      </form>
    </div>
  );
};

export default Login;
