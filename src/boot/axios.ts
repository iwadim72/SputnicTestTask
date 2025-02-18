import { Cookies } from "react-cookie";
import axios from "axios";

const cookies = new Cookies();

const api = axios.create({
  baseURL: "https://sputnic.tech/mobile_api",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT token interceptor
api.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 401 Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      cookies.remove("token", { path: "/" });

      console.warn("Проблема с токеном, необходимо обновление");
      /// Тут была бы логика обновления токена
    }
    return Promise.reject(error);
  },
);

export { api };
