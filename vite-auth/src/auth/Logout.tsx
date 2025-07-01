import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { api } from "../api/axios";

export default function Logout() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout", null, { withCredentials: true });
      dispatch(logout());
      console.log("Logout feito com sucesso.");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? "Deslogando..." : "Sair"}
    </button>
  );
}
