import { useContext } from "react";
import context from "./context";

export function useAuth() {
  const authValue = useContext(context);
  return authValue;
}
