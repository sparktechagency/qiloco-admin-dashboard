// import React from "react";
// import { Modal, ConfigProvider, Descriptions, Avatar } from "antd";
// import { getImageUrl } from "../../../components/common/ImageUrl";

// function ProductDetailsModal({ isModalOpen, setIsModalOpen, record }) {
//   console.log("ProductDetailsModal rendered with:", { isModalOpen, record });

//   const handleCancel = () => {
//     console.log("Modal cancel button clicked");
//     setIsModalOpen(false);
//   };

//   // If no record is selected, don't render anything
//   if (!record) {
//     console.log("No record provided, returning null");
//     return null;
//   }

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Modal: {
//             contentBg: "#232323",
//             headerBg: "#232323",
//             titleColor: "#ffffff",
//             titleFontSize: 24,
//           },
//           Descriptions: {
//             labelColor: "#ffffff",
//             contentColor: "#ffffff",
//             titleColor: "#ffffff",
//             titleMarginBottom: 16,
//             borderColor: "#A3A3A3",
//             itemPaddingBottom: 16,
//           },
//         },
//       }}
//     >
//       <Modal
//         open={isModalOpen}
//         centered
//         width={900}
//         onCancel={handleCancel}
//         footer={null}
//         title="Product Details"
//       >
//         <div className="text-white py-4">
//           <div className="flex items-center mb-6">
//             {record?.productImg && (
//               <Avatar
//                 shape="square"
//                 size={100}
//                 src={getImageUrl(record.productImg)}
//                 className="mr-4"
//               />
//             )}
//             <h2 className="text-2xl font-bold">{record?.productName}</h2>
//           </div>

//           <Descriptions
//             bordered
//             column={2}
//             className="product-details-table bg-slate-300 rounded-md "
//             labelStyle={{ fontWeight: "bold" }}
//           >
//             <Descriptions.Item label="Name" style={{ color: "#555d64" }}>
//               {record?.productName}
//             </Descriptions.Item>
//             <Descriptions.Item label="Price" style={{ color: "#555d64" }}>
//               {record?.productPrice}
//             </Descriptions.Item>
//             <Descriptions.Item label="Quantity" style={{ color: "#555d64" }}>
//               {record?.quantity}
//             </Descriptions.Item>
//             <Descriptions.Item label="Quality" style={{ color: "#555d64" }}>
//               {record?.quality}
//             </Descriptions.Item>
//             <Descriptions.Item label="Potency" style={{ color: "#555d64" }}>
//               {record?.productPotency}
//             </Descriptions.Item>
//             <Descriptions.Item label="Genetics" style={{ color: "#555d64" }}>
//               {record?.productGenetics}
//             </Descriptions.Item>
//             <Descriptions.Item label="Origin" style={{ color: "#555d64" }}>
//               {record?.productOrigin}
//             </Descriptions.Item>
//             <Descriptions.Item label="Type" style={{ color: "#555d64" }}>
//               {record?.productType}
//             </Descriptions.Item>
//             <Descriptions.Item label="Scent" style={{ color: "#555d64" }}>
//               {record?.productScent}
//             </Descriptions.Item>

//             <Descriptions.Item
//               label="Mood Tags"
//               span={2}
//               style={{ color: "#555d64" }}
//             >
//               {record?.moodTag && record.moodTag.join(", ")}
//             </Descriptions.Item>
//             <Descriptions.Item label="Date" style={{ color: "#555d64" }}>
//               {new Date(record?.createdAt).toLocaleDateString()}
//             </Descriptions.Item>

//             <Descriptions.Item label="Time" style={{ color: "#555d64" }}>
//               {new Date(record?.createdAt).toLocaleTimeString()}
//             </Descriptions.Item>

//             <Descriptions.Item
//               label="Description"
//               span={2}
//               style={{
//                 color: "#555d64",
//                 whiteSpace: "pre-wrap",
//                 wordBreak: "break-word",
//                 maxHeight: "50px", // Set the max height
//                 overflowY: "auto", // Make it scrollable vertically
//               }}
//             >
//               {record?.productDescription}
//             </Descriptions.Item>
//           </Descriptions>
//         </div>
//       </Modal>
//     </ConfigProvider>
//   );
// }

// export default ProductDetailsModal;

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

  // Custom style for the description field to make it scrollable
  const descriptionStyle = {
    color: "#555d64",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    maxHeight: "150px", // Set a specific max height
    overflowY: "auto", // Make it scrollable vertically
    width: "100%", // Use full width of the container
    padding: "10px",
    // border: "1px solid #444",
    borderRadius: "4px",
    backgroundColor: "transparent",
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
        centered
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
            className="product-details-table bg-slate-300 rounded-md"
            labelStyle={{ fontWeight: "bold" }}
          >
            <Descriptions.Item label="Name" style={{ color: "#555d64" }}>
              {record?.productName}
            </Descriptions.Item>
            <Descriptions.Item label="Price" style={{ color: "#555d64" }}>
              {record?.productPrice}
            </Descriptions.Item>
            <Descriptions.Item label="Quantity" style={{ color: "#555d64" }}>
              {record?.quantity}
            </Descriptions.Item>
            <Descriptions.Item label="Quality" style={{ color: "#555d64" }}>
              {record?.quality}
            </Descriptions.Item>
            <Descriptions.Item label="Potency" style={{ color: "#555d64" }}>
              {record?.productPotency}
            </Descriptions.Item>
            <Descriptions.Item label="Genetics" style={{ color: "#555d64" }}>
              {record?.productGenetics}
            </Descriptions.Item>
            <Descriptions.Item label="Origin" style={{ color: "#555d64" }}>
              {record?.productOrigin}
            </Descriptions.Item>
            <Descriptions.Item label="Type" style={{ color: "#555d64" }}>
              {record?.productType}
            </Descriptions.Item>
            <Descriptions.Item label="Scent" style={{ color: "#555d64" }}>
              {record?.productScent}
            </Descriptions.Item>

            <Descriptions.Item
              label="Mood Tags"
              span={2}
              style={{ color: "#555d64" }}
            >
              {record?.moodTag && record.moodTag.join(", ")}
            </Descriptions.Item>
            <Descriptions.Item label="Date" style={{ color: "#555d64" }}>
              {new Date(record?.createdAt).toLocaleDateString()}
            </Descriptions.Item>

            <Descriptions.Item label="Time" style={{ color: "#555d64" }}>
              {new Date(record?.createdAt).toLocaleTimeString()}
            </Descriptions.Item>

            <Descriptions.Item label="Description" span={2}>
              <div
                style={descriptionStyle}
                className="[&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
              >
                {record?.productDescription}
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default ProductDetailsModal;
