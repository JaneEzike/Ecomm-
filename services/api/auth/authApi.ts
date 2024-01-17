import { authApi } from "../api";
import { useMutation } from "@tanstack/react-query";
import {
  GenericResponse,
  ILoginResponse,
  IUser,
  IUserResponse,
} from "@/app/types/general";

export const signUpUserFn = async (user: IUser) => {
  const response = await authApi.post("/auth/v1/admin/sign-up", user);
  return response.data;
};

export const loginUserFn = async (user: ILoginResponse) => {
  const response = await authApi.post("/auth/v1/login/admin/", user);
  return response.data;
};

export const verifyEmailFn = async (otp_code: any) => {
  const response = await authApi.get(`/auth/v1/confirm/otp/${otp_code}`);
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await authApi.get<GenericResponse>("/auth/v1/logout/");
  return response.data;
};

// export const getMeFn = async () => {
//   const response = await authApi.get("users/me");
//   return response.data;
// };

// // Export your authentication functions
// export const useLogin = () => useMutation(loginUserFn);
// export const useSignUp = () => useMutation(signUpUserFn);
// export const useLogout = () => useMutation(logoutUserFn);
// export const useVerifyEmail = () => useMutation(verifyEmailFn);
// export const useGetUser = () => useMutation(getMeFn);
