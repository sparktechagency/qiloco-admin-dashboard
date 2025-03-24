import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
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
      iframe: true, // Better performance
    }),
    []
  );

  // Load policy data when component mounts
  useEffect(() => {
    if (isSuccess && data?.data?.privacyPolicy) {
      const policyText =
        typeof data.data.privacyPolicy === "string"
          ? data.data.privacyPolicy
          : JSON.stringify(data.data.privacyPolicy);

      setContent(policyText);
    }
  }, [data, isSuccess]);

  // Show error messages
  useEffect(() => {
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
    }, 300), // Reduced debounce time for better responsiveness
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
      // Add logging to inspect the data being sent
      console.log("Sending data:", { privacyPolicy: content });

      const result = await updatePolicy({
        updatedData: { privacyPolicy: content },
      }).unwrap();

      console.log("API response:", result);
      message.success("Privacy policy updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      message.error(`Update failed: ${err.message || "Try again"}`);
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
        onChange={handleUpdate} // Changed from onBlur to onChange for immediate updates
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
