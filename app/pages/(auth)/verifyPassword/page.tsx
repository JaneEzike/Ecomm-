import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useVerifyEmail } from "@/services/api/auth/authApi";
import { CustomInput } from "@/components/CustomInput";

const EmailVerificationPage = () => {
  const router = useRouter();

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const verifyEmailMutation = useVerifyEmail();
  const onSubmit = async (data: any) => {
    try {
      const response = await verifyEmailMutation.mutateAsync();
      verifyEmailMutation.isSuccess &&
        toast.success("Email verified successfuly!");
      router.push("/login");
      console.log(response);
    } catch (error) {
      verifyEmailMutation.isError &&
        toast.error(verifyEmailMutation.error.message);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);
  return (
    <section className="bg-ct-blue-600 min-h-screen grid place-items-center">
      <ToastContainer />
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
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
          {errors.email && <p>{errors.email.message}</p>}
        </div>
      </form>
    </section>
  );
};

export default EmailVerificationPage;
