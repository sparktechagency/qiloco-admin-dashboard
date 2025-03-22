import React from "react";
import { Modal, ConfigProvider } from "antd";
import dayjs from "dayjs";

function TransactionDetailsModal({ isModalOpen, setIsModalOpen, transaction }) {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        },
      }}
    >
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        width={500}
        footer={null}
      >
        <div className="w-full flex flex-col items-center my-8">
          <h1 className="w-full mb-8 flex items-center justify-center text-white text-2xl font-sans">
            Transaction Details
          </h1>
          {transaction ? (
            <div className="flex flex-col items-center justify-center w-full h-24 gap-2">
              <div className="w-[80%] flex items-center justify-between">
                <p>Transaction ID:</p>
                <p>{transaction.trnxid || "N/A"}</p>
              </div>
              <div className="w-[80%] flex items-center justify-between">
                <p>Date:</p>
                <p>{dayjs(transaction.createdAt).format("YYYY-MM-DD HH:mm")}</p>
              </div>
              <div className="w-[80%] flex items-center justify-between">
                <p>Email:</p>
                <p>{transaction.email}</p>
              </div>
              <div className="w-[80%] flex items-center justify-between">
                <p>Transaction Amount:</p>
                <p>${transaction.earning}</p>
              </div>
              <div className="w-[80%] flex items-center justify-between">
                <p>Status:</p>
                <p>{transaction.status || "N/A"}</p>
              </div>
            </div>
          ) : (
            <p className="text-white">No transaction details available.</p>
          )}
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default TransactionDetailsModal;
