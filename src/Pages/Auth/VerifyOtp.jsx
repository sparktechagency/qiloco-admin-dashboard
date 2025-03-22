import { Button, Form, Typography } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useOtpVerifyMutation,
  useForgotPasswordMutation,
} from "../../redux/apiSlices/authSlice";

const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const [otp, setOtp] = useState("");
  const [otpVerify, { isLoading }] = useOtpVerifyMutation();
  const [forgotPassword, { isLoading: resendLoading }] =
    useForgotPasswordMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const handleOtpChange = (value) => {
    console.log("Current OTP input:", value);
    setOtp(value);
  };

  const onFinish = async () => {
    console.log("Raw OTP string:", otp);

    if (otp.length !== 4) {
      setErrorMessage("OTP must be 4 digits");
      return;
    }

    if (!email) {
      setErrorMessage("Email is missing. Please try again.");
      return;
    }

    try {
      const response = await otpVerify({
        email,
        oneTimeCode: Number(otp), // ✅ Convert OTP to number before sending
      }).unwrap();

      console.log("OTP Verification Success:", response);

      if (response?.success) {
        localStorage.setItem("verifyToken", response?.data?.verifyToken);
        navigate(`/auth/reset-password?email=${email}`);
      } else {
        setErrorMessage(response?.message || "OTP verification failed.");
      }
    } catch (err) {
      console.error("OTP Verification Failed:", err?.data?.message || err);
      setErrorMessage(
        err?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  const handleResendEmail = async () => {
    if (!email) {
      setErrorMessage("Email is missing. Cannot resend OTP.");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      console.log("OTP Resent Successfully");
      setErrorMessage(""); // Clear previous errors
    } catch (err) {
      console.error("OTP Resend Failed:", err?.data?.message || err);
      setErrorMessage(err?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-[25px] text-white font-semibold mb-6">
          Verify OTP
        </h1>
        <p className="w-[80%] mx-auto text-[#A3A3A3]">
          We'll send a verification code to your email. Check your inbox and
          enter the code here.
        </p>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
      )}

      <Form layout="vertical" onFinish={onFinish}>
        <div className="flex items-center justify-center mb-6">
          <OTPInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={4} // OTP length fixed to 4
            inputStyle={{
              height: 50,
              width: 50,
              background: "black",
              borderRadius: "8px",
              margin: "16px",
              fontSize: "20px",
              border: "1px solid #a11d26",
              color: "white",
              outline: "none",
              marginBottom: 10,
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <Text className="text-[#A3A3A3]">Didn't receive the code?</Text>

          <p
            onClick={handleResendEmail}
            className="login-form-forgot font-medium cursor-pointer"
            style={{
              opacity: resendLoading ? 0.6 : 1,
              pointerEvents: resendLoading ? "none" : "auto",
            }}
          >
            {resendLoading ? "Resending..." : "Resend"}
          </p>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            htmlType="submit"
            style={{
              width: "100%",
              height: 45,
              border: "1px solid #a11d26",
              outline: "none",
              boxShadow: "none",
              background: "#a11d26",
              color: "white",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
