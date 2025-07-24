import { createContext } from "react";

export default createContext<{
  isLogged: boolean;
  onLogin: () => void;
  onLogout: () => void;
}>({
  isLogged: false,
  onLogin: () => {},
  onLogout: () => {},
});
