import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.ts";
import { AuthResponse } from "../../context/authContext.tsx";
import { api } from "../../boot/axios.ts";

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { token, login } = useAuth();
  const [isError, setIsError] = useState(false);

  const handleAuth = async () => {
    try {
      const response = await api.post<AuthResponse>("/token/login", {
        login: "testdemo",
        password: "demo",
      });

      const tokenRes = response.data.token;
      login(tokenRes);
    } catch (error: unknown) {
      console.error("AUTH ERROR", error);
    }
  };

  useEffect(() => {
    if (isError) {
      /// В случае отсутствие токена запрашиваю токен авторизацией
      handleAuth();
    }
  }, [isError]);

  if (!token) {
    console.log("location", location);
    /// Логику обновления токена не релизовываю, не указано в ТЗ
    /// Да и по какой то причине в тестовом api нету проверки auth токена для получения данных
    /// Данные придут даже если ничего не указывать в headers или cookies
    /// Тут должно быть перенаправление на login, но в рамках тестового не требуется
    /// Тригерю авторизацию.;

    if (!isError) {
      setIsError(true);
    }
  } else {
    return children;
  }
};
