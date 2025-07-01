import axios from "axios";
import { store } from "../store";
import { login, logout } from "../auth/authSlice";

export const api = axios.create({
  baseURL: "http://localhost:3000", // API URL
  withCredentials: true, // To send cookies HttpOnly (refresh token)
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAccessTokenExpired =
      error.response?.status === 401 &&
      error.response?.data?.code === "TOKEN_EXPIRED";

    const isRefreshTokenExpired =
      error.response?.status === 401 &&
      error.response?.data?.code === "REFRESH_TOKEN_EXPIRED";

    if (isAccessTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh", null, {
          withCredentials: true,
        });

        const { accessToken, user } = res.data;

        store.dispatch(login({ accessToken, user }));

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (e) {
        store.dispatch(logout());
        alert("Session expired. Please login again.");
        return Promise.reject(e);
      }
    }

    if (isRefreshTokenExpired) {
      store.dispatch(logout());
      alert("Session expired. Please login again.");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
