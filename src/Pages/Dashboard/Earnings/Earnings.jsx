import React, { useState, useMemo } from "react";
import { LuArrowLeftRight } from "react-icons/lu";
import { Table, ConfigProvider } from "antd";
import { IoEye } from "react-icons/io5";
import TransactionDetailsModal from "./TransactionDetailsModal";
import { useEarningQuery } from "../../../redux/apiSlices/earningSlice";
import dayjs from "dayjs";

function Earnings() {
  const { data: earnings } = useEarningQuery();
  const earningsTableData = earnings?.data?.earnings || [];

  // Calculate today's date in UTC format
  const today = dayjs().format("YYYY-MM-DD");

  // Calculate earnings
  const { todayEarnings, totalEarnings } = useMemo(() => {
    let todayEarnings = 0;
    let totalEarnings = 0;

    earningsTableData.forEach(({ createdAt, earning }) => {
      const date = dayjs(createdAt).format("YYYY-MM-DD");

      if (date === today) {
        todayEarnings += earning;
      }
      totalEarnings += earning;
    });

    return { todayEarnings, totalEarnings };
  }, [earningsTableData, today]);

  return (
    <div className="px-3">
      <div className="w-[576px] h-14 flex justify-between my-4">
        <div className="bg-[#121314] text-white flex items-center justify-evenly w-[278px] h-full rounded-lg">
          <LuArrowLeftRight size={25} />
          Today's Earning
          <span>${todayEarnings}</span>
        </div>
        <div className="bg-[#121314] text-white flex items-center justify-evenly w-[278px] h-full rounded-lg">
          <LuArrowLeftRight size={25} />
          All Earning
          <span>${totalEarnings}</span>
        </div>
      </div>
      <EarningsTable earningsTableData={earningsTableData} />
    </div>
  );
}

export default Earnings;

const EarningsTable = ({ earningsTableData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const showModal = (record) => {
    setSelectedTransaction(record); // Store transaction details
    setIsModalOpen(true); // Open modal
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, index) => <>#{index + 1}</>,
    },
    {
      title: "Order Id",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => text || "N/A",
    },
    {
      title: "Trnx Id",
      dataIndex: "trnxid",
      key: "trnxid",
      render: (text) => text || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Amount",
      dataIndex: "earning",
      key: "earning",
      render: (text) => `$${text}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => text || "N/A",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <a
          href="#"
          className="hover:text-[#a11d26]"
          onClick={(e) => {
            e.preventDefault();
            showModal(record);
          }}
        >
          <IoEye size={24} />
        </a>
      ),
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#575858",
              headerSplitColor: "none",
              headerColor: "white",
              borderColor: "#A3A3A3",
              colorBgContainer: "#3a3a3a",
              rowHoverBg: "#4a4a4a",
              colorText: "white",
            },
          },
        }}
      >
        <div className="custom-table">
          <Table columns={columns} dataSource={earningsTableData} pagination />
        </div>
      </ConfigProvider>

      {/* Pass transaction details to modal */}
      <TransactionDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        transaction={selectedTransaction}
      />
    </div>
  );
};
