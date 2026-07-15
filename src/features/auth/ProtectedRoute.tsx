import { Navigate } from "react-router-dom";
import { Children, type ReactNode } from "react";
import { useAuth } from "./AuthContext";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { isAuthed } = useAuth();

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

