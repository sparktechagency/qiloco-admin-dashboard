import { jwtDecode } from "jwt-decode";

// JWT utility functions for authentication

export const decodeToken = (token) => {
  try {
    if (!token) return null;
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isTokenValid = (token) => {
  try {
    if (!token) return false;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check if token is expired
    if (decoded.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

export const isSuperAdmin = (token) => {
  try {
    if (!token) return false;

    const decoded = decodeToken(token);
    if (!decoded) return false;

    // Check if token is valid and user is SUPER_ADMIN
    return isTokenValid(token) && decoded.role === "SUPER_ADMIN";
  } catch (error) {
    console.error("Error checking super admin status:", error);
    return false;
  }
};

export const getUserInfo = (token) => {
  try {
    if (!token) return null;

    const decoded = decodeToken(token);
    if (!decoded || !isTokenValid(token)) return null;

    return {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
      iat: decoded.iat,
      exp: decoded.exp,
    };
  } catch (error) {
    console.error("Error getting user info:", error);
    return null;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("Super");
  localStorage.removeItem("savedEmail");
  // Clear any other auth-related data
};

export const setAuthData = (token, userRole) => {
  localStorage.setItem("token", token);
  localStorage.setItem("Super", userRole);
};
