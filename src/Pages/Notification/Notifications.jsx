import React, { useState, useEffect, useRef } from "react";
import { ConfigProvider, Pagination } from "antd";
import io from "socket.io-client";
import toast from "react-hot-toast";
import { FaRegBell } from "react-icons/fa";
import moment from "moment";
import {
  useNotificationQuery,
  useReadAllMutation,
  useReadMutation,
} from "../../redux/apiSlices/notificationSlice";

const Notifications = ({ profile }) => {
  const [page, setPage] = useState(1);
  const socketRef = useRef(null);

  const {
    data: notifications,
    refetch,
    isLoading: notificationLoading,
  } = useNotificationQuery();

  const [readNotification, { isLoading: updateLoading }] = useReadMutation();
  const [readAllNotifications, { isLoading: readAllLoading }] =
    useReadAllMutation();

  useEffect(() => {
    if (!profile?.data?._id) return;

    // Connect to WebSocket server with automatic reconnection
    socketRef.current = io("http://10.0.60.126:6007", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    // Log connection status
    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    // Listen for real-time notifications
    const handleNewNotification = (data) => {
      console.log("New notification received:", data);
      refetch();
    };

    const eventChannel = `notification::${profile.data._id}`;
    console.log(`Listening to ${eventChannel}`);

    socketRef.current.on(eventChannel, handleNewNotification);

    return () => {
      if (socketRef.current) {
        console.log(`Unsubscribing from ${eventChannel}`);
        socketRef.current.off(eventChannel, handleNewNotification);
        socketRef.current.disconnect();
      }
    };
  }, [refetch, profile?.data?._id]);

  const markAsRead = async (id) => {
    try {
      await readNotification(id);
      refetch();
      toast.success("Notification marked as read!");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark as read.");
    }
  };

  const markAllAsRead = async () => {
    try {
      await readAllNotifications();
      refetch();
      toast.success("All notifications marked as read!");
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all as read.");
    }
  };

  const formatTime = (timestamp) =>
    timestamp ? moment(timestamp).fromNow() : "Just now";

  const unreadCount =
    notifications?.data?.result?.filter((notif) => !notif.read).length || 0;
  const displayedNotifications =
    notifications?.data?.result?.slice((page - 1) * 5, page * 5) || [];

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-3 text-white">
        <h2 className="text-[22px]">All Notifications</h2>
        <button
          className="bg-gtdandy h-10 px-4 rounded-md"
          onClick={markAllAsRead}
          disabled={readAllLoading}
        >
          {readAllLoading ? "Loading..." : "Read All"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {displayedNotifications.length > 0 ? (
          displayedNotifications.map((notification, index) => (
            <div
              key={notification._id || index}
              className="border-b pb-2 border-gray-500 flex items-center gap-3"
            >
              <FaRegBell
                size={50}
                className="text-quilocoD bg-[#00000033] p-2 rounded-md"
              />
              <div>
                <p>{notification.message || "New Notification"}</p>
                <p className="text-gray-400 text-sm">
                  {formatTime(notification.createdAt)}
                </p>
              </div>
              {!notification.read && (
                <button
                  className="text-blue-500 text-sm ml-auto"
                  onClick={() => markAsRead(notification._id)}
                  disabled={updateLoading}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No notifications available.</p>
        )}
      </div>

      <div className="flex items-center justify-center mt-6">
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#FFC301",
                itemBg: "black",
                borderRadius: "50px",
                colorText: "white",
              },
            },
            token: { colorPrimary: "white" },
          }}
        >
          <Pagination
            current={page}
            total={notifications?.data?.total || 0}
            onChange={(page) => setPage(page)}
            pageSize={5}
            showQuickJumper={false}
            showSizeChanger={false}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Notifications;
