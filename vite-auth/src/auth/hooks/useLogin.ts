import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { api } from "../../api/axios";
import { login } from "../authSlice";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: Record<any, any>;
}

export function useLogin() {
  const dispatch = useDispatch();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: (credentials) =>
      api.post("/auth/login", credentials).then((res) => res.data),

    onSuccess(data) {
      dispatch(login({ accessToken: data.accessToken, user: data.user }));
    },

    onError(error) {
      console.error("Login failed:", error.message);
    },
  });
}
