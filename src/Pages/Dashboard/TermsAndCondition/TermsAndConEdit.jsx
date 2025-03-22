import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Button } from "antd";
import {
  useTermsAndConditionQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../../redux/apiSlices/termsAndConditionSlice";

import toast from "react-hot-toast";

const TermsAndConditionEdit = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data: termsAndCondition, refetch } = useTermsAndConditionQuery();
  const [updateTermsAndConditions] = useUpdateTermsAndConditionsMutation();

  const aboutDataSave = async () => {
    try {
      await updateTermsAndConditions({
        id: termsAndCondition?._id,
        description: content,
      })
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
    setContent(termsAndCondition?.description);
  }, [termsAndCondition]);

  return (
    <div className="relative">
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => {
          setContent(newContent);
        }}
        config={{
          height: 300,
          allowResizeX: false,
          allowResizeY: false,
        }}
      />
      <Button
        onClick={aboutDataSave}
        // block
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

export default TermsAndConditionEdit;
