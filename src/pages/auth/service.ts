import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "@/api/client";
import storage from "@/utils/storage";
import type { Credentials, Login } from "./types";

export async function login(credentials: Credentials, remember: boolean) {
  const response = await client.post<Login>("/auth/login", credentials);
  const { accessToken } = response.data;

  storage.remove("auth");
  if (remember) {
    storage.set("auth", accessToken);
  }
  setAuthorizationHeader(accessToken);
}

export async function logout() {
  storage.remove("auth");
  removeAuthorizationHeader();
}
