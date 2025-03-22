import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { TbBellBolt, TbDashboard, TbListDetails } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { PiWallet } from "react-icons/pi";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { RiMoneyDollarCircleLine, RiSettings5Line } from "react-icons/ri";
import qilocoLogo from "../../assets/quiloco/qilocoLogo.png";
import { LuBoxes } from "react-icons/lu";

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <RxDashboard size={24} />,
      label: isCollapsed ? (
        <Link to="/">Overview</Link>
      ) : (
        <Link to="/">Overview</Link>
      ),
    },
    {
      key: "/products",
      icon: <LuBoxes size={25} />,
      label: isCollapsed ? (
        <Link to="/products">Products</Link>
      ) : (
        <Link to="/products">Products</Link>
      ),
    },
    {
      key: "/orderDetails",
      icon: <TbListDetails size={25} />,
      label: isCollapsed ? (
        <Link to="/orderDetails">Order Details</Link>
      ) : (
        <Link to="/orderDetails">Order Details</Link>
      ),
    },
    {
      key: "/earnings",
      icon: <RiMoneyDollarCircleLine size={25} />,
      label: isCollapsed ? (
        <Link to="/earnings">Earnings</Link>
      ) : (
        <Link to="/earnings">Earnings</Link>
      ),
    },
    {
      key: "subMenuSetting1",
      icon: <RiSettings5Line size={23} />,
      label: isCollapsed ? null : "Settings",
      children: isCollapsed
        ? [
            {
              key: "/returnPolicy",
              label: (
                <Link to="/returnPolicy" className="text-white">
                  Return Policy
                </Link>
              ),
            },
            {
              key: "/privacyPolicy",
              label: (
                <Link to="/privacyPolicy" className="text-white">
                  Privacy Policy
                </Link>
              ),
            },
          ]
        : [
            {
              key: "/returnPolicy",
              label: (
                <Link to="/returnPolicy" className="text-white">
                  Return Policy
                </Link>
              ),
            },
            {
              key: "/privacyPolicy",
              label: (
                <Link to="/privacyPolicy" className="text-white">
                  Privacy Policy
                </Link>
              ),
            },
          ],
    },
    {
      key: "/logout",
      icon: <FiLogOut size={24} />,
      label: isCollapsed ? null : (
        <p onClick={handleLogout} className="text-white hover:text-white">
          Logout
        </p>
      ),
    },
  ];

  useEffect(() => {
    setSelectedKey(path);
  }, [path]);

  return (
    <div
      className={`bg-quilocoP h-full shadow-md transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[280px]"
      }`}
    >
      <Link to="/" className="flex items-center justify-center py-4 text-white">
        <div className="w-full flex items-center justify-center bg-quilocoP px-4 py-3 gap-3 rounded-lg">
          {/* <TbDashboard size={30} className="text-white" />
          {!isCollapsed && <p className="text-xl font-semibold">Dashboard</p>} */}
          <img src={qilocoLogo} />
        </div>
      </Link>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ background: "#232323" }}
        items={menuItems}
        className="text-white mt-10"
        inlineCollapsed={isCollapsed}
      />
    </div>
  );
};

export default Sidebar;
