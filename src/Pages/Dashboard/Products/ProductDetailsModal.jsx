import React from "react";
import { Modal, ConfigProvider, Descriptions, Avatar } from "antd";
import { getImageUrl } from "../../../components/common/ImageUrl";

function ProductDetailsModal({ isModalOpen, setIsModalOpen, product }) {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // If no product is selected, don't render anything
  if (!product) return null;

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
            {product?.image && product.image.length > 0 && (
              <Avatar
                shape="square"
                size={100}
                src={getImageUrl(product.image[0])}
                className="mr-4"
              />
            )}
            <h2 className="text-2xl font-bold">{product?.name}</h2>
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
              {product?._id}
            </Descriptions.Item> */}
            {/* <Descriptions.Item
              label="User ID"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {product?.userId}
            </Descriptions.Item> */}
            <Descriptions.Item
              label="Name"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {product?.name}
            </Descriptions.Item>
            <Descriptions.Item
              label="Price"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              ${product?.price}
            </Descriptions.Item>
            <Descriptions.Item
              label="Quantity"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {product?.quantity}
            </Descriptions.Item>
            <Descriptions.Item
              label="Quality"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {product?.quality}
            </Descriptions.Item>
            <Descriptions.Item
              label="Potency"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {product?.potency}
            </Descriptions.Item>
            <Descriptions.Item
              label="Genetics"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {product?.genetics}
            </Descriptions.Item>
            <Descriptions.Item
              label="Origin"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {product?.origin}
            </Descriptions.Item>
            <Descriptions.Item
              label="Type"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {product?.type}
            </Descriptions.Item>
            <Descriptions.Item
              label="Scent"
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {product?.scent}
            </Descriptions.Item>
            <Descriptions.Item
              label="Description"
              span={2}
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {product?.description}
            </Descriptions.Item>
            <Descriptions.Item
              label="Mood Tags"
              span={2}
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {product?.moodTag && product.moodTag.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item
              label="Created At"
              span={2}
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {new Date(product?.createdAt).toLocaleString()}
            </Descriptions.Item>
            {/* <Descriptions.Item
              label="Updated At"
              span={2}
              style={{ color: "#555d64", fontWeight: "bold" }}
            >
              {new Date(product?.updatedAt).toLocaleString()}
            </Descriptions.Item> */}
          </Descriptions>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default ProductDetailsModal;
