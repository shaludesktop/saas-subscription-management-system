import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Not admin
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin access
  return children;
}