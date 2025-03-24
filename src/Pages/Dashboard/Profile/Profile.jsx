import React, { useState } from "react";
import man from "../../../assets/quiloco/man.png";
import { FaFeather } from "react-icons/fa6";
import { Button, ConfigProvider, Form, Input, Upload, message } from "antd";
import { HiMiniPencil } from "react-icons/hi2";

import { imageUrl } from "../../../redux/api/baseApi";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/apiSlices/profileSlice";
import Spinner from "../../../components/common/Spinner";

function Profile() {
  const [showButton, setShowButton] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { data: profile } = useProfileQuery();
  const user = profile?.data;

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
          <img
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : user?.image
                ? `${imageUrl}${user.image}`
                : man
            }
            width={120}
            height={120}
            className="border border-slate-500 rounded-full object-cover"
          />
          {showButton && (
            <Upload
              showUploadList={false}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("You can only upload image files!");
                  return Upload.LIST_IGNORE;
                }
                setUploadedImage(file);
                return false; // Prevent auto upload
              }}
            >
              <button>
                <FaFeather
                  size={30}
                  className="text-quilocoD absolute top-16 left-28 rounded-full bg-black p-1"
                />
              </button>
            </Upload>
          )}
          <h3 className="text-slate-50 text-xl mt-3">
            {user?.name || "Unknown User"}
          </h3>
        </div>
        <div className="w-full flex justify-end">
          <Button
            onClick={() => {
              setShowButton(!showButton);
              if (!showButton) setUploadedImage(null); // Reset image when canceling edit
            }}
            icon={
              showButton ? null : (
                <HiMiniPencil size={20} className="text-white" />
              )
            }
            className="bg-quilocoD/80 border-none text-white min-w-20 min-h-8 text-xs rounded-lg"
          >
            {showButton ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
        <ProfileDetails
          showButton={showButton}
          setShowButton={setShowButton}
          user={user}
          uploadedImage={uploadedImage}
        />
      </div>
    </ConfigProvider>
  );
}

export default Profile;

const ProfileDetails = ({ showButton, setShowButton, user, uploadedImage }) => {
  const [form] = Form.useForm();
  // const { updateUser } = useUser(); // Assuming there's an updateUser function
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // Reset form when user data changes or editing mode changes
  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        role: user.role,
      });
    }
  }, [user, form]);

  console.log("userss", user);

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();

      // Append the image file
      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }

      const data = {
        name: values.name,
        phoneNumber: values.phone,
      };

      // Append data as separate fields inside the "data" object
      // formData.append("data[name]", values.name); // data[name]
      formData.append("data", JSON.stringify(data)); // data[phoneNumber]

      // Log FormData content to check if it's correct
      for (let [key, value] of formData.entries()) {
        console.log(key, value); // Check the form data being sent
      }

      // Sending FormData with the mutation
      const response = await updateProfile(formData).unwrap();
      console.log(response);
      if (response.success) {
        message.success("Profile updated successfully!");
        setShowButton(false);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      message.error(error?.data?.message || "Failed to update profile.");
    }
  };

  if (isLoading) <Spinner />;
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
              value={user.role}
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
