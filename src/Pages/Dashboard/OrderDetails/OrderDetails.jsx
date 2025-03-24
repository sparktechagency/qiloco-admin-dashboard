import React, { useState, useEffect } from "react";
import {
  Table,
  Avatar,
  ConfigProvider,
  Spin,
  Alert,
  Menu,
  Dropdown,
  Button,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import OrderDetailsModal from "./OrderDetailsModal";
import {
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/apiSlices/orderSlice";
import { getImageUrl } from "../../../components/common/ImageUrl";

function OrderDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const { data: orderList, isError, isLoading } = useGetOrderQuery();
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  // Transform API response to table-friendly format
  useEffect(() => {
    if (orderList?.data?.orders) {
      setOrders(
        orderList.data.orders.map((order) => ({
          key: order._id,
          serial: order.orderNumber,
          productname: order.products[0]?.productName || "N/A",
          customername: order.customerName,
          date: new Date(order.createdAt).toLocaleDateString(),
          amount: `$${order.totalPrice.toFixed(2)}`,
          status: order.deliveryStatus
            ? order.deliveryStatus.charAt(0).toUpperCase() +
              order.deliveryStatus.slice(1)
            : "Unknown",
          pic: order.products[0]?.image
            ? getImageUrl(order.products[0].image)
            : "https://via.placeholder.com/50",
          fullData: order, // Store full order data for modal
        }))
      );
    }
  }, [orderList]);

  // Open modal and set selected order
  const showModal = (order) => {
    setSelectedOrder(order.fullData);
    setIsModalOpen(true);
  };

  // Handle order status update
  const handleStatusChange = async (key, newStatus) => {
    try {
      // Optimistically update UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.key === key ? { ...order, status: newStatus } : order
        )
      );

      // Update order status in backend
      await updateOrderStatus({ status: newStatus, id: key }).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // Table columns
  const columns = [
    { title: "Serial", dataIndex: "serial", key: "serial" },
    {
      title: "Product Name",
      dataIndex: "productname",
      key: "productname",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar shape="square" size="default" src={record.pic} />
          <span>{record.productname}</span>
        </div>
      ),
    },
    { title: "Customer Name", dataIndex: "customername", key: "customername" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <p
          className={`${
            record.status === "Delivered"
              ? "text-green-400"
              : record.status === "Pending"
              ? "text-yellow-400"
              : record.status === "Processing"
              ? "text-red-400"
              : "text-sky-400"
          }`}
        >
          {record.status}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const menu = (
          <Menu onClick={({ key }) => handleStatusChange(record.key, key)}>
            <Menu.Item key="pending">Pending</Menu.Item>
            <Menu.Item key="processing">Processing</Menu.Item>
            <Menu.Item key="cancel">Cancel</Menu.Item>
            <Menu.Item key="delivered">Delivered</Menu.Item>
          </Menu>
        );

        return (
          <div className="flex items-center gap-2">
            <Button
              className="bg-transparent text-white rounded-lg"
              onClick={() => showModal(record)}
            >
              View details
            </Button>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              className="w-24 rounded-lg"
            >
              <Button
                className="bg-transparent text-white rounded"
                icon={<DownOutlined />}
              >
                {record.status}
              </Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="px-3 py-4">
        {isLoading ? (
          <Spin size="large" className="flex justify-center mt-10" />
        ) : isError ? (
          <Alert message="Failed to load orders" type="error" showIcon />
        ) : (
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
            <Table
              dataSource={orders}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />
          </ConfigProvider>
        )}
      </div>
      {selectedOrder && (
        <OrderDetailsModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          data={selectedOrder}
        />
      )}
    </>
  );
}

export default OrderDetails;
