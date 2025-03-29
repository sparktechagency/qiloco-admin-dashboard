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
  message,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import OrderDetailsModal from "./OrderDetailsModal";
import {
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/apiSlices/orderSlice";
import { getImageUrl } from "../../../components/common/ImageUrl";
import Loading from "../../../components/common/Loading";

function OrderDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [page, setPage] = useState(1);
  const { data: orderList, isError, isLoading } = useGetOrderQuery(page);
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  console.log("Order Details", orderList);
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

  const handleStatusChange = async (key, newStatus) => {
    try {
      // Set the order being updated
      setUpdatingOrderId(key);

      // Update order status in backend
      const response = await updateOrderStatus({
        status: newStatus,
        id: key,
      }).unwrap();

      if (response.success === true) {
        // Success message
        message.success(`Order status updated to ${newStatus} successfully`);

        // Update UI after successful backend update
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.key === key
              ? {
                  ...order,
                  status:
                    newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
                }
              : order
          )
        );
      } else {
        // Error message if backend returns non-success response
        message.error(response.message || "Failed to update order status");
      }
    } catch (error) {
      // Error message for network or unexpected errors
      console.error("Failed to update status:", error);
      message.error(
        error.data?.message ||
          "An error occurred while updating order status. Please try again."
      );
    } finally {
      // Reset updating state
      setUpdatingOrderId(null);
    }
  };

  // Table columns
  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, index) => <>#{index + 1}</>,
    },
    {
      title: "Product Name",
      dataIndex: "productname",
      key: "productname",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {/* <Avatar shape="square" size="default" src={record.pic} /> */}
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
            <Menu.Item key="pending">
              {updatingOrderId === record.key && isUpdating ? (
                <Spin size="small" />
              ) : (
                "Pending"
              )}
            </Menu.Item>
            <Menu.Item key="processing">
              {updatingOrderId === record.key && isUpdating ? (
                <Spin size="small" />
              ) : (
                "Processing"
              )}
            </Menu.Item>

            <Menu.Item key="delivered">
              {updatingOrderId === record.key && isUpdating ? (
                <Spin size="small" />
              ) : (
                "Delivered"
              )}
            </Menu.Item>
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

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="px-3 py-4">
        {isLoading ? (
          <Spin size="large" className="flex justify-center mt-10" />
        ) : isError ? (
          <Alert
            message="Failed to load orders"
            description="Unable to retrieve order information. Please try refreshing the page."
            type="error"
            showIcon
          />
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
            <div className="custom-table">
              <Table
                dataSource={orders}
                columns={columns}
                size="middle"
                pagination={{
                  onChange: (page) => setPage(page),
                  pageSize: orderList?.data?.pagination?.limit,
                  total: orderList?.data?.pagination?.total,
                }}
              />
            </div>
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
