// import { Button, Form, Input, ConfigProvider } from "antd";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useForgotPasswordMutation } from "../../redux/apiSlices/authSlice";

// const ForgotPassword = () => {
//   const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
//   const navigate = useNavigate();

//   const onFinish = async (values) => {
//     console.log("Submitting email:", values.email);
//     try {
//       const response = await forgotPassword({ email: values.email }).unwrap();
//       console.log("Forgot Password Success:", response);
//       localStorage.setItem("forgetToken", response.data.forgetToken);
//       navigate(`/auth/verify-otp?email=${values.email}`);
//       // navigate(`/auth/verify-otp`);
//     } catch (err) {
//       console.error("Forgot Password Error:", err);
//     }
//   };

//   return (
//     <div>
//       <div className="text-center mb-8">
//         <h1 className="text-[25px] text-white font-semibold mb-6">
//           Forgot Password
//         </h1>
//         <p className="w-[90%] text-[#C0C7CA] mx-auto text-base">
//           Enter your email below to reset your password
//         </p>
//       </div>

//       <ConfigProvider
//         theme={{
//           token: {
//             colorText: "white",
//           },
//         }}
//       >
//         <Form layout="vertical" onFinish={onFinish}>
//           <Form.Item
//             label={<p className="text-base text-white font-normal">Email</p>}
//             name="email"
//             id="email"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your email!",
//               },
//             ]}
//           >
//             <Input
//               placeholder="Enter your email address"
//               style={{
//                 height: 45,
//                 // border: "1px solid #d9d9d9",
//                 border: "none",
//                 outline: "none",
//                 boxShadow: "none",
//                 background: "#18191b",
//               }}
//             />
//           </Form.Item>

//           <Form.Item>
//             <button
//               htmlType="submit"
//               type="submit"
//               style={{
//                 width: "100%",
//                 height: 45,
//                 color: "white",
//                 fontWeight: "400px",
//                 fontSize: "18px",

//                 marginTop: 20,
//               }}
//               className="flex items-center justify-center bg-quilocoD hover:bg-quilocoD/90 rounded-lg"
//             >
//               Send Code
//             </button>
//           </Form.Item>
//         </Form>
//       </ConfigProvider>
//     </div>
//   );
// };

// export default ForgotPassword;

import { Button, Form, Input, ConfigProvider } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/apiSlices/authSlice";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Submitting email:", values.email);
    try {
      const response = await forgotPassword({ email: values.email }).unwrap();
      console.log("Forgot Password Success:", response);
      localStorage.setItem("forgetToken", response?.data?.forgetToken);
      navigate(`/auth/verify-otp?email=${values.email}`);
    } catch (err) {
      console.error("Forgot Password Error:", err?.data?.message || err);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] text-white font-semibold mb-6">
          Forgot Password
        </h1>
        <p className="w-[90%] text-[#C0C7CA] mx-auto text-base">
          Enter your email below to reset your password
        </p>
      </div>

      <ConfigProvider
        theme={{
          token: {
            colorText: "white",
          },
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<p className="text-base text-white font-normal">Email</p>}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email address"
              style={{
                height: 45,
                border: "none",
                outline: "none",
                boxShadow: "none",
                background: "#18191b",
              }}
            />
          </Form.Item>

          <Form.Item>
            <button
              htmlType="submit"
              type="submit"
              style={{
                width: "100%",
                height: 45,
                color: "white",
                fontWeight: "400px",
                fontSize: "18px",
                marginTop: 20,
              }}
              className="flex items-center justify-center bg-quilocoD hover:bg-quilocoD/90 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Code"}
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ForgotPassword;
