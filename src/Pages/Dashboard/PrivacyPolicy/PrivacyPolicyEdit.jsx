import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "antd";
import {
  usePrivacyPolicyQuery,
  useUpdatePricyPolicyMutation,
} from "../../../redux/apiSlices/privacyPolicySlice";
import toast from "react-hot-toast";

const PrivacyPolicyEdit = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data: privacyPolicy, refetch } = usePrivacyPolicyQuery();
  const [updatePricyPolicy, { isLoading }] = useUpdatePricyPolicyMutation();

  const aboutDataSave = async () => {
    try {
      await updatePricyPolicy({ id: privacyPolicy?._id, description: content })
        .unwrap()
        .then(({ statusCode, status, message }) => {
          if (status) {
            toast.success(message);
            refetch();
          }
        });
    } catch ({ message }) {
      toast.error(message || "Something Wrong");
    }
  };

  useEffect(() => {
    setContent(privacyPolicy?.description);
  }, [privacyPolicy]);

  return (
    <div className="relative">
      <JoditEditor
        ref={editor}
        // value={content}
        value=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium totam voluptates blanditiis dicta facilis. Ratione neque delectus veniam quaerat soluta minus adipisci beatae similique sed quasi fugit ullam, minima itaque laudantium illo eveniet vero at aut omnis magnam sunt? Debitis sunt soluta sit pariatur quibusdam illum! Eos illum perferendis sit suscipit. Consequatur, ipsum sapiente quibusdam autem labore quasi esse delectus?"
        onChange={(newContent) => {
          setContent(newContent);
        }}
        config={{
          height: 300,
          theme: "default",
          allowResizeX: false,
          allowResizeY: false,
        }}
      />
      <Button
        onClick={aboutDataSave}
        block
        style={{
          marginTop: "150px",
          border: "none",
          backgroundColor: "#023F86",
          color: "#fff",
          height: "50px",
          width: "120px",
        }}
        className="absolute -bottom-60 left-0 text-base "
      >
        save
      </Button>
    </div>
  );
};

export default PrivacyPolicyEdit;
