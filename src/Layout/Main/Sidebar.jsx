import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegListAlt } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { FaClipboardQuestion, FaHandHoldingDollar } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { RiMoneyDollarCircleLine, RiSettings5Line } from "react-icons/ri";
import qilocoLogo from "../../assets/quiloco/qilocoLogo.png";
import { LuBoxes } from "react-icons/lu";
import { triggerLogout } from "../../utils/logoutUtils";

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Trigger cross-tab logout
    triggerLogout();
    // Navigate to login page in current tab
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
      key: "/inquiry",
      icon: <FaClipboardQuestion size={25} />,
      label: isCollapsed ? (
        <Link to="/inquiry">Inquiry</Link>
      ) : (
        <Link to="/inquiry">Inquiry</Link>
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
              icon: <FaHandHoldingDollar size={24} />,
              label: (
                <Link to="/returnPolicy" className="text-white">
                  Return Policy
                </Link>
              ),
            },
            {
              key: "/privacyPolicy",
              icon: <FaRegListAlt size={24} />,
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
              icon: <FaHandHoldingDollar size={24} />,
              label: (
                <Link to="/returnPolicy" className="text-white">
                  Return Policy
                </Link>
              ),
            },
            {
              key: "/privacyPolicy",
              icon: <FaRegListAlt size={24} />,
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
      <div
        className=" h-[70%]  overflow-y-auto
  [&::-webkit-scrollbar]:w-0
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
"
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ background: "#232323" }}
          items={menuItems}
          className="text-white mt-10"
          inlineCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
};

export default Sidebar;
