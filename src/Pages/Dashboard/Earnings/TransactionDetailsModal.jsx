import React from "react";
import { Modal, ConfigProvider } from "antd";
import { SlCalender } from "react-icons/sl";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

function TransactionDetailsModal({ isModalOpen, setIsModalOpen }) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

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
          Form: {
            labelColor: "#ffffff",
          },
          Table: {},
        },
      }}
    >
      <Modal
        // title="View Details"
        open={isModalOpen}
        onOk={handleOk}
        width={500}
        height={1000}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="w-full flex flex-col items-center my-8">
          <h1 className="w-full mb-8 flex items-center justify-center text-white text-2xl font-sans">
            Transaction Details
          </h1>
          <div className="flex flex-col items-center justify-center w-full h-24 gap-2 ">
            <div className="w-[80%] flex items-center justify-between ">
              <p>Transaction ID: </p>
              <p>#12345678</p>
            </div>
            <div className="w-[80%] flex items-center justify-between  ">
              <p>Date: </p>
              <p>01-24-2024</p>
            </div>
            <div className="w-[80%] flex items-center justify-between  ">
              <p>Email: </p>
              <p>email@gmail.com</p>
            </div>

            <div className="w-[80%] flex items-center justify-between ">
              <p>Transaction amount: </p>
              <p>$260</p>
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default TransactionDetailsModal;
