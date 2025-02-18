import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface Props {
  children: React.ReactNode;
}

export interface AuthResponse {
  token: string;
}

export interface IAuthContext {
  token: string | null;
  login: (token: string) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [token, setToken] = useState<string | null>(cookies.token || null);

  useEffect(() => {
    setToken(cookies.token);
  }, [cookies]);

  const login = (newToken: string) => {
    setCookie("token", newToken, {
      path: "/",
      maxAge: 60 * 60, // 60min //
    });
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
