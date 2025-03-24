import React from "react";
import { Modal, Button, ConfigProvider } from "antd";

function ProductDeleteModal({ isOpen, productName, onDelete, onCancel }) {
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
          Button: {
            defaultBg: "#a01d25 ",
            defaultActiveBg: "#a01d25 ",
            defaultHoverBg: "#a01d25 ",
            defaultActiveHoverBg: "#a01d25 ",
            defaultBorderColor: "black",
            defaultHoverColor: "#ebecf0",
            defaultHoverBorderColor: "white",
            defaultColor: "#ffffff ",
          },
        },
      }}
    >
      <Modal
        title="Delete Product"
        visible={isOpen}
        onCancel={onCancel}
        footer={null} // Remove the default footer
      >
        <p>Are you sure you want to delete the product "{productName}"?</p>
        <div style={{ textAlign: "right" }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={onDelete}>Delete</Button>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default ProductDeleteModal;
