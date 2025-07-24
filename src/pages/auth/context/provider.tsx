import { type ReactNode, useState } from "react";
import context from "./context";

export function AuthProvider({
  defaultIsLogged,
  children,
}: {
  defaultIsLogged: boolean;
  children: ReactNode;
}) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <context.Provider value={authValue}>{children}</context.Provider>;
}
