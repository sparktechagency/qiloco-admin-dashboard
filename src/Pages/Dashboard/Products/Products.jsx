// import React, { useState } from "react";
// import { Table, Avatar, ConfigProvider, Input } from "antd";
// import { FiPlusCircle } from "react-icons/fi";
// import { IoEye } from "react-icons/io5";
// import AddProductModal from "./AddProductModal";
// import { SearchOutlined } from "@ant-design/icons"; // Corrected import
// import { useProductQuery } from "../../../redux/apiSlices/productSlice";
// import { imageUrl } from "../../../redux/api/baseApi";
// import { getImageUrl } from "../../../components/common/ImageUrl";

// function Products() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const {
//     data: product,
//     isLoading,
//     isFetching,
//     isError,
//     isSuccess,
//   } = useProductQuery();

//   // If data is not loaded, show an empty array or a fallback
//   const rawData = product?.data?.products || [];

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const columns = [
//     {
//       title: "SL#",
//       dataIndex: "serial",
//       key: "serial",
//       render: (text, record, index) => <>#{index + 1}</>,
//     },
//     {
//       title: "Product Name",
//       dataIndex: "name",
//       key: "name",
//       render: (_, record) => (
//         <div className="flex items-center gap-2">
//           <Avatar
//             shape="square"
//             size="default"
//             src={getImageUrl(record?.image[0])}
//           />
//           <span>{record.name}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Filter",
//       dataIndex: "quality",
//       key: "quality",
//     },
//     {
//       title: "Quantity",
//       dataIndex: "quantity",
//       key: "quantity",
//     },
//     {
//       title: "Filter by mood",
//       dataIndex: "moodTag",
//       key: "moodTag",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: () => (
//         <a href="#" className="hover:text-[#a11d26]">
//           <IoEye size={24} />
//         </a>
//       ),
//     },
//   ];

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Table: {
//             headerBg: "#575858",
//             headerSplitColor: "none",
//             headerColor: "white",
//             borderColor: "#A3A3A3",
//             colorBgContainer: "#3a3a3a",
//             rowHoverBg: "#4a4a4a",
//             colorText: "white",
//           },
//           Input: {
//             activeBg: "black",
//             hoverBg: "black",
//             hoverBorderColor: "white",
//             activeBorderColor: "#a11d26 ",
//           },
//         },
//       }}
//     >
//       <div className="px-3 py-4">
//         <div className="text-white flex justify-between mb-4">
//           <Input
//             placeholder="Search..."
//             className="w-64 bg-quilocoP text-white"
//             prefix={
//               <SearchOutlined style={{ fontSize: 20, marginRight: 15 }} />
//             }
//           />
//           <button
//             className="h-12 flex items-center justify-center gap-4 px-10 bg-quilocoP rounded-lg"
//             onClick={showModal}
//           >
//             <FiPlusCircle size={22} />
//             Add New Product
//           </button>
//         </div>

//         <div className="custom-table">
//           {/* Show all products directly */}
//           <Table
//             dataSource={rawData}
//             columns={columns}
//             pagination={true}
//             loading={isLoading || isFetching}
//             rowKey="_id" // Use _id as the unique key
//           />
//         </div>
//         <AddProductModal
//           isModalOpen={isModalOpen}
//           setIsModalOpen={setIsModalOpen}
//         />
//       </div>
//     </ConfigProvider>
//   );
// }

// export default Products;

import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input } from "antd";
import { FiPlusCircle } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import AddProductModal from "./AddProductModal";
import ProductDetailsModal from "./ProductDetailsModal"; // Import the ProductDetailsModal
import { SearchOutlined } from "@ant-design/icons";
import { useProductQuery } from "../../../redux/apiSlices/productSlice";
import { getImageUrl } from "../../../components/common/ImageUrl";

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: product,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useProductQuery();

  // If data is not loaded, show an empty array or a fallback
  const rawData = product?.data?.products || [];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showDetailsModal = (record) => {
    setSelectedProduct(record);
    setIsDetailsModalOpen(true);
  };

  const columns = [
    {
      title: "SL#",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, index) => <>#{index + 1}</>,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            shape="square"
            size="default"
            src={getImageUrl(record?.image[0])}
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Filter",
      dataIndex: "quality",
      key: "quality",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Filter by mood",
      dataIndex: "moodTag",
      key: "moodTag",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <a
          href="#"
          className="hover:text-[#a11d26]"
          onClick={(e) => {
            e.preventDefault();
            showDetailsModal(record);
          }}
        >
          <IoEye size={24} />
        </a>
      ),
    },
  ];

  return (
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
          Input: {
            activeBg: "black",
            hoverBg: "black",
            hoverBorderColor: "white",
            activeBorderColor: "#a11d26 ",
          },
        },
      }}
    >
      <div className="px-3 py-4">
        <div className="text-white flex justify-between mb-4">
          <Input
            placeholder="Search..."
            className="w-64 bg-quilocoP text-white"
            prefix={
              <SearchOutlined style={{ fontSize: 20, marginRight: 15 }} />
            }
          />
          <button
            className="h-12 flex items-center justify-center gap-4 px-10 bg-quilocoP rounded-lg"
            onClick={showModal}
          >
            <FiPlusCircle size={22} />
            Add New Product
          </button>
        </div>

        <div className="custom-table">
          {/* Show all products directly */}
          <Table
            dataSource={rawData}
            columns={columns}
            pagination={true}
            loading={isLoading || isFetching}
            rowKey="_id" // Use _id as the unique key
          />
        </div>
        <AddProductModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <ProductDetailsModal
          isModalOpen={isDetailsModalOpen}
          setIsModalOpen={setIsDetailsModalOpen}
          product={selectedProduct}
        />
      </div>
    </ConfigProvider>
  );
}

export default Products;
