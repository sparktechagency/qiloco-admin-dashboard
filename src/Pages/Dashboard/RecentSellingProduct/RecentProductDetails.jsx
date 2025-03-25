import React from "react";
import { Modal, ConfigProvider } from "antd";

function RecentProductDetails({ isModalOpen, setIsModalOpen, product }) {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Format date to match table format
  const formattedDate = product?.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(product.createdAt))
    : "N/A";

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
          Form: {
            labelColor: "#ffffff",
          },
        },
      }}
    >
      <Modal
        open={isModalOpen}
        width={500}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="w-full flex flex-col items-center my-8">
          <h1 className="w-full mb-8 flex items-center justify-center text-white text-2xl font-sans">
            Product Details
          </h1>
          {product && (
            <div className="flex flex-col items-center justify-center w-full h-24 gap-2">
              <div className="w-[80%] flex items-center justify-between">
                <p>Product ID: </p>
                <p>#{product._id}</p>
              </div>
              <div className="w-[80%] flex items-center justify-between">
                <p>Date: </p>
                <p>{formattedDate}</p> {/* Corrected Date Format */}
              </div>
              <div className="w-[80%] flex items-center justify-between">
                <p>Email: </p>
                <p>{product.email}</p>
              </div>
              <div className="w-[80%] flex items-center justify-between">
                <p>Transaction Amount: </p>
                <p>${product.totalPrice}</p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default RecentProductDetails;
