import { authApi } from "@/services/api/api";

export const setToken = (token: any) => {
  if (token) {
    authApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete authApi.defaults.headers.common["Authorization"];
  }
};
