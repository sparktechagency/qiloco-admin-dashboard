import { Button, Form, Input, ConfigProvider } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/apiSlices/authSlice";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = new URLSearchParams(location.search).get("email");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = async (values) => {
    // const forgetOtpMatchToken = localStorage.getItem("forgetOtpMatchToken");
    const resetToken = localStorage.getItem("verifyToken"); // ✅ VerifyToken is sent as resetToken

    if (!email) {
      setErrorMessage("Email is missing. Please restart the process.");
      return;
    }
    // if (!forgetOtpMatchToken) {
    //   setErrorMessage("OTP verification token is missing. Please try again.");
    //   return;
    // }
    if (!resetToken) {
      setErrorMessage("Reset token is missing. Please try again.");
      return;
    }

    try {
      const response = await resetPassword(
        {
          email,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: { resetToken }, // ✅ Send resetToken in headers
        }
      ).unwrap();

      console.log("Password Reset Success:", response);
      navigate(`/auth/login`);
    } catch (err) {
      console.error("Reset Password Failed:", err?.data?.message || err);
      setErrorMessage(
        err?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-[25px] text-white font-semibold mb-6">
          Set a new password
        </h1>
        <p className="text-[#C0C7CA] text-[18px]">
          Create a new password. Ensure it differs
          <br /> from previous ones for security.
        </p>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelColor: "white",
            },
          },
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="newPassword"
            label={
              <p className="text-base font-normal text-white">New Password</p>
            }
            rules={[
              { required: true, message: "Please input your new Password!" },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input.Password
              placeholder="Enter new password"
              style={{
                border: "none",
                height: "52px",
                background: "#18191b",
                borderRadius: "8px",
                color: "white",
                outline: "none",
              }}
              className="mb-6"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={
              <p className="text-base text-white font-normal">
                Confirm Password
              </p>
            }
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Enter confirm password"
              style={{
                color: "white",
                border: "none",
                height: "52px",
                background: "#18191b",
                borderRadius: "8px",
                outline: "none",
              }}
              className="mb-6"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              htmlType="submit"
              style={{
                width: "100%",
                height: 45,
                color: "white",
                fontSize: "18px",
                border: "1px solid #a11d26",
                background: "#a11d26",
                marginTop: 20,
              }}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ResetPassword;
