import React from "react";
import { Modal, ConfigProvider, Descriptions, Avatar } from "antd";
import { getImageUrl } from "../../../components/common/ImageUrl";

function ProductDetailsModal({ isModalOpen, setIsModalOpen, record }) {
  console.log("ProductDetailsModal rendered with:", { isModalOpen, record });

  const handleCancel = () => {
    console.log("Modal cancel button clicked");
    setIsModalOpen(false);
  };

  // If no record is selected, don't render anything
  if (!record) {
    console.log("No record provided, returning null");
    return null;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#232323",
            headerBg: "#232323",
            titleColor: "#ffffff",
            titleFontSize: 24,
          },
          Descriptions: {
            labelColor: "#ffffff",
            contentColor: "#ffffff",
            titleColor: "#ffffff",
            titleMarginBottom: 16,
            borderColor: "#A3A3A3",
            itemPaddingBottom: 16,
          },
        },
      }}
    >
      <Modal
        open={isModalOpen}
        width={900}
        onCancel={handleCancel}
        footer={null}
        title="Product Details"
      >
        <div className="text-white py-4">
          <div className="flex items-center mb-6">
            {record?.productImg && (
              <Avatar
                shape="square"
                size={100}
                src={getImageUrl(record.productImg)}
                className="mr-4"
              />
            )}
            <h2 className="text-2xl font-bold">{record?.productName}</h2>
          </div>

          <Descriptions
            bordered
            column={2}
            className="product-details-table bg-slate-300 rounded-md "
            labelStyle={{ fontWeight: "bold" }}
          >
            {/* <Descriptions.Item
              label="ID"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?._id}
            </Descriptions.Item> */}
            {/* <Descriptions.Item
              label="User ID"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.userId}
            </Descriptions.Item> */}
            <Descriptions.Item
              label="Name"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.productName}
            </Descriptions.Item>
            <Descriptions.Item
              label="Price"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.productPrice}
            </Descriptions.Item>
            <Descriptions.Item
              label="Quantity"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.quantity}
            </Descriptions.Item>
            <Descriptions.Item
              label="Quality"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.quality}
            </Descriptions.Item>
            <Descriptions.Item
              label="Potency"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.productPotency}
            </Descriptions.Item>
            <Descriptions.Item
              label="Genetics"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.productGenetics}
            </Descriptions.Item>
            <Descriptions.Item
              label="Origin"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.productOrigin}
            </Descriptions.Item>
            <Descriptions.Item
              label="Type"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.productType}
            </Descriptions.Item>
            <Descriptions.Item
              label="Scent"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.productScent}
            </Descriptions.Item>
            <Descriptions.Item
              label="Description"
              span={2}
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.productDescription}
            </Descriptions.Item>
            <Descriptions.Item
              label="Mood Tags"
              span={2}
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.moodTag && record.moodTag.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item
              label="Created At"
              span={2}
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {record?.createdAt}
            </Descriptions.Item>
            {/* <Descriptions.Item
              label="Updated At"
              span={2}
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {new Date(record?.updatedAt).toLocaleString()}
            </Descriptions.Item> */}
          </Descriptions>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default ProductDetailsModal;
