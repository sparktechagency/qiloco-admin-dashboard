import React, { useState, useEffect, useRef } from "react";
import { ConfigProvider, Pagination } from "antd";
import io from "socket.io-client";
import toast from "react-hot-toast";
import { FaRegBell } from "react-icons/fa";
import moment from "moment";
import {
  useNotificationQuery,
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
  const [readAllNotifications] = useReadMutation();

  useEffect(() => {
    socketRef.current = io("http://10.0.60.126:6007");

    const handleNewNotification = () => {
      refetch();
    };

    if (profile?.data?._id) {
      socketRef.current.on(
        `notification::${profile.data._id}`,
        handleNewNotification
      );
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off(
          `notification::${profile?.data?._id}`,
          handleNewNotification
        );
        socketRef.current.disconnect();
      }
    };
  }, [refetch, profile?.data?._id]);

  const markAsRead = async (id) => {
    try {
      await readNotification(id);
      refetch();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await readAllNotifications();
      refetch();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
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
          disabled={updateLoading}
        >
          {updateLoading ? "Loading..." : "Read All"}
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
