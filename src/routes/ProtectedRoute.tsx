import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../state/useAppSelector";

export default function ProtectedRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
