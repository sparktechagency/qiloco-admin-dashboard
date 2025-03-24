import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  ConfigProvider,
  Upload,
  Image,
  message,
  InputNumber,
} from "antd";
import { RiUploadCloud2Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../../redux/apiSlices/productSlice";
import { getImageUrl } from "../../../components/common/ImageUrl";

function ProductModal({ isModalOpen, setIsModalOpen, editProduct = null }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [focusedField, setFocusedField] = useState(null);

  // Get all mutations
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // Determine if we're in edit mode
  const isEditMode = !!editProduct;

  // Set form values when in edit mode
  useEffect(() => {
    if (isEditMode && editProduct) {
      // Populate form with existing product data
      form.setFieldsValue({
        productName: editProduct.name,
        productDescription: editProduct.description,
        productPrice: editProduct.price,
        productQuality: editProduct.quality,
        productQuantity: editProduct.quantity,
        productPotency: editProduct.potency,
        productGenetics: editProduct.genetics,
        productOrigin: editProduct.origin,
        productType: editProduct.type,
        productScent: editProduct.scent,
        filterMood: editProduct.moodTag,
      });

      // If there's an existing image, add it to fileList
      if (editProduct.image) {
        setFileList([
          {
            uid: "-1",
            name: "existing-image.jpg",
            status: "done",
            url: editProduct.image,
            // This is a flag to indicate this is an existing image
            isExisting: true,
          },
        ]);
      } else {
        setFileList([]);
      }
    } else {
      // Reset form when not in edit mode
      resetForm();
    }
  }, [editProduct, form, isEditMode]);

  const resetForm = () => {
    form.resetFields();
    setFileList([]);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Handle file change
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Handle file deletion
  const handleDelete = (file) => {
    const updatedList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedList);
  };

  // Validate file type (only jpeg and png)
  const beforeUpload = (file) => {
    const isImage = file.type === "image/jpeg" || file.type === "image/png";
    if (!isImage) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isImage;
  };

  const uploadButton = (
    <div className="text-[#575858] flex flex-col items-center justify-center">
      <RiUploadCloud2Line size={30} />
      <div className="mt-3 leading-4">
        Drop your image here, or browse
        <br /> Jpeg, PNG are allowed
      </div>
    </div>
  );

  const onFinish = async (values) => {
    try {
      // Log the raw form values directly from submission
      console.log("Raw form values from submission:", values);

      // Also log direct form values from form instance for comparison
      console.log(
        "Form values from form.getFieldsValue():",
        form.getFieldsValue(true)
      );

      const formData = new FormData();

      // Construct product data with updated values from the form submission
      const productData = {
        name: values.productName,
        description: values.productDescription,
        price: values.productPrice,
        quality: values.productQuality,
        quantity: values.productQuantity,
        potency: values.productPotency,
        genetics: values.productGenetics,
        origin: values.productOrigin,
        type: values.productType,
        scent: values.productScent,
        moodTag: values.filterMood,
      };

      // Log the constructed product data object
      console.log("Constructed productData object:", productData);

      // Handle image scenarios
      if (isEditMode) {
        console.log("Edit mode - current fileList:", fileList);

        if (fileList.length === 0) {
          // No image in fileList means user removed the existing image
          productData.keepExistingImage = false;
          console.log(
            "No images in fileList, setting keepExistingImage to false"
          );
        } else if (fileList[0].isExisting) {
          // Using existing image
          productData.keepExistingImage = true;
          console.log(
            "Using existing image, setting keepExistingImage to true"
          );
        } else {
          console.log("New image will be uploaded");
        }
      }

      // Append data as JSON string
      // formData.append("data", JSON.stringify(productData));
      formData.append("data", JSON.stringify(productData));

      // Log what's going into the FormData
      console.log(
        "JSON data being appended to FormData:",
        JSON.stringify(productData)
      );

      // Append image only if it's newly uploaded (not an existing one)
      if (
        fileList.length > 0 &&
        !fileList[0].isExisting &&
        fileList[0].originFileObj
      ) {
        formData.append("image", fileList[0].originFileObj);
        console.log("Image appended to FormData:", fileList[0].name);
      }

      // Log the FormData entries (this is tricky with FormData, so using a workaround)
      console.log("FormData keys:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[0] === "data" ? "(JSON data)" : pair[1]);
      }

      // Log final information before API call
      console.log(
        "About to make API call with id:",
        isEditMode ? editProduct.id : "new product"
      );
      console.log("Is update operation:", isEditMode);

      if (isEditMode) {
        // Update the product
        console.log("Calling updateProduct with id:", editProduct.id);

        const response = await updateProduct({
          id: editProduct.id,
          formData,
        }).unwrap();

        console.log("API response:", response);

        if (response.success) {
          message.success("Product updated successfully!");
        } else {
          message.error("Failed to update product. Please try again.");
        }
      } else {
        // Create a new product
        console.log("Calling createProduct");

        const response = await createProduct(formData).unwrap();
        console.log("API response:", response);

        message.success("Product created successfully!");
      }

      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} product:`,
        error
      );
      message.error(
        `Failed to ${
          isEditMode ? "update" : "create"
        } product. Please try again.`
      );
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
            colorBgBase: "black",
            colorBgContainer: "black",
            colorBgBaseHover: "black",
            activeBg: "black",
            colorBorder: "transparent",
            colorPrimaryBorder: "transparent",
            boxShadow: "none",
          },
          Button: {
            defaultHoverBg: "#a11d26",
            defaultBorderColor: "none",
            defaultHoverBorderColor: "none",
            defaultHoverColor: "#ffffff",
            defaultActiveBg: "#a11d26",
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "none",
          },
        },
      }}
    >
      <Modal
        title={isEditMode ? "Edit Product Details" : "Add Product Details"}
        open={isModalOpen}
        width={1000}
        onCancel={handleClose}
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
                  className={`border-none h-10 ${
                    isEditMode ? "text-black" : "text-white"
                  }`}
                  style={{
                    background: isEditMode ? "#f0f5ff" : "black",
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
                  className="border-none "
                  style={{
                    background: isEditMode ? "#f0f5ff" : "black",
                    color: isEditMode ? "black" : "white",
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
                  type="number"
                  placeholder="Enter your product price"
                  controls={false}
                  className="border-none h-10 w-full text-white flex items-center"
                  style={{
                    background: isEditMode ? "#f0f5ff" : "black",
                    colorText: isEditMode ? "black" : "white",
                  }}
                  onFocus={() => setFocusedField("productPrice")}
                  onBlur={() => setFocusedField(null)}
                />
                {/* <Input
                  type="number"
                  placeholder="Enter your product price"
                  controls={false} // Note: `controls` is not a valid prop for Ant Design Input
                  className="border-none h-9 w-full flex items-center"
                  style={{
                    background: isEditMode ? "#f0f5ff" : "black",
                    color: isEditMode ? "black" : "white",
                  }}
                  onFocus={() => setFocusedField("productPrice")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value)) {
                      setProductPrice(value); // Ensure the state only stores numbers
                    }
                  }}
                /> */}
              </Form.Item>

              <Form.Item
                label="Quality"
                name="productQuality"
                rules={[
                  { required: true, message: "Product Quality is required!" },
                ]}
              >
                <Select
                  className="w-full  flex items-center"
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
                  type="number"
                  placeholder="2 pc"
                  className={`border-none h-10 ${
                    isEditMode ? "text-black" : "text-white"
                  }`}
                  style={{
                    background: isEditMode ? "#f0f5ff" : "black",
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
                  className={`border-none h-10 ${
                    isEditMode ? "text-black" : "text-white"
                  }`}
                  style={{
                    background: isEditMode ? "#f0f5ff" : "black",
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
                  className={`border-none h-10 ${
                    isEditMode ? "text-black" : "text-white"
                  }`}
                  style={{
                    background: isEditMode ? "#f0f5ff" : "black",
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
                  className={`border-none h-10 ${
                    isEditMode ? "text-black" : "text-white"
                  }`}
                  style={{
                    background: isEditMode ? "#f0f5ff" : "black",
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
                  className={`border-none h-10 ${
                    isEditMode ? "text-black" : "text-white"
                  }`}
                  style={{
                    background: isEditMode ? "#f0f5ff" : "black",
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
                  className={`border-none h-10 mt-3 ${
                    isEditMode ? "text-black" : "text-white"
                  }`}
                  style={{
                    background: isEditMode ? "#f0f5ff" : "black",
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
                  className={`border-none h-10 ${
                    isEditMode ? "text-black" : "text-white"
                  }`}
                  style={{
                    background: isEditMode ? "#f0f5ff" : "black",
                  }}
                  onFocus={() => setFocusedField("productScent")}
                  onBlur={() => setFocusedField(null)}
                />
              </Form.Item>

              <h5 className="text-[18px] text-[#efefef] font-normal mb-1">
                Product Gallery
              </h5>
              <div>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  showUploadList={false} // Hide default upload list
                  beforeUpload={beforeUpload} // Apply file type validation
                  style={{ background: "black", color: "white" }}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>

                {/* Display Uploaded Images Below */}
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {fileList.map((file) => (
                    <div
                      key={file.uid}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="w-full flex justify-between border rounded-md p-1.5"
                    >
                      <Image
                        src={
                          file.isExisting
                            ? getImageUrl(file.url)
                            : getImageUrl(
                                URL.createObjectURL(file.originFileObj)
                              )
                        }
                        width={60}
                        height={60}
                        style={{ borderRadius: "5px", objectFit: "cover" }}
                      />
                      <p>{file.name}</p>
                      <Button
                        onClick={() => handleDelete(file)}
                        icon={<AiOutlineDelete size={30} />}
                        className="bg-transparent border-none text-gray-300"
                      ></Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex gap-4 mt-4">
            {/* Submit Button */}
            <Button
              htmlType="submit"
              loading={isCreating || isUpdating}
              className="w-full h-12 bg-quilocoD hover:bg-quilocoD/90 text-white text-[18px] font-medium rounded-lg"
            >
              {isEditMode ? "Save Changes" : "Add Product"}
            </Button>
          </div>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default ProductModal;
