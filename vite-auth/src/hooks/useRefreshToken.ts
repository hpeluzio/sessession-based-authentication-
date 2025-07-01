import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login, logout } from "../auth/authSlice";
import { api } from "../api/axios";

export function useRefreshToken() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: () =>
      api.post("/auth/refresh", null, {
        withCredentials: true,
      }),
    onSuccess: (response) => {
      console.log("RefreshToken: ", response.data);
      dispatch(login({ ...response.data }));
    },
    onError: () => {
      // dispatch(logout());
    },
    retry: 1,
  });
}
