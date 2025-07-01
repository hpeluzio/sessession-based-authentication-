// src/auth/hooks/useMe.ts
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { api } from "../../api/axios";
import type { RootState } from "../../store";

export function useMe() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!accessToken,
  });
}
