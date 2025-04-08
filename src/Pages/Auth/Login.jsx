import { Button, Checkbox, Form, Input, ConfigProvider, message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../redux/apiSlices/authSlice";
import Spinner from "../../components/common/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  // Retrieve saved email from localStorage
  const savedEmail = localStorage.getItem("savedEmail");

  const [form] = Form.useForm();

  // On component mount, set form fields if there is a saved email
  useEffect(() => {
    if (savedEmail) {
      form.setFieldsValue({
        email: savedEmail,
        remember: true, // Check the remember checkbox when email is pre-filled
      });
    }
  }, [savedEmail, form]);

  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      console.log("Login Success:", response);
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("Super", response?.data?.user?.role);

      // If "Remember me" is checked, save email in localStorage
      if (values.remember) {
        localStorage.setItem("savedEmail", values.email);
      } else {
        // Remove saved email if "Remember me" is not checked
        localStorage.removeItem("savedEmail");
      }

      // Navigate based on user role
      if (
        response?.data?.user?.role === "SUPER_ADMIN" ||
        response?.data?.user?.role === "ADMIN"
      ) {
        navigate("/");
      } else {
        message.error("Unauthorized People");
      }
    } catch (err) {
      message.error(err);
      console.error("Login Failed:", err);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] text-white font-semibold mb-6">
          Login to Admin
        </h1>
        <p className="text-[#A3A3A3]">
          Please enter your email and password to continue
        </p>
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorText: "white",
          },
        }}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label={
              <p className="text-white font-normal text-base">
                Enter Your Email
              </p>
            }
            rules={[
              {
                required: true,
                message: `Please Enter your email`,
              },
            ]}
          >
            <Input
              placeholder={`Enter Your email`}
              style={{
                height: 45,
                border: "none",
                outline: "none",
                boxShadow: "none",
                background: "#18191b",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<p className="text-white font-normal text-base">Password</p>}
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Enter your password"
              style={{
                height: 45,
                border: "none",
                outline: "none",
                boxShadow: "none",
                background: "#18191b",
              }}
            />
          </Form.Item>

          <div className="flex items-center justify-between">
            {/* <Form.Item
              style={{ marginBottom: 0 }}
              name="remember"
              valuePropName="checked"
            >
              <Checkbox className="text-[#A3A3A3]">Remember me</Checkbox>
            </Form.Item> */}

            <a
              className="login-form-forgot text-white hover:text-[#A3A3A3] font-semibold"
              href="/auth/forgot-password"
            >
              Forgot password
            </a>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <button
              htmlType="submit"
              type="submit"
              style={{
                width: "100%",
                height: 47,
                color: "white",
                fontWeight: "400px",
                fontSize: "18px",
                marginTop: 20,
              }}
              className="flex items-center justify-center bg-quilocoD hover:bg-quilocoD/90 rounded-lg text-base"
            >
              {isLoading ? <Spinner /> : "Sign in"}
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default Login;
