"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Button from "@/components/buttons";
import { CustomInput } from "@/components/CustomInput";

// import { useSignUp } from "@/services/api/auth/authApi";

interface FormData {
  fname: string;
  password: string;
  email: string;
}
const SignUp = () => {
  // const signUpMutation = useSignUp();
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
  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    try {
      // const response = await signUpMutation.mutateAsync(data);
      // toast.success("Signup successful!");
      // Handle successful signup response (if needed)
      // console.log(response);
    } catch (error) {
      // Handle signup error
      // console.error(error);
      // toast.error("Signup successful!");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[40%] mx-auto">
        <div className="mb-2">
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
                fullWidth
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
        <div className="mb-2">
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
        <div className="mb-2">
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
          text="register"
          disabled={false}
          fullWidth={true}
          loading={false}
        />
      </form>
    </div>
  );
};

export default SignUp;
