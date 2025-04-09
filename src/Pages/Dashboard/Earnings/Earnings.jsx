import React, { useState, useMemo } from "react";
import { LuArrowLeftRight } from "react-icons/lu";
import { Table, ConfigProvider } from "antd";
import { IoEye } from "react-icons/io5";
import TransactionDetailsModal from "./TransactionDetailsModal";
import { useEarningQuery } from "../../../redux/apiSlices/earningSlice";
import dayjs from "dayjs";
import Loading from "../../../components/common/Loading";

function Earnings() {
  const [page, setPage] = useState(1);
  const { data: earnings, isLoading } = useEarningQuery(page);

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
      <div className="w-full h-14 flex gap-10 my-4">
        <div className="bg-[#121314] text-white flex items-center justify-evenly w-1/3 h-full rounded-lg">
          <LuArrowLeftRight size={25} />
          Today's Earning
          <span>${parseFloat(todayEarnings).toFixed(2)}</span>
        </div>
        <div className="bg-[#121314] text-white flex items-center justify-evenly w-1/3 h-full rounded-lg">
          <LuArrowLeftRight size={25} />
          All Earning
          <span>${parseFloat(totalEarnings).toFixed(2)}</span>
        </div>
      </div>

      {/* Pass required props */}
      <EarningsTable
        earningsTableData={earningsTableData}
        page={page}
        setPage={setPage}
        earnings={earnings} // Pass full earnings data for pagination
        isLoading={isLoading}
      />
    </div>
  );
}

export default Earnings;

const EarningsTable = ({
  earningsTableData,
  page,
  setPage,
  earnings,
  isLoading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const showModal = (record) => {
    setSelectedTransaction(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (_, __, index) => <>#{index + 1}</>,
    },
    {
      title: "Order Id",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => text || "N/A",
    },
    {
      title: "Trnx Id",
      dataIndex: "paymentIntentId",
      key: "paymentIntentId",
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
      render: (earning) => `$${parseFloat(earning).toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
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

  if (isLoading) return <Loading />;

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
          <Table
            columns={columns}
            dataSource={earningsTableData}
            size="middle"
            pagination={{
              current: page,
              onChange: (page) => setPage(page),
              showSizeChanger: false, // 🔥 Hide page size dropdown
              pageSize: earnings?.data?.pagination?.limit || 10,
              total: earnings?.data?.pagination?.total || 0,
              showTotal: (total, range) => (
                <span className="text-white">{`Total ${total} items`}</span>
              ),
            }}
          />
        </div>
      </ConfigProvider>

      <TransactionDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        transaction={selectedTransaction}
      />
    </div>
  );
};
