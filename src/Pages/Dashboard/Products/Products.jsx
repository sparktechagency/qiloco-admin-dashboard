// import React, { useState } from "react";
// import { Table, Avatar, ConfigProvider, Input, message } from "antd";
// import { FiPlusCircle, FiEdit } from "react-icons/fi";
// import { IoEye, IoTrash } from "react-icons/io5";
// import { SearchOutlined } from "@ant-design/icons";

// import ProductDeleteModal from "./ProductDeleteModal";
// import {
//   useDeleteProductMutation,
//   useProductQuery,
//   useUpdateProductMutation,
// } from "../../../redux/apiSlices/productSlice";
// import { getImageUrl } from "../../../components/common/ImageUrl";
// import ProductModal from "./AddProductModal";
// import ProductDetailsModal from "./ProductDetailsModal";

// function ProductList() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [productNameToDelete, setProductNameToDelete] = useState("");
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [productToEdit, setProductToEdit] = useState(null);

//   const [deleteProduct] = useDeleteProductMutation();
//   const [updateProduct] = useUpdateProductMutation();

//   const { data, isLoading, isError } = useProductQuery();
//   const productList = data?.data?.products || [];

//   // Show Add Product Modal
//   const showModal = () => {
//     setIsEditMode(false);
//     setProductToEdit(null);
//     setIsModalOpen(true);
//   };

//   // Show Edit Product Modal
//   const showEditModal = (product) => {
//     // Make sure we're using the correct property names that match what ProductModal expects
//     setProductToEdit({
//       id: product._id,
//       name: product.productName,
//       description: product.productDescription,
//       price: parseFloat(product.productPrice.replace("$", "")),
//       quality: product.quality || "high",
//       quantity: product.quantity || "1",
//       potency: product.productPotency,
//       genetics: product.productGenetics,
//       origin: product.productOrigin,
//       type: product.productType,
//       scent: product.productScent,
//       moodTag: product.moodTag || [],
//       image: product.productImg,
//     });
//     setIsEditMode(true);
//     setIsModalOpen(true);
//   };

//   // Show Product Details Modal
//   const showDetailsModal = (product) => {
//     setSelectedProduct(product);
//     setIsDetailsModalOpen(true);
//   };

//   // Search filtering
//   const filteredData = productList.filter((item) =>
//     Object.entries(item).some(([key, value]) => {
//       if (key === "image" || key === "_id") return false;
//       if (!value) return false;
//       return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
//     })
//   );

//   // Format data for table
//   const dataSource = filteredData.map((item, index) => ({
//     ...item,
//     key: item._id,
//     serial: `#${index + 1}`,
//     productName: item.name,
//     productPotency: item.potency,
//     productPrice: `$${item.price.toFixed(2)}`,
//     productGenetics: item.genetics,
//     productOrigin: item.origin,
//     productType: item.type,
//     productScent: item.scent,
//     productDescription: item.description,
//     createdAt: new Date(item.createdAt).toLocaleString(),
//     productImg: item.image?.[0] || "https://via.placeholder.com/50",
//     moodTag: item.moodTag,
//     quality: item.quality,
//     quantity: item.quantity,
//   }));

//   // Handle delete action
//   const handleDelete = async () => {
//     try {
//       await deleteProduct({ id: productNameToDelete }).unwrap();
//       message.success(`Product deleted successfully.`);
//       setIsDeleteModalOpen(false);
//       setProductNameToDelete("");
//     } catch (error) {
//       message.error("Failed to delete product.");
//     }
//   };

//   // Handle cancel action for delete
//   const handleCancelDelete = () => {
//     setIsDeleteModalOpen(false);
//     setProductNameToDelete("");
//   };

//   return (
//     <div className="px-3 py-4">
//       <div className="text-white flex justify-between mb-4">
//         <ConfigProvider
//           theme={{
//             components: {
//               Input: {
//                 colorBgBase: "black",
//                 colorBgContainer: "black",
//                 colorBgBaseHover: "black",
//                 activeBg: "black",
//                 colorBorder: "transparent",
//                 colorPrimaryBorder: "transparent",
//                 boxShadow: "none",
//               },
//               Button: {
//                 defaultHoverBorderColor: "#a01d25",
//               },
//             },
//           }}
//         >
//           <Input
//             placeholder="Search here..."
//             className="w-1/3 bg-black border-none outline-none text-sm text-slate-300"
//             prefix={<SearchOutlined className="text-[#5e5e5e] text-lg pl-4" />}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </ConfigProvider>
//         <button
//           className="h-12 flex items-center justify-center gap-4 px-10 bg-quilocoP rounded-lg"
//           onClick={showModal}
//         >
//           <FiPlusCircle size={22} />
//           Add New Product
//         </button>
//       </div>

//       <ConfigProvider
//         theme={{
//           components: {
//             Table: {
//               headerBg: "#575858",
//               headerSplitColor: "none",
//               headerColor: "white",
//               borderColor: "#A3A3A3",
//               colorBgContainer: "#3a3a3a",
//               rowHoverBg: "#4a4a4a",
//               colorText: "white",
//             },
//             Button: {
//               defaultBg: "#a01d25",
//             },
//           },
//         }}
//       >
//         <div className="custom-table">
//           <Table
//             dataSource={dataSource}
//             columns={columns(
//               showDetailsModal,
//               showEditModal,
//               setIsDeleteModalOpen,
//               setProductNameToDelete
//             )}
//             pagination={true}
//             loading={isLoading}
//           />
//         </div>

//         {/* Pass both edit mode and update handler to ProductModal */}
//         <ProductModal
//           isModalOpen={isModalOpen}
//           setIsModalOpen={setIsModalOpen}
//           editProduct={isEditMode ? productToEdit : null}
//           isEditMode={isEditMode}
//           // onUpdate={handleProductUpdate}
//         />

//         <ProductDetailsModal
//           isModalOpen={isDetailsModalOpen}
//           setIsModalOpen={setIsDetailsModalOpen}
//           record={selectedProduct}
//         />

//         <ProductDeleteModal
//           isOpen={isDeleteModalOpen}
//           productName={productNameToDelete}
//           onDelete={handleDelete}
//           onCancel={handleCancelDelete}
//         />
//       </ConfigProvider>
//     </div>
//   );
// }

// export default ProductList;

// const columns = (
//   showDetailsModal,
//   showEditModal,
//   setIsDeleteModalOpen,
//   setProductNameToDelete
// ) => [
//   {
//     title: "Sl#",
//     dataIndex: "serial",
//     key: "serial",
//   },
//   {
//     title: "Product Name",
//     dataIndex: "productName",
//     key: "productName",
//     render: (_, record) => (
//       <div className="flex items-center gap-2">
//         <Avatar
//           shape="square"
//           size="default"
//           src={getImageUrl(record?.productImg)}
//         />
//         <span>{record.productName}</span>
//       </div>
//     ),
//   },
//   {
//     title: "Potency",
//     dataIndex: "productPotency",
//     key: "productPotency",
//   },
//   {
//     title: "Price",
//     dataIndex: "productPrice",
//     key: "productPrice",
//   },
//   {
//     title: "Genetics",
//     dataIndex: "productGenetics",
//     key: "productGenetics",
//   },
//   {
//     title: "Origin",
//     dataIndex: "productOrigin",
//     key: "productOrigin",
//   },
//   {
//     title: "Type",
//     dataIndex: "productType",
//     key: "productType",
//   },
//   {
//     title: "Scent",
//     dataIndex: "productScent",
//     key: "productScent",
//   },
//   // {
//   //   title: "Description",
//   //   dataIndex: "productDescription",
//   //   key: "productDescription",
//   // },
//   {
//     title: "Created At",
//     dataIndex: "createdAt",
//     key: "createdAt",
//   },
//   {
//     title: "Actions",
//     key: "action",
//     render: (_, record) => (
//       <div className="flex">
//         <button
//           className="hover:text-[#a11d26]"
//           onClick={() => showDetailsModal(record)}
//           title="View Details"
//         >
//           <IoEye size={24} />
//         </button>
//         <button
//           className="hover:text-[#a11d26]"
//           onClick={() => showEditModal(record)}
//           title="Edit Product"
//         >
//           <FiEdit size={24} className="ml-2" />
//         </button>
//         <button
//           className="hover:text-[#a11d26]"
//           onClick={() => {
//             setProductNameToDelete(record._id);
//             setIsDeleteModalOpen(true);
//           }}
//           title="Delete Product"
//         >
//           <IoTrash size={24} className="ml-2" />
//         </button>
//       </div>
//     ),
//   },
// ];

import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input, message } from "antd";
import { FiPlusCircle, FiEdit } from "react-icons/fi";
import { IoEye, IoTrash } from "react-icons/io5";
import { SearchOutlined } from "@ant-design/icons";

import ProductDeleteModal from "./ProductDeleteModal";
import {
  useDeleteProductMutation,
  useProductQuery,
  useUpdateProductMutation,
} from "../../../redux/apiSlices/productSlice";
import { getImageUrl } from "../../../components/common/ImageUrl";
import ProductModal from "./AddProductModal";
import ProductDetailsModal from "./ProductDetailsModal";

function ProductList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productNameToDelete, setProductNameToDelete] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const { data, isLoading, isError } = useProductQuery();
  console.log("Product data from API:", data);
  const productList = data?.data?.products || [];
  console.log("Processed product list:", productList);

  // Show Add Product Modal
  const showModal = () => {
    console.log("Opening Add Product Modal");
    setIsEditMode(false);
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  // Show Edit Product Modal
  const showEditModal = (product) => {
    console.log("Opening Edit Product Modal for:", product);
    // Make sure we're using the correct property names that match what ProductModal expects
    setProductToEdit({
      id: product._id,
      name: product.productName,
      description: product.productDescription,
      price: parseFloat(product.productPrice.replace("$", "")),
      quality: product.quality || "high",
      quantity: product.quantity || "1",
      potency: product.productPotency,
      genetics: product.productGenetics,
      origin: product.productOrigin,
      type: product.productType,
      scent: product.productScent,
      moodTag: product.moodTag || [],
      image: product.productImg,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // Show Product Details Modal
  const showDetailsModal = (product) => {
    console.log("showDetailsModal called with:", product);
    setSelectedProduct(product);
    console.log("selectedProduct set to:", product);
    setIsDetailsModalOpen(true);
    console.log("isDetailsModalOpen set to:", true);
  };

  // Search filtering
  const filteredData = productList.filter((item) =>
    Object.entries(item).some(([key, value]) => {
      if (key === "image" || key === "_id") return false;
      if (!value) return false;
      return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  // Format data for table
  const dataSource = filteredData.map((item, index) => ({
    ...item,
    key: item._id,
    serial: `#${index + 1}`,
    productName: item.name,
    productPotency: item.potency,
    productPrice: `$${item.price.toFixed(2)}`,
    productGenetics: item.genetics,
    productOrigin: item.origin,
    productType: item.type,
    productScent: item.scent,
    productDescription: item.description,
    createdAt: new Date(item.createdAt).toLocaleString(),
    productImg: item.image?.[0] || "https://via.placeholder.com/50",
    moodTag: item.moodTag,
    quality: item.quality,
    quantity: item.quantity,
  }));
  console.log("Formatted data source for table:", dataSource);

  // Handle delete action
  const handleDelete = async () => {
    try {
      await deleteProduct({ id: productNameToDelete }).unwrap();
      message.success(`Product deleted successfully.`);
      setIsDeleteModalOpen(false);
      setProductNameToDelete("");
    } catch (error) {
      message.error("Failed to delete product.");
    }
  };

  // Handle cancel action for delete
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setProductNameToDelete("");
  };

  return (
    <div className="px-3 py-4">
      <div className="text-white flex justify-between mb-4">
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorBgBase: "black",
                colorBgContainer: "black",
                colorBgBaseHover: "black",
                activeBg: "black",
                colorBorder: "transparent",
                colorPrimaryBorder: "transparent",
                boxShadow: "none",
              },
              Button: {
                defaultHoverBorderColor: "#a01d25",
              },
            },
          }}
        >
          <Input
            placeholder="Search here..."
            className="w-1/3 bg-black border-none outline-none text-sm text-slate-300"
            prefix={<SearchOutlined className="text-[#5e5e5e] text-lg pl-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </ConfigProvider>
        <button
          className="h-12 flex items-center justify-center gap-4 px-10 bg-quilocoP rounded-lg"
          onClick={showModal}
        >
          <FiPlusCircle size={22} />
          Add New Product
        </button>
      </div>

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
            Button: {
              defaultBg: "#a01d25",
            },
          },
        }}
      >
        <div className="custom-table">
          <Table
            dataSource={dataSource}
            columns={columns(
              showDetailsModal,
              showEditModal,
              setIsDeleteModalOpen,
              setProductNameToDelete
            )}
            pagination={true}
            loading={isLoading}
          />
        </div>

        {/* Pass both edit mode and update handler to ProductModal */}
        <ProductModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editProduct={isEditMode ? productToEdit : null}
          isEditMode={isEditMode}
          // onUpdate={handleProductUpdate}
        />

        <ProductDetailsModal
          isModalOpen={isDetailsModalOpen}
          setIsModalOpen={setIsDetailsModalOpen}
          record={selectedProduct}
        />

        <ProductDeleteModal
          isOpen={isDeleteModalOpen}
          productName={productNameToDelete}
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
        />
      </ConfigProvider>
    </div>
  );
}

export default ProductList;

const columns = (
  showDetailsModal,
  showEditModal,
  setIsDeleteModalOpen,
  setProductNameToDelete
) => [
  {
    title: "Sl#",
    dataIndex: "serial",
    key: "serial",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
    render: (_, record) => (
      <div className="flex items-center gap-2">
        <Avatar
          shape="square"
          size="default"
          src={getImageUrl(record?.productImg)}
        />
        <span>{record.productName}</span>
      </div>
    ),
  },
  {
    title: "Potency",
    dataIndex: "productPotency",
    key: "productPotency",
  },
  {
    title: "Price",
    dataIndex: "productPrice",
    key: "productPrice",
  },
  {
    title: "Genetics",
    dataIndex: "productGenetics",
    key: "productGenetics",
  },
  {
    title: "Origin",
    dataIndex: "productOrigin",
    key: "productOrigin",
  },
  {
    title: "Type",
    dataIndex: "productType",
    key: "productType",
  },
  {
    title: "Scent",
    dataIndex: "productScent",
    key: "productScent",
  },
  // {
  //   title: "Description",
  //   dataIndex: "productDescription",
  //   key: "productDescription",
  // },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Actions",
    key: "action",
    render: (_, record) => (
      <div className="flex">
        <button
          className="hover:text-[#a11d26]"
          onClick={() => {
            console.log("View button clicked with record:", record);
            showDetailsModal(record);
          }}
          title="View Details"
        >
          <IoEye size={24} />
        </button>
        <button
          className="hover:text-[#a11d26]"
          onClick={() => showEditModal(record)}
          title="Edit Product"
        >
          <FiEdit size={24} className="ml-2" />
        </button>
        <button
          className="hover:text-[#a11d26]"
          onClick={() => {
            setProductNameToDelete(record._id);
            setIsDeleteModalOpen(true);
          }}
          title="Delete Product"
        >
          <IoTrash size={24} className="ml-2" />
        </button>
      </div>
    ),
  },
];
