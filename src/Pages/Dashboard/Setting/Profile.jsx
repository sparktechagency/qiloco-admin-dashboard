import React, { useState } from "react";
import man from "../../../assets/quiloco/man.png";
import { FaFeather } from "react-icons/fa6";
import { Button, ConfigProvider, Form, Input, Upload, message } from "antd";
import { HiMiniPencil } from "react-icons/hi2";
function Profile() {
  const [showButton, setShowButton] = useState(false);
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultActiveColor: "#ffffff",
              defaultActiveBorderColor: "#a11d26 ",
              defaultActiveBg: "#a11d26 ",
              defaultHoverBg: "#a11d26 ",
              defaultHoverColor: "#ffffff",
            },
          },
        }}
      >
        <div className="bg-quilocoP w-[50%] min-h-72 flex flex-col justify-start items-center px-4 rounded-lg">
          <div className="relative mt-6 flex flex-col items-center justify-center">
            <img
              src={man}
              width={120}
              height={120}
              className="border border-slate-500 rounded-full "
            />
            {showButton ? (
              <Upload
                onChange={(info) => {
                  if (info.file.status !== "uploading") {
                    console.log(info.file, info.fileList);
                  }
                  if (info.file.status === "done") {
                    message.success(
                      `${info.file.name} file uploaded successfully`
                    );
                  } else if (info.file.status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }}
              >
                <button>
                  <FaFeather
                    size={30}
                    className="text-quilocoD absolute top-16 left-28 rounded-full bg-black p-1"
                  />
                </button>
              </Upload>
            ) : null}

            <h3 className="text-slate-50 text-xl mt-3">Samuel Jackson</h3>
          </div>
          <div className="w-full flex justify-end">
            <Button
              onClick={() => setShowButton(!showButton)}
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
          />
        </div>
      </ConfigProvider>
    </>
  );
}

export default Profile;

const ProfileDetails = ({ showButton, setShowButton }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "#a11d26 ",
            defaultActiveBg: "#a11d26 ",
            defaultHoverBg: "#a11d26 ",
            defaultHoverColor: "#ffffff",
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
            colorBgBase: "black",
            colorBgContainer: "black",
            colorBgBaseHover: "black",
            activeBg: "black",
            colorBorder: "transparent",
            colorPrimaryBorder: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <Form layout="vertical" className="w-full">
        <div className="flex justify-between gap-2 w-full ">
          <Form.Item label="Name" className="w-full">
            <Input
              placeholder="Enter your name"
              className="bg-black border-none h-12 text-slate-300"
            />
          </Form.Item>
          <Form.Item label="Email" className="w-full">
            <Input
              placeholder="Enter your email"
              className="bg-black border-none h-12 text-slate-300"
            />
          </Form.Item>
        </div>
        <div className="flex justify-between gap-2 w-full 0">
          <Form.Item label="Phone" className="w-full">
            <Input
              placeholder="Enter your phone number"
              className="bg-black border-none h-12 text-slate-300 "
            />
          </Form.Item>
          <Form.Item label="Password" className="w-full">
            <Input.Password
              placeholder="Enter Password"
              className="bg-black border-none h-12 text-slate-300"
            />
          </Form.Item>
        </div>

        {showButton ? (
          <Form.Item>
            <Button
              block
              onClick={() => setShowButton(false)}
              className="bg-quilocoD/80 border-none text-white min-w-20 min-h-10 text-xs rounded-lg"
            >
              Save Changes
            </Button>
          </Form.Item>
        ) : null}
      </Form>
    </ConfigProvider>
  );
};
