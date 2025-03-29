import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge, Avatar, Popover } from "antd";
import { CgMenu } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import { imageUrl } from "../../redux/api/baseApi";
import { useProfileQuery } from "../../redux/apiSlices/profileSlice";
import NotificationPopover from "../../Pages/Notification/NotificationPopover";
import io from "socket.io-client";
import { useNotificationQuery } from "../../redux/apiSlices/notificationSlice";

const Header = ({ toggleSidebar }) => {
  const socketRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { data: profile } = useProfileQuery();
  const user = profile?.data;
  const src = `${imageUrl}${user?.image}`;

  const { data: notifications, refetch } = useNotificationQuery();

  const unreadNotification = notifications?.data?.result?.filter(
    (notification) => !notification.read
  ).length;

  const location = useLocation();

  const getPageName = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";

    const pageName = path.substring(1).split("/").pop();
    return pageName
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Use useCallback to prevent unnecessary re-renders
  const fetchNotifications = useCallback(() => {
    console.log("Fetching notifications...");
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("YOUR_BACKEND_SOCKET_URL", {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 3000,
      });

      socketRef.current.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      socketRef.current.on("newNotification", (data) => {
        console.log("New notification received:", data);
        fetchNotifications(); // Update notifications in real-time
      });

      socketRef.current.on("disconnect", () => {
        console.log("Disconnected from WebSocket. Attempting to reconnect...");
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [fetchNotifications]);

  return (
    <div className="bg-[#232323] min-h-[80px] flex items-center px-6 transition-all duration-300">
      <CgMenu
        size={40}
        onClick={toggleSidebar}
        className="cursor-pointer text-white"
      />

      <h1 className="text-2xl text-white ml-4">{getPageName()}</h1>

      <div className="flex items-center gap-6 ml-auto">
        <Popover
          content={<NotificationPopover />}
          title={null}
          trigger="click"
          arrow={false}
          open={open}
          onOpenChange={setOpen}
          placement="bottom"
        >
          <div className="relative border rounded-full p-2 cursor-pointer">
            <FaRegBell size={24} color="white" />
            <Badge
              count={unreadNotification}
              overflowCount={5}
              size="small"
              className="absolute top-1 -right-0"
            />
          </div>
        </Popover>

        <Link to="/my-profile" className="flex items-center gap-2 text-white">
          <div className="border rounded-full">
            <Avatar size={40} src={src} />
          </div>
          <p>{user?.name}</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
