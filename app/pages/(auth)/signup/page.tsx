"use client";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Button from "@/components/buttons";
import { CustomInput } from "@/components/CustomInput";
import { useSignUp } from "@/services/api/auth/authApi";
import CountrySelector from "@/components/selectCountryInput/inedex";
import { SelectPhone } from "@/components/SelectPhone";
import RadioInput from "@/components/radioInput";

interface FormData {
  fname: string;
  password: string;
  email: string;
}
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      fname: "",
      password: "",
      email: "",
    },
  });
  const useSignUpMutation = useSignUp();

  const onSubmit = async (values: any) => {
    try {
      const response = await useSignUpMutation.mutateAsync(values);
      useSignUpMutation.isSuccess &&
        setTimeout(() => {
          toast.success("Signup successful!");
          router.push("pages/authMessage");
        }, 2000);
    } catch (error) {
      useSignUpMutation.isError &&
        setTimeout(() => {
          toast.error(useSignUpMutation.error.message);
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
    <div className="w-screen h-screen bg-blue-400 flex items-center justify-center  ">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-[300px] w-[400px] bg-white flex items-center flex-col justify-center gap-3 p-4 "
      >
        <div className="mb-2  w-[100%]">
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Name is required",
              },
            }}
            name="fname"
            render={({ field: { onChange, onBlur, value }, formState }) => (
              <CustomInput
                size="sm"
                fullWidth={true}
                value={value}
                type="text"
                LabelText="Name"
                isPassword={false}
                variant="outlined"
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
              />
            )}
          />
          <p style={{ color: "red" }}>{errors.fname && errors.fname.message}</p>
        </div>
        <div className="mb-2 w-[100%]">
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
                onClick={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
                value={value}
                type={showPassword ? "text" : "password"}
                variant="outlined"
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />
          <p style={{ color: "red" }}>
            {errors.password && errors.password.message}
          </p>
        </div>
        <div className="mb-2 w-[100%]">
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
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div className="mb-2 w-[100%]">
          <CountrySelector />
        </div>{" "}
        <div className="mb-2 w-[100%]">
          <SelectPhone />
        </div>
        <div className="flex gap-2 flex-wrap">
          <RadioInput name="gender" value={"male"} text="male" />
          <RadioInput name="gender" value={"female"} text="female" />
          <RadioInput name="gender" value={"other"} text="other" />
        </div>
        <Button
          size="md"
          variant="primary"
          loadingText="loading"
          text={useSignUpMutation.isPending ? "Signing up..." : "Sign Up"}
          disabled={false}
          fullWidth={true}
          loading={false}
        />
      </form>
    </div>
  );
};

export default SignUp;
