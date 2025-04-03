import React from "react";
import { Modal, ConfigProvider } from "antd";

function InquiryDetailsModal({ isModalOpen, setIsModalOpen, transaction }) {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#181818",
            headerBg: "#202020",
            titleColor: "#ffffff",
            titleFontSize: 20,
          },
        },
      }}
    >
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        width={550}
        footer={null}
        centered
        className="custom-modal"
      >
        <div className="flex flex-col items-center p-6">
          <h1 className="text-2xl font-semibold text-white mb-4">
            Inquiry Details
          </h1>
          <div className="w-full bg-[#202020] p-4 rounded-lg shadow-md border border-gray-700">
            {transaction ? (
              <div className="flex flex-col gap-3">
                <DetailItem label="Name" value={transaction.name} />
                <DetailItem label="Email" value={transaction.email} />
                <DetailItem label="Phone" value={transaction.phone} />
                <DetailItem
                  label="Date"
                  value={
                    transaction.createdAt
                      ? new Date(transaction.createdAt).toLocaleString()
                      : "N/A"
                  }
                />
                <DetailItem
                  label="Message"
                  value={transaction.message}
                  isMessage
                />
              </div>
            ) : (
              <p className="text-gray-300 text-center">
                No inquiry details available.
              </p>
            )}
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

// Reusable component for styling inquiry details
const DetailItem = ({ label, value, isMessage }) => {
  return (
    <div className="flex justify-between border-b border-gray-700 pb-2">
      <p className="text-gray-400 font-medium">{label}:</p>
      <p
        className={`text-white ${
          isMessage ? "text-sm max-w-[70%] text-right" : ""
        }`}
      >
        {value || "N/A"}
      </p>
    </div>
  );
};

export default InquiryDetailsModal;
