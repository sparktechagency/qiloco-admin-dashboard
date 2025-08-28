import { clearAuthData } from "./jwtUtils";

// Utility functions for cross-tab logout functionality

export const triggerLogout = () => {
  // Set a logout flag in localStorage to trigger the storage event
  localStorage.setItem("logout", Date.now().toString());
  // Clear all authentication data using the utility function
  clearAuthData();
  // Remove the logout flag after clearing
  localStorage.removeItem("logout");
};

export const handleLogoutFromStorage = (navigate) => {
  // Clear authentication data using the utility function
  clearAuthData();
  // Navigate to login page
  navigate("/auth/login");
};

export const setupLogoutListener = (navigate) => {
  const handleStorageChange = (e) => {
    if (e.key === "logout") {
      handleLogoutFromStorage(navigate);
    }
  };

  // Add event listener for storage changes
  window.addEventListener("storage", handleStorageChange);

  // Return cleanup function
  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
};
