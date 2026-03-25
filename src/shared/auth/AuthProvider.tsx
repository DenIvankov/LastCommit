import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import {
  authControllerLogin,
  authControllerLogout,
  authControllerRegister,
} from "@/shared/api/generated/auth/auth";
import type { LoginUserDto, RegisterUserDto } from "@/shared/api/generated/models";
import { usersControllerGetAllFavoritesPosts } from "@/shared/api/generated/users/users";
import { withAuth } from "@/shared/api/client";
import {
  clearAccessToken,
  getAccessToken,
  onUnauthorized,
  setAccessToken,
} from "@/shared/auth/session";

interface AuthContextValue {
  isAuthenticated: boolean;
  isHydrating: boolean;
  token: string | null;
  userName: string | null;
  login: (payload: LoginUserDto) => Promise<void>;
  register: (payload: RegisterUserDto) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      const storedToken = getAccessToken();

      if (!storedToken) {
        setIsHydrating(false);
        return;
      }

      setToken(storedToken);

      try {
        await usersControllerGetAllFavoritesPosts(withAuth());
      } catch {
        clearAccessToken();
        setToken(null);
        setUserName(null);
      } finally {
        setIsHydrating(false);
      }
    };

    void hydrate();
  }, []);

  useEffect(() => {
    return onUnauthorized(() => {
      setToken(null);
      setUserName(null);
    });
  }, []);

  const login = useCallback(async (payload: LoginUserDto) => {
    const data = await authControllerLogin(payload);
    const accessToken = data.access_token;

    if (!accessToken) {
      throw new Error("Access token was not returned by API.");
    }

    setAccessToken(accessToken);
    setToken(accessToken);
    setUserName(data.userName ?? null);
  }, []);

  const register = useCallback(async (payload: RegisterUserDto) => {
    const data = await authControllerRegister(payload);
    const accessToken = data.access_token;

    if (!accessToken) {
      throw new Error("Access token was not returned by API.");
    }

    setAccessToken(accessToken);
    setToken(accessToken);
    setUserName(data.userName ?? payload.name);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authControllerLogout(withAuth());
    } catch {
      // Logout should clear local session even if API call fails.
    } finally {
      clearAccessToken();
      setToken(null);
      setUserName(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(token),
      isHydrating,
      token,
      userName,
      login,
      register,
      logout,
    }),
    [isHydrating, login, logout, register, token, userName],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
