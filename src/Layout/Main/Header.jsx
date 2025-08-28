import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge, Avatar, Popover } from "antd";
import { CgMenu } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import { useProfileQuery } from "../../redux/apiSlices/profileSlice";
import { getImageUrl } from "../../components/common/ImageUrl";
import { useNotificationQuery } from "../../redux/apiSlices/notificationSlice";
import io from "socket.io-client";
import NotificationPopover from "../../Pages/Notification/NotificationPopover";

const Header = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const socketRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: profile, isLoading } = useProfileQuery();
  const user = profile?.data;
  const src = getImageUrl(user?.image);

  const {
    data: notifications,
    refetch,
    isLoading: notificationLoading,
  } = useNotificationQuery();

  // Initialize unread count from API data
  useEffect(() => {
    if (notifications?.data?.result) {
      const count = notifications.data.result.filter(
        (notification) => !notification.read
      ).length;
      setUnreadCount(count);
    }
  }, [notifications]);

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

  // Socket connection for real-time notifications
  useEffect(() => {
    if (!user?._id) return;

    // Connect to Socket.IO server
    socketRef.current = io("http://145.223.75.211:6007", {
      transports: ["websocket", "polling"],
      reconnection: true,
    });

    // Log connection status
    socketRef.current.on("connect", () => {
      console.log(
        "Socket connected in header component:",
        socketRef.current.id
      );
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connection error in header:", error);
    });

    // Listen for notifications on the user-specific channel
    const notificationChannel = `notification::${user._id}`;

    // Handle new notification
    const handleNewNotification = (notification) => {
      console.log("New notification received in header:", notification);

      // Increment unread count immediately
      setUnreadCount((prev) => prev + 1);

      // Also refetch to ensure server state is synced
      refetch();
    };

    // Register event listener
    socketRef.current.on(notificationChannel, handleNewNotification);
    console.log(
      `Header listening for notifications on: ${notificationChannel}`
    );

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off(notificationChannel, handleNewNotification);
        socketRef.current.disconnect();
      }
    };
  }, [user?._id, refetch]);

  // Handler for when notification is read in the popover
  const handleNotificationRead = () => {
    // Update the unread count when notifications are read
    const updatedCount =
      notifications?.data?.result?.filter((notification) => !notification.read)
        .length || 0;

    setUnreadCount(updatedCount);
  };

  return (
    <div className="bg-[#232323] min-h-[80px] flex items-center px-6 transition-all duration-300">
      {/* Sidebar Toggle Button */}
      <CgMenu
        size={40}
        onClick={toggleSidebar}
        className="cursor-pointer text-white"
      />

      <h1 className="text-2xl text-white ml-4">{getPageName()}</h1>

      <div className="flex items-center gap-6 ml-auto">
        {/* Notifications */}
        <Popover
          content={
            <NotificationPopover onNotificationRead={handleNotificationRead} />
          }
          title={null}
          trigger="click"
          arrow={false}
          open={open}
          onOpenChange={(visible) => {
            setOpen(visible);
            if (visible) {
              // Refetch notifications when popover opens
              refetch();
            }
          }}
          placement="bottom"
        >
          <div className="relative border rounded-full p-2 cursor-pointer">
            <FaRegBell size={24} color="white" />
            <Badge
              count={unreadCount}
              overflowCount={5}
              size="small"
              className="absolute top-1 -right-0"
            />
          </div>
        </Popover>

        {/* User Profile */}
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
