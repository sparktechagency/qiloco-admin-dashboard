import { Navigate } from "react-router-dom";
import { isSuperAdmin, isTokenValid } from "../utils/jwtUtils";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Check if token exists and is valid
  if (!token || !isTokenValid(token)) {
    // Clear any invalid auth data
    localStorage.removeItem("token");
    localStorage.removeItem("Super");
    return <Navigate to="/auth/login" replace />;
  }

  // Check if user is SUPER_ADMIN
  if (!isSuperAdmin(token)) {
    // Clear auth data for non-super admin users
    localStorage.removeItem("token");
    localStorage.removeItem("Super");
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
