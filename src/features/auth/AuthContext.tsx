

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AuthUser } from "../../api/auth";


type AuthValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthed: boolean;
  setSession: (token: string, user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);
const KEY = "auth_v1";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as {
        token: string;
        user: AuthUser;
      };

      setToken(parsed.token);
      setUser(parsed.user);
    } catch {
      localStorage.removeItem(KEY);
    }
  }, []);

  const value = useMemo<AuthValue>(() => {
    return {
      user,
      token,
      isAuthed: Boolean(token),

      setSession: (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem(
          KEY,
          JSON.stringify({ token: newToken, user: newUser }),
        );
      },

      logout: () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(KEY);
      },
    };
  }, [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }

  return ctx;
}
