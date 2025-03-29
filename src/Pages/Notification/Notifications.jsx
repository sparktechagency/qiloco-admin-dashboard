import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import toast from "react-hot-toast";
import { FaRegBell } from "react-icons/fa";
import moment from "moment";
import {
  useNotificationQuery,
  useReadAllMutation,
  useReadMutation,
} from "../../redux/apiSlices/notificationSlice";
import Loading from "../../components/common/Loading";

const Notifications = ({ profile }) => {
  const socketRef = useRef(null);
  const [notificationList, setNotificationList] = useState([]);

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

    socketRef.current = io("http://10.0.60.126:6007", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    const handleNewNotification = (data) => {
      console.log("New notification received:", data);
      setNotificationList((prev) => [data, ...prev]); // Add new notifications at the top
    };

    const eventChannel = `notification::${profile.data._id}`;
    console.log(`Listening to ${eventChannel}`);

    socketRef.current.on(eventChannel, handleNewNotification);

    return () => {
      if (socketRef.current) {
        console.log(`Unsubscribing from ${eventChannel}`);
        socketRef.current.off(eventChannel, handleNewNotification);
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [profile?.data?._id]);

  useEffect(() => {
    if (notifications?.data?.result) {
      setNotificationList(notifications.data.result); // Load all notifications at once
    }
  }, [notifications]);

  const markAsRead = async (id) => {
    try {
      await readNotification(id);
      setNotificationList((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
      toast.success("Notification marked as read!");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark as read.");
    }
  };

  const markAllAsRead = async () => {
    try {
      await readAllNotifications();
      setNotificationList((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
      toast.success("All notifications marked as read!");
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all as read.");
    }
  };

  const formatTime = (timestamp) =>
    timestamp ? moment(timestamp).fromNow() : "Just now";

  const unreadCount = notificationList.filter((notif) => !notif.read).length;

  return notificationLoading ? (
    <Loading />
  ) : (
    <div className="px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3 text-white">
        <h2 className="text-[22px]">All Notifications</h2>
        <button
          className="bg-gtdandy h-10 px-4 rounded-md"
          onClick={markAllAsRead}
          disabled={readAllLoading || unreadCount === 0}
        >
          {readAllLoading ? "Loading..." : "Read All"}
        </button>
      </div>

      {/* Notifications List */}
      <div className="grid grid-cols-1 gap-5">
        {notificationList.length > 0 ? (
          notificationList.map((notification, index) => (
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
                  {updateLoading ? "Processing..." : "Mark as Read"}
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
