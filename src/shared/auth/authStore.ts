import { create } from "zustand";

import { axiosInstance } from "@/shared/api/axios";
import { getAuth } from "@/shared/api/generated/auth/auth";
import type {
  LoginUserDto,
  RegisterUserDto,
} from "@/shared/api/generated/models";

const authApi = getAuth(axiosInstance);

interface AuthState {
  access_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginUserDto) => Promise<void>;
  register: (credentials: RegisterUserDto) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Читаем токен из localStorage при инициализации
const getInitialToken = () => {
  try {
    const persisted = localStorage.getItem("auth-storage");
    if (persisted) {
      const parsed = JSON.parse(persisted);
      return parsed.state?.access_token || null;
    }
  } catch {
    // ignore
  }
  return null;
};

const initialToken = getInitialToken();

export const authStore = create<AuthState>()((set) => ({
  access_token: initialToken,
  isAuthenticated: !!initialToken,
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });

      const response = await authApi.authControllerLogin(credentials);

      if (!response.data.access_token) {
        throw new Error("Access token not received");
      }

      // Сохраняем токен в localStorage вручную
      const newState = {
        access_token: response.data.access_token,
        isAuthenticated: true,
        isLoading: false,
      };
      set(newState);
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: newState,
          version: 0,
        }),
      );
    } catch (error) {
      let message = "Login failed";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        message = axiosError.response?.data?.message || message;
      }
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  register: async (credentials) => {
    try {
      set({ isLoading: true, error: null });

      const response = await authApi.authControllerRegister(credentials);

      if (!response.data.access_token) {
        throw new Error("Access token not received");
      }

      const newState = {
        access_token: response.data.access_token,
        isAuthenticated: true,
        isLoading: false,
      };
      set(newState);
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: newState,
          version: 0,
        }),
      );
    } catch (error) {
      let message = "Registration failed";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        message = axiosError.response?.data?.message || message;
      }
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  logout: async () => {
    try {
      await authApi.authControllerLogout();
    } catch {
      // ignore
    } finally {
      localStorage.removeItem("auth-storage");
      set({
        access_token: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    }
  },
}));

export const useAuthStore = () => authStore();
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
export const selectIsLoading = (state: AuthState) => state.isLoading;
