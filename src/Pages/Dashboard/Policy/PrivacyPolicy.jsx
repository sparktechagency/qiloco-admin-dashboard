import React, { useRef, useState, useCallback, useMemo } from "react";
import JoditEditor from "jodit-react";
import { debounce } from "lodash";
import {
  usePolicyQuery,
  useUpdatePolicyMutation,
} from "../../../redux/apiSlices/policySlice";
import { message } from "antd";

function PrivacyPolicy() {
  const editor = useRef(null);
  const [content, setContent] = useState("Privacy Policy");
  const { data, isSuccess, isLoading, isError, error } = usePolicyQuery();
  const [updatePolicy, { isLoading: isUpdating, isError: updateError }] =
    useUpdatePolicyMutation();

  // Memoize editor configuration
  const editorConfig = useMemo(
    () => ({
      height: 500,
      theme: "dark",
      style: {
        background: "#000",
        color: "#ccc",
      },
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: true,
      toolbarSticky: true,
      enableDragAndDropFileToEditor: true,
      allowResizeX: false,
      allowResizeY: false,
      statusbar: false,
      // Reduced button count to improve performance
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "table",
        "link",
        "|",
        "left",
        "center",
        "right",
        "justify",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
      // Performance settings
      useSearch: false,
      spellcheck: false,
      iframe: true, // Changed to true for better performance
    }),
    []
  );

  // Load policy data when component mounts
  React.useEffect(() => {
    if (isSuccess && data?.data?.privacyPolicy) {
      const policyText =
        typeof data.data.privacyPolicy === "string"
          ? data.data.privacyPolicy
          : JSON.stringify(data.data.privacyPolicy);

      setContent(policyText);
    }
  }, [data, isSuccess]);

  // Show error messages
  React.useEffect(() => {
    if (isError && error) {
      message.error(error.message || "Failed to load privacy policy.");
    }
    if (updateError) {
      message.error("Failed to update privacy policy.");
    }
  }, [isError, error, updateError]);

  // Debounced content update function
  const debouncedUpdate = useCallback(
    debounce((newContent) => {
      setContent(newContent);
    }, 500),
    []
  );

  // Handle content update
  const handleUpdate = useCallback(
    (newContent) => {
      debouncedUpdate(newContent);
    },
    [debouncedUpdate]
  );

  // Handle save button click
  const handleSave = useCallback(async () => {
    try {
      await updatePolicy({ updatedData: { privacyPolicy: content } }).unwrap();
      message.success("Privacy policy updated successfully!");
    } catch (err) {
      message.error("Update failed! Try again.");
    }
  }, [updatePolicy, content]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-3 py-4">
      <JoditEditor
        ref={editor}
        value={content}
        onBlur={handleUpdate} // Using onBlur instead of onChange as in your example
        config={editorConfig}
      />
      <button
        className="w-full bg-quilocoD hover:bg-quilocoD/90 text-white text-[24px] rounded-lg h-12 my-4"
        onClick={handleSave}
        disabled={isUpdating}
      >
        {isUpdating ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default PrivacyPolicy;
