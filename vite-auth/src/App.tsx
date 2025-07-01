import { useSelector } from "react-redux";
import "./App.css";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Home from "./Home/Home";
import type { RootState } from "./store";
import { useRefreshToken } from "./hooks/useRefreshToken";
import { useEffect } from "react";

function App() {
  const auth = useSelector((state: RootState) => state.auth);

  console.log("Store auth state:", auth);

  const { mutate } = useRefreshToken();

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <>
      <h1> {auth.isAuthenticated ? "Logged in" : "Not logged in"}</h1>
      <div>{auth.isAuthenticated && <Home />}</div>
      <div>{auth.isAuthenticated ? <Logout /> : <Login />}</div>
    </>
  );
}

export default App;
