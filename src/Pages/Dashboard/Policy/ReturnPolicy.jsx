import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import JoditEditor from "jodit-react";
import { message } from "antd";
import { debounce } from "lodash";
import {
  usePolicyQuery,
  useUpdatePolicyMutation,
} from "../../../redux/apiSlices/policySlice";

function ReturnPolicy() {
  const editor = useRef(null);
  const [content, setContent] = useState("Loading Policy...");
  const { data, isSuccess, isLoading, isError, error } = usePolicyQuery();
  const [updatePolicy, { isLoading: isUpdating, isError: updateError }] =
    useUpdatePolicyMutation();

  // Memoize editor configuration to prevent unnecessary re-renders
  const editorConfig = useMemo(
    () => ({
      theme: "dark",
      style: {
        background: "#000",
        color: "#ccc",
        maxHeight: "600px", // Set a max height
        overflowY: "auto", // Enable vertical scrolling
      },

      statusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: true,
      toolbarSticky: true,
      enableDragAndDropFileToEditor: true,
      allowResizeX: false,
      allowResizeY: false,
      scrollY: true,
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
      useSearch: false,
      spellcheck: false,
      iframe: true, // Changed to true which may improve performance
      editHTMLDocumentMode: false,
      enter: "P",
      defaultMode: "1",
      processPasteHTML: true,
    }),
    []
  );

  // Increased debounce time to reduce update frequency
  const debouncedUpdate = useCallback(
    debounce((newContent) => {
      setContent(newContent);
    }, 500), // Increased from 300ms to 500ms
    []
  );

  // Memoize the update handler
  const handleUpdate = useCallback(
    (newContent) => {
      debouncedUpdate(newContent);
    },
    [debouncedUpdate]
  );

  // Memoize the save handler
  const handleSave = useCallback(async () => {
    try {
      await updatePolicy({ updatedData: { termsOfService: content } }).unwrap();
      message.success("Return policy updated successfully!");
    } catch (err) {
      message.error("Update failed! Try again.");
    }
  }, [updatePolicy, content]);

  useEffect(() => {
    if (isSuccess && data?.data) {
      const policyText =
        typeof data.data.termsOfService === "string"
          ? data.data.termsOfService
          : JSON.stringify(data.data.termsOfService) || "Default Policy";

      // Set content only if it's different from current state
      if (policyText !== content && content === "Loading Policy...") {
        setContent(policyText);
      }
    }
  }, [data, isSuccess, content]);

  // Show error messages only when they change
  useEffect(() => {
    if (isError && error) {
      message.error(error.message || "Failed to load return policy.");
    }
  }, [isError, error]);

  useEffect(() => {
    if (updateError) {
      message.error("Failed to update return policy.");
    }
  }, [updateError]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-3 py-4">
      <JoditEditor
        ref={editor}
        value={content}
        onChange={handleUpdate}
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

export default ReturnPolicy;
