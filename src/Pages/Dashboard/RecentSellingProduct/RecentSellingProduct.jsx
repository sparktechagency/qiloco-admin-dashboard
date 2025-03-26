import React, { useState } from "react";
import GetPageName from "../../../components/common/GetPageName";
import { Table, ConfigProvider, Avatar } from "antd";
import { useGetRecentProductQuery } from "../../../redux/apiSlices/overViewSlice";
import { IoEye } from "react-icons/io5";
import RecentProductDetails from "./RecentProductDetails"; // Import the modal component

function RecentSellingProduct() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetRecentProductQuery(page);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Ensure data is available
  const earnings = data?.data?.earnings || [];

  // Format data for the table
  const dataSource = earnings.map((item, index) => ({
    key: item._id,
    serial: `#${index + 1}`,
    productName: item.productName || "N/A", // Provide fallback if missing
    email: item.email,
    createdAt: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(item.createdAt)),
    totalPrice: `$${item.totalPrice.toLocaleString()}`,
    fullData: item, // Store full data for modal
  }));

  // Handle opening modal with selected product details
  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "SL#",
      dataIndex: "serial",
      key: "serial",
    },
    // {
    //   title: "Product Name",
    //   dataIndex: "productName",
    //   key: "productName",
    //   render: (text) => (
    //     <div className="flex items-center gap-2">
    //       <Avatar shape="square" size="default" src={productImg} />
    //       <span>{text}</span>
    //     </div>
    //   ),
    // },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => {
        // Convert to number and ensure 2 decimal places
        const numericAmount = parseFloat(totalPrice.replace("$", "")); // Remove $ if present
        return (
          <p>${isNaN(numericAmount) ? "N/A" : numericAmount.toFixed(2)}</p>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => showModal(record.fullData)}
          className="hover:text-[#a11d26]"
        >
          <IoEye size={24} />
        </button>
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
      <h3 className="text-white my-4 px-3">{GetPageName()}</h3>
      <div className="custom-table px-3">
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          size="middle"
          pagination={{
            onChange: (page) => setPage(page),
            pageSize: data?.data?.meta?.limit,
            total: data?.data?.meta?.total,
          }}
        />
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <RecentProductDetails
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          product={selectedProduct}
        />
      )}
    </ConfigProvider>
  );
}

export default RecentSellingProduct;
