import { Button, ConfigProvider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import EmptyNotification from "../../assets/quiloco/EmptyNotification.png";
function NotificationPopover() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "#a11d26 ",
            defaultColor: "#ffffff ",
            defaultHoverBg: "#a11d26 ",
            defaultHoverColor: "#ffffff ",
            defaultHoverBorderColor: "#a11d26 ",
            defaultActiveBg: "#a11d26 ",
            defaultActiveColor: "#ffffff ",
            defaultActiveBorderColor: "none",
          },
        },
      }}
    >
      <div className="w-52 flex flex-col gap-1 items-center justify-center bg-black py-3">
        <img src={EmptyNotification} width={120} height={150} />
        <p className="font-medium text-base text-center text-white">
          There’s no notifications
        </p>
        <p className="text-wrap text-center text-[12px]">
          Your notifications will be appear on this page.
        </p>
        <Link to="/notification">
          <Button className="w-32 rounded-lg">See details</Button>
        </Link>
      </div>
    </ConfigProvider>
  );
}

export default NotificationPopover;
