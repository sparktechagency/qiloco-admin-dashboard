import React from "react";
import { Form, Input, Card, Flex, ConfigProvider, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import ButtonEDU from "../../../components/common/ButtonEDU";
import { useChangePasswordMutation } from "../../../redux/apiSlices/authSlice";

function AdminPassword() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [form] = Form.useForm(); // Form instance

  // Handle cancel: Reset form fields
  const handleCancel = () => {
    form.resetFields(); // Reset form values
    form.setFields([]); // Clear validation messages
    message.info("Password change cancelled.");
  };

  // Handle save: Validate, trim, and submit form
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const trimmedValues = {
        currentPassword: values.currentPassword.trim(),
        newPassword: values.newPassword.trim(),
        confirmPassword: values.confirmPassword.trim(),
      };

      // Check if new password matches confirm password
      if (trimmedValues.newPassword !== trimmedValues.confirmPassword) {
        message.error("New password and confirm password do not match!");
        return;
      }

      // Call API mutation
      const response = await changePassword(trimmedValues).unwrap();

      message.success(response?.message || "Password updated successfully!");

      form.resetFields(); // Clear form after success
    } catch (error) {
      console.error("Password update failed:", error);
      message.error(error?.data?.message || "Failed to update password.");
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#a11d26",
            headerHeight: "30px",
            headerPadding: "5px",
          },
          token: {
            colorBgContainer: "black",
          },
        },
      }}
    >
      <Card
        title="Change Password"
        bordered={false}
        style={{ width: 850, height: 460 }}
        className="w-full h-full flex flex-col text-white shadow-[0px_10px_100px_3px_rgba(0,_0,_0,_0.1)]"
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
              },
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            className="h-auto flex flex-col items-center justify-evenly"
          >
            {/* Current Password */}
            <Form.Item
              label={<p className="text-white">Current Password</p>}
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password!",
                },
              ]}
              className="w-[80%]"
            >
              <Input.Password
                placeholder="Enter current password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="h-12 text-slate-50 hover:border-slate-300 focus:ring-0 focus:outline-none"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid #555",
                }}
              />
            </Form.Item>

            {/* New Password */}
            <Form.Item
              label={<p className="text-white">New Password</p>}
              name="newPassword"
              rules={[
                { required: true, message: "Please enter a new password!" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
                },
              ]}
              className="w-[80%]"
            >
              <Input.Password
                placeholder="Enter new password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="h-12 text-slate-50 hover:border-slate-300 focus:ring-0 focus:outline-none"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid #555",
                }}
              />
            </Form.Item>

            {/* Confirm New Password */}
            <Form.Item
              label={<p className="text-white">Confirm New Password</p>}
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
              className="w-[80%]"
            >
              <Input.Password
                placeholder="Confirm new password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="h-12 text-slate-50 hover:border-slate-300 focus:ring-0 focus:outline-none"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid #555",
                }}
              />
            </Form.Item>

            {/* Buttons: Cancel & Save */}
            <Flex justify="flex-end" className="w-[80%] gap-4">
              <ButtonEDU actionType="cancel" onClick={handleCancel} />
              <ButtonEDU
                actionType="save"
                onClick={handleSave}
                loading={isLoading}
              />
            </Flex>
          </Form>
        </ConfigProvider>
      </Card>
    </ConfigProvider>
  );
}

export default AdminPassword;
