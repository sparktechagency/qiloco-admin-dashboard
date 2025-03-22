import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  ConfigProvider,
  message,
} from "antd";
import UploadComponent from "./UploadComponent";
import { useCreateProductMutation } from "../../../redux/apiSlices/productSlice";

function AddProductModal({ isModalOpen, setIsModalOpen }) {
  const [form] = Form.useForm();
  const [uploadedFiles, setUploadedFiles] = useState([]); // Store uploaded images
  const [focusedField, setFocusedField] = useState(null); // Track focused field
  const [resetCounter, setResetCounter] = useState(0); // Add a reset counter
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const data = {
    name: "",
    description: "",
    price: "",
    quality: "",
    quantity: "",
    moodTag: [],
    potency: "",
    genetics: "",
    origin: "",
    type: "",
    scent: "",
  };

  const resetForm = () => {
    form.resetFields(); // Reset all input fields
    setUploadedFiles([]); // Clear uploaded images
    setResetCounter((prev) => prev + 1); // Increment reset counter to trigger child component reset
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const onFinish = async (values) => {
    const formData = new FormData();

    // Append the 'image' as a single file
    if (uploadedFiles.length > 0) {
      formData.append("image", uploadedFiles[0]);
    }

    // Create the data object and append it to FormData
    const productData = {
      // name: values.productName,
      // description: values.productDescription,
      // price: values.productPrice,
      // quality: values.productQuality || "high",
      // quantity: values.productQuantity || 10,
      // potency: values.productPotency || "High",
      // genetics: values.productGenetics || "Indica-dominant",
      // origin: values.productOrigin || "California",
      // type: values.productType || "Hybrid",
      // scent: values.productScent || "Earthy",
      // moodTag: values.filterMood || [],

      name: values.productName,
      description: values.productDescription,
      price: values.productPrice,
      quality: values.productQuality, // Default quality if not provided
      quantity: values.productQuantity, // Default quantity if not provided
      potency: values.productPotency, // Default potency if not provided
      genetics: values.productGenetics, // Default genetics if not provided
      origin: values.productOrigin, // Default origin
      type: values.productType, // Default type
      scent: values.productScent, // Default scent
      moodTag: values.filterMood, // Assign the mood tags directly as an array
    };

    // Append the 'data' object to the FormData
    formData.append("data", JSON.stringify(productData));

    // Console log the FormData content (for debugging purposes)
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      // Send data to the server using the mutation
      const response = await createProduct(formData).unwrap();
      console.log(response);
      message.success("Product created successfully!");

      // Reset form and close modal after successful submission
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create product:", error);
      message.error("Failed to create product. Please try again.");
    }
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
            labelColor: "#efefef",
          },
          Select: {
            selectorBg: "black",
            activeOutlineColor: "grey",
            optionSelectedBg: "grey",
            multipleItemBorderColor: "grey",
            activeBorderColor: "grey",
            hoverBorderColor: "grey",
          },
          Input: {
            hoverBg: "black",
          },
        },
      }}
    >
      <Modal
        title="Add Product Details"
        open={isModalOpen}
        width={1000}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          className="flex flex-col"
          style={{ padding: 5, marginBlockStart: 15 }}
          onFinish={onFinish}
        >
          {/* Two Sections Side by Side */}
          <div className="flex gap-4">
            {/* Left Section */}
            <div className="w-1/2 bg-transparent rounded-md">
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[{ required: true, message: "Product Name required!" }]}
              >
                <Input
                  placeholder="Enter your product name"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productName" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productName")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>

              <Form.Item
                label="Product Descriptions"
                name="productDescription"
                rules={[
                  { required: true, message: "Product Description required!" },
                ]}
              >
                <Input.TextArea
                  placeholder="Write product description"
                  className="border-none"
                  style={{
                    background:
                      focusedField === "productDescription"
                        ? "#e8f0fd"
                        : "black",
                  }}
                  onFocus={() => setFocusedField("productDescription")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>

              <Form.Item
                label="Price"
                name="productPrice"
                rules={[{ required: true, message: "Product Price required!" }]}
              >
                <Input
                  placeholder="Enter your product price"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productPrice" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productPrice")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>
              <Form.Item
                label="Quality"
                name="productQuality"
                rules={[
                  { required: true, message: "Product Quality is required!" },
                ]}
              >
                <Select
                  defaultValue="high"
                  className="w-full h-9"
                  allowClear
                  options={[
                    {
                      value: "high",
                      label: "High",
                    },
                    {
                      value: "medium",
                      label: "Medium",
                    },
                  ]}
                  placeholder="select it"
                />
              </Form.Item>
              <Form.Item
                label="Quantity"
                name="productQuantity"
                rules={[
                  { required: true, message: "Product Quantity required!" },
                ]}
              >
                <Input
                  placeholder="2 pc"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productQuantity" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productQuantity")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>

              <Form.Item
                name="filterMood"
                label="Filter by mood [Tag]"
                rules={[
                  {
                    required: true,
                    message: "Please select Tags",
                    type: "array",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="[Tag]"
                  className="border-none"
                  style={{
                    background:
                      focusedField === "filterMood" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("filterMood")}
                  onBlur={() => setFocusedField(null)}
                >
                  <Select.Option value="Chill">Chill</Select.Option>
                  <Select.Option value="Soothing">Soothing</Select.Option>
                  <Select.Option value="Euphoric">Euphoric</Select.Option>
                  <Select.Option value="Creative">Creative</Select.Option>
                  <Select.Option value="Happy">Happy</Select.Option>
                  <Select.Option value="Sad">Sad</Select.Option>
                  <Select.Option value="Medium">Medium</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Potency" name="productPotency">
                <Input
                  placeholder="Enter your Product Potency"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productPotency" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productPotency")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>
            </div>

            {/* Right Section (Upload) */}
            <div className="w-1/2">
              <Form.Item
                label="Genetics"
                name="productGenetics"
                rules={[{ required: true, message: "Genetics required!" }]}
              >
                <Input
                  placeholder="Enter your Product Genetics"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productGenetics" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productGenetics")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>
              <Form.Item
                label="Origin"
                name="productOrigin"
                rules={[{ required: true, message: "Origin required!" }]}
              >
                <Input
                  placeholder="Enter your Product Origin"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productOrigin" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productOrigin")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>
              <Form.Item
                label="Type"
                name="productType"
                rules={[{ required: true, message: "Type required!" }]}
              >
                <Input
                  placeholder="Enter your Product Type"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productType" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productType")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>
              <Form.Item
                label="Scent"
                name="productScent"
                rules={[{ required: true, message: "Scent required!" }]}
              >
                <Input
                  placeholder="Enter your Product Scent"
                  className="border-none h-9"
                  style={{
                    background:
                      focusedField === "productScent" ? "#e8f0fd" : "black",
                  }}
                  onFocus={() => setFocusedField("productScent")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>
              <h5 className="text-[18px] text-[#efefef] font-normal mb-1 ">
                Product Gallery
              </h5>
              <UploadComponent
                onFileUpload={setUploadedFiles}
                resetTrigger={resetCounter}
              />
            </div>
          </div>

          {/* Full-Width Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full h-12 bg-quilocoD hover:bg-quilocoD/90 text-white text-[18px] font-medium rounded-lg"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default AddProductModal;
