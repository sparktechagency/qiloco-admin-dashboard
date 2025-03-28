import React, { useState } from "react";
import man from "../../../assets/quiloco/man.png";
import { FaFeather } from "react-icons/fa6";
import { Button, ConfigProvider, Form, Input, Upload, message } from "antd";
import { HiMiniPencil } from "react-icons/hi2";

import { imageUrl } from "../../../redux/api/baseApi";

import { useUser } from "../../../provider/User";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/apiSlices/profileSlice";

function Profile() {
  const { data: profile, isLoading } = useProfileQuery();
  const [showButton, setShowButton] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const user = profile?.data || {}; // Ensure user is always an object

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "#a11d26",
            defaultActiveBg: "#a11d26",
            defaultHoverBg: "#a11d26",
            defaultHoverColor: "#ffffff",
          },
        },
      }}
    >
      <div className="bg-quilocoP w-[50%] min-h-72 flex flex-col justify-start items-center px-4 rounded-lg">
        <div className="relative mt-6 flex flex-col items-center justify-center">
          {/* Image Wrapper */}
          <div className=" w-[120px]  h-[120px] overflow-hidden  rounded-full border border-slate-500">
            <img
              src={
                uploadedImage
                  ? URL.createObjectURL(uploadedImage)
                  : user?.image
                  ? `${imageUrl}${user.image}`
                  : man
              }
              className="w-full h-full object-cover"
            />
            {showButton && (
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  if (!file.type.startsWith("image/")) {
                    message.error("You can only upload image files!");
                    return Upload.LIST_IGNORE;
                  }
                  setUploadedImage(file);
                  return false;
                }}
              >
                <button className="absolute top-20 right-12 bg-black p-1 z-50 rounded-full">
                  <FaFeather size={24} className="text-quilocoD" />
                </button>
              </Upload>
            )}
          </div>
          <h3 className="text-slate-50 text-xl mt-3">
            {user?.name || "Administrator"}
          </h3>
        </div>
        <div className="w-full flex justify-end">
          <Button
            onClick={() => {
              setShowButton(!showButton);
              if (!showButton) setUploadedImage(null);
            }}
            icon={
              !showButton && <HiMiniPencil size={20} className="text-white" />
            }
            className="bg-quilocoD/80 border-none text-white min-w-20 min-h-8 text-xs rounded-lg"
          >
            {showButton ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {/* Show loading message while fetching data */}
        {!isLoading && user ? (
          <ProfileDetails
            showButton={showButton}
            setShowButton={setShowButton}
            user={user}
            uploadedImage={uploadedImage}
          />
        ) : (
          <p className="text-white">Loading profile...</p>
        )}
      </div>
    </ConfigProvider>
  );
}

export default Profile;

const ProfileDetails = ({
  showButton,
  setShowButton,
  user = {},
  uploadedImage,
}) => {
  const [form] = Form.useForm();
  const { updateUser } = useUser();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // Reset form when user data changes
  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phoneNumber || "",
        role: user?.role || "N/A",
      });
    }
  }, [user, form]);

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();

      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }

      const data = {
        name: values.name,
        phoneNumber: values.phone,
      };

      formData.append("data", JSON.stringify(data));

      const response = await updateProfile(formData).unwrap();
      if (response.success) {
        message.success("Profile updated successfully!");
        setShowButton(false);
        if (updateUser && response.data) {
          updateUser(response.data);
        }
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      message.error(error?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "#a11d26",
            defaultActiveBg: "#a11d26",
            defaultHoverBg: "#a11d26",
            defaultHoverColor: "#ffffff",
          },
          Form: {
            labelColor: "#efefef",
          },
          Input: {
            colorBgBase: "black",
            colorBgContainer: "black",
            colorBorder: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="w-full"
      >
        <div className="flex justify-between gap-2 w-full">
          <Form.Item
            name="name"
            label={<p className="ml-1.5">Name</p>}
            className="w-full"
          >
            <Input
              className="bg-black border-none h-12 text-slate-300"
              readOnly={!showButton}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={<p className="ml-1.5">Email</p>}
            className="w-full"
          >
            <Input
              className="bg-black border-none h-12 text-slate-300"
              readOnly
            />
          </Form.Item>
        </div>

        <div className="flex justify-between gap-2 w-full">
          <Form.Item
            name="phone"
            label={<p className="ml-1.5">Phone</p>}
            className="w-full"
          >
            <Input
              className="bg-black border-none h-12 text-slate-300"
              readOnly={!showButton}
            />
          </Form.Item>
          <Form.Item
            name="role"
            label={<p className="ml-1.5">Role</p>}
            className="w-full"
          >
            <Input
              readOnly
              value={user?.role || "N/A"}
              className="bg-black border-none h-12 text-slate-300"
            />
          </Form.Item>
        </div>

        {showButton && (
          <Form.Item>
            <Button
              block
              htmlType="submit"
              loading={isLoading}
              className="bg-quilocoD/80 border-none text-white min-w-20 min-h-10 text-xs rounded-lg"
            >
              Save Changes
            </Button>
          </Form.Item>
        )}
      </Form>
    </ConfigProvider>
  );
};
