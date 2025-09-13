import { useState, useEffect, type ReactNode } from "react";
import { loginRequest, refreshRequest } from "../api/auth";
import { AuthContext } from "./useAuth";


export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const { access_token, refresh_token } = JSON.parse(stored);
      setToken(access_token);
      setRefreshToken(refresh_token);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await loginRequest(username, password);
      setToken(data.access_token);
      setRefreshToken(data.refresh_token);
      localStorage.setItem("auth", JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("auth");
  };

  useEffect(() => {
    if (!refreshToken) return;

    const interval = setInterval(async () => {
      try {
        const data = await refreshRequest(refreshToken);
        setToken(data.access_token);
        setRefreshToken(data.refresh_token);
        localStorage.setItem("auth", JSON.stringify(data));
      } catch (e) {
        console.error(e)
        logout();
      }
    }, 9 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
