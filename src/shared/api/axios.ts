import axios from "axios";

import { authStore } from "@/shared/auth/authStore";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000",
});

// Request interceptor — добавляем токен к каждому запросу
axiosInstance.interceptors.request.use((config) => {
  const token = authStore.getState().access_token;
  console.log(
    "[AXIOS] URL:",
    config.url,
    "| Token:",
    token ? token.substring(0, 30) + "..." : "NONE",
  );

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    console.log("[AXIOS] Authorization header added");
  } else {
    console.warn("[AXIOS] NO TOKEN for:", config.url);
  }

  return config;
});

// Response interceptor — обрабатываем 401 ошибку
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStore.getState().logout();
    }

    return Promise.reject(error);
  },
);
