import React, { useEffect, useRef, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import io from "socket.io-client";
import moment from "moment";
import Loading from "../../components/common/Loading";
import {
  useNotificationQuery,
  useReadAllMutation,
  useReadMutation,
} from "../../redux/apiSlices/notificationSlice";

const Notifications = ({ profile }) => {
  const socketRef = useRef(null);
  // Store notifications from both API and socket
  const [combinedNotifications, setCombinedNotifications] = useState([]);

  const {
    data: notifications,
    refetch,
    isLoading: notificationLoading,
  } = useNotificationQuery();

  const [readNotification, { isLoading: updateLoading }] = useReadMutation();
  const [readAllNotifications, { isLoading: readAllLoading }] =
    useReadAllMutation();

  // Update combined notifications whenever API data changes
  useEffect(() => {
    if (notifications?.data?.result) {
      setCombinedNotifications(notifications.data.result);
    }
  }, [notifications]);

  // Establish the socket connection and listen for new notifications
  useEffect(() => {
    if (!profile?.data?._id) return;

    // Create new socket connection
    socketRef.current = io("http://10.0.60.126:6007", {
      transports: ["websocket", "polling"],
      reconnection: true,
    });

    console.log("Socket initialized");

    // Define the event handler function
    function handleNewNotification(notification) {
      console.log("New notification received:", notification);

      // Add the new notification to the top of our list immediately
      setCombinedNotifications((prev) => {
        // Check if notification already exists to avoid duplicates
        const exists = prev.some((item) => item._id === notification._id);
        if (exists) return prev;

        // Add new notification at the beginning
        return [notification, ...prev];
      });
    }

    // Get the user-specific channel name
    const notificationChannel = `notification::${profile.data._id}`;

    // Register the event listener
    socketRef.current.on(notificationChannel, handleNewNotification);
    console.log(`Listening for notifications on: ${notificationChannel}`);

    // Connection status logging
    socketRef.current.on("connect", () => {
      console.log("Socket connected successfully");
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Cleanup socket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off(notificationChannel, handleNewNotification);
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [profile?.data?._id]);

  const formatTime = (timestamp) =>
    timestamp ? moment(timestamp).fromNow() : "Just now";

  if (notificationLoading && combinedNotifications.length === 0)
    return <Loading />;

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-3 text-white">
        <h2 className="text-[22px]">All Notifications</h2>
        <button
          className="bg-gtdandy h-10 px-4 rounded-md"
          onClick={() => {
            readAllNotifications();
            // Update local state to mark all as read
            setCombinedNotifications((prev) =>
              prev.map((notification) => ({ ...notification, read: true }))
            );
          }}
          disabled={readAllLoading}
        >
          {readAllLoading ? "Loading..." : "Mark All as Read"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {combinedNotifications.length > 0 ? (
          combinedNotifications.map((notification) => (
            <div
              key={notification._id}
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
                  onClick={() => {
                    readNotification(notification._id);
                    // Update the local state immediately
                    setCombinedNotifications((prev) =>
                      prev.map((item) =>
                        item._id === notification._id
                          ? { ...item, read: true }
                          : item
                      )
                    );
                  }}
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
    </div>
  );
};

export default Notifications;
