import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { setupLogoutListener } from "../../utils/logoutUtils";
import { isSuperAdmin, isTokenValid } from "../../utils/jwtUtils";

const Main = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Setup cross-tab logout listener
  useEffect(() => {
    const cleanup = setupLogoutListener(navigate);
    return cleanup;
  }, [navigate]);

  // Validate token on component mount and periodically
  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("token");

      // Check if token is valid and user is SUPER_ADMIN
      if (!token || !isTokenValid(token) || !isSuperAdmin(token)) {
        // Clear invalid auth data
        localStorage.removeItem("token");
        localStorage.removeItem("Super");
        navigate("/auth/login");
      }
    };

    // Validate immediately
    validateToken();

    // Set up periodic validation (every 5 minutes)
    const interval = setInterval(validateToken, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex bg-[#f8f8f8]">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Header toggleSidebar={toggleSidebar} />
        <div
          className="flex-1 p-4 bg-quilocoS overflow-auto [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
