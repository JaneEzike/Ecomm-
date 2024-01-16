"use client";
import { BASE_URL } from "./baseUrl";
import axios from "axios";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";
