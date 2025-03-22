import React from "react";
import { Tabs, ConfigProvider } from "antd";
import AdminList from "./AdminList";
import AdminPassword from "./AdminPassword";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "admin",
    label: "Admin",
    children: <AdminList />,
  },
  {
    key: "password",
    label: "Password",
    children: <AdminPassword />,
  },
];
function Setting() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemColor: "white",
            inkBarColor: "#a11d26",
            itemHoverColor: "white",
            itemSelectedColor: "#a11d26",
            titleFontSize: "18px",
            horizontalMargin: "0 0 30px 0",
          },
        },
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        className="px-10 py-5 font-medium "
      />
    </ConfigProvider>
  );
}

export default Setting;
