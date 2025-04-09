import React from "react";
import { Modal, ConfigProvider, Table } from "antd";
import { SlCalender } from "react-icons/sl";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import man from "../../../assets/quiloco/man.png";
import paycard from "../../../assets/quiloco/icons/paycard.png";

const OrderDetailsModal = ({ isModalOpen, setIsModalOpen, data }) => {
  // Log the data to ensure it's passed correctly
  console.log("Modal data:", data);

  const handleCancel = () => setIsModalOpen(false);

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#353536",
            headerBg: "#353536",
            titleColor: "#ffffff",
            titleFontSize: 24,
          },
          Table: {
            headerBg: "#353536",
            colorText: "white",
            rowHoverBg: "#4a4a4a",
          },
        },
      }}
    >
      <Modal
        title="View Details"
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        <div className="flex justify-between mt-4">
          {/* Order Info */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-4 items-center text-white">
              <h3>Order ID: {data?.orderNumber || "No Order Number"}</h3>
              <div
                className={`${
                  data?.deliveryStatus === "processing"
                    ? "bg-amber-400"
                    : data?.deliveryStatus === "pending"
                    ? "bg-red-400"
                    : data?.deliveryStatus === "delivered"
                    ? "bg-green-400"
                    : "bg-sky-400"
                } w-fit px-3 py-1 rounded-sm text-white`}
              >
                {data?.deliveryStatus
                  ? data.deliveryStatus.charAt(0).toUpperCase() +
                    data.deliveryStatus.slice(1)
                  : "No Status"}
              </div>
            </div>
            <div className="flex gap-4 items-center text-white">
              <SlCalender />
              {data?.createdAt
                ? `${new Date(
                    data.createdAt
                  ).toLocaleDateString()} - ${new Date(
                    data.updatedAt
                  ).toLocaleDateString()}`
                : "No date information"}
            </div>
          </div>

          {/* Customer Info */}
          <div className="flex gap-4 items-start">
            <img
              src={man}
              alt="Customer"
              width={50}
              className="border rounded-lg"
            />
            <div>
              <h4 className="text-[20px] font-semibold text-green-400">
                Customer
              </h4>
              <p className="text-white">
                Full name: {data?.customerName || "N/A"}
              </p>
              <p className="text-white">Email: {data?.email || "N/A"}</p>
              <p className="text-white">Phone: {data?.phoneNumber || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Payment Info & Order Table */}
        <PaymentInfo data={data} />
        <OrderDetailsTable data={data} />
      </Modal>
    </ConfigProvider>
  );
};

export default OrderDetailsModal;

// Payment Info Component
const PaymentInfo = ({ data }) => (
  <div className="flex flex-col gap-2 my-3">
    <h5 className="text-lime-700 font-bold">Payment Info</h5>
    <div className="flex gap-3">
      <img src={paycard} alt="Card" />
      <p>
        {data?.paymentStatus === "paid"
          ? `Payment completed (${data.paymentIntentId || "No ID"})`
          : data?.paymentMethod || "Master Card **** **** 6557"}
      </p>
    </div>
  </div>
);

// Order Details Table Component
const OrderDetailsTable = ({ data }) => {
  const columns = [
    {
      title: "",
      dataIndex: "box",
      key: "box",
      render: () => <MdCheckBoxOutlineBlank size={25} />,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    { title: "Serial", dataIndex: "serial", key: "serial" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
  ];

  // Handle products data and ensure there's fallback
  const dataSource =
    data?.products?.map((product, index) => ({
      key: product.productId || index,
      productName: product.productName || "Unknown Product",
      serial: data?.orderNumber || "N/A",
      quantity: product.quantity || 0,
      amount: `$${product.totalPrice || 0}`,
    })) || [];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#353536",
            colorText: "white",
            rowHoverBg: "#4a4a4a",
            colorTextHeading: "white", // 👈 add this line
            headerSplitColor: "none",
          },
        },
      }}
    >
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          showHeader
          // bordered
        />
        <div className="w-full flex justify-end my-4 ">
          <div className="w-4/12 flex justify-between items-center ">
            <p className="text-amber-400  flex justify-between  w-[204px] mr-4 ">
              Total <span className="font-sans">${data?.totalPrice || 0}</span>
            </p>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
