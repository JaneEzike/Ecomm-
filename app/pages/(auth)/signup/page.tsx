"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Button from "@/components/buttons";
import { CustomInput } from "@/components/CustomInput";

import { signUpUserFn } from "@/services/api/auth/authApi";
import { IUser } from "@/app/types/general";

interface FormData {
  fname: string;
  password: string;
  email: string;
}
const SignUp = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fname: "",
      password: "",
      email: "",
    },
  });
  const useSignUpMutation = useMutation({
    mutationFn: (userData: IUser) => signUpUserFn(userData),
  });

  const onSubmit = async (values: any) => {
    try {
      const response = await useSignUpMutation.mutateAsync(values);
      useSignUpMutation.isSuccess &&
        setTimeout(() => {
          toast.success("Signup successful!");
          router.push("pages/authMessage");
        }, 2000);
      console.log(response);
    } catch (error) {
      useSignUpMutation.isError &&
        setTimeout(() => {
          toast.error(useSignUpMutation.error.message);
        }, 2000);
    }
  };

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
                value={value}
                type="password"
                variant="outlined"
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
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
