import { ConfigProvider, Table } from "antd";
import React, { useState } from "react";
import { useInquiryQuery } from "../../../redux/apiSlices/inquirySlice";
import { IoEye } from "react-icons/io5";
import InquiryDetailsModal from "./InquiryDetailsModal";

function Inquiry() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const { data: inquiryData, isLoading } = useInquiryQuery();

  // Transform API data for table
  const inquiries = inquiryData?.data?.map((item, index) => ({
    key: item._id,
    serial: index + 1,
    email: item.email,
    subject: item.address, // Assuming "address" is the subject
    createdAt: new Date(item.createdAt).toLocaleString(),
    ...item, // Include all fields for modal display
  }));

  // Function to handle opening modal with selected inquiry
  const showModal = (record) => {
    setSelectedInquiry(record);
    setIsModalOpen(true);
  };

  // Define columns with action button
  const columns = [
    {
      title: "Sl#",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
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
          dataSource={inquiries}
          columns={columns}
          loading={isLoading}
          size="middle"
          pagination={{
            current: page,
            onChange: (page) => setPage(page),
            pageSize: 5,
            total: inquiryData?.data?.length || 0,
          }}
        />
      </div>

      {/* Inquiry Details Modal */}
      <InquiryDetailsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        transaction={selectedInquiry}
      />
    </ConfigProvider>
  );
}

export default Inquiry;
