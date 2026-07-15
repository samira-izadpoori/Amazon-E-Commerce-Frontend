import { createContext, useContext, useMemo, useState } from "react";
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

function getStoredSession(): {
  token: string | null;
  user: AuthUser | null;
} {
  try {
    const raw = localStorage.getItem(KEY);

    if (!raw) {
      return { token: null, user: null };
    }

    const parsed = JSON.parse(raw) as {
      token: string;
      user: AuthUser;
    };

    return {
      token: parsed.token,
      user: parsed.user,
    };
  } catch {
    localStorage.removeItem(KEY);

    return {
      token: null,
      user: null,
    };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedSession = getStoredSession();

  const [token, setToken] = useState<string | null>(storedSession.token);
  const [user, setUser] = useState<AuthUser | null>(storedSession.user);

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
