
import { http } from "./http";

export type AuthUser = { id: string; email: string; name?: string | null };

export async function login(email: string, password: string) {
  const { data } = await http.post("/auth/login", { email, password });
  return data as { token: string; user: AuthUser };
}

export async function register(email: string, password: string, name?: string) {
  const { data } = await http.post("/auth/register", { email, password, name });
  return data as { token: string; user: AuthUser };
}