import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

function TermsAndCondition() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <>
      <div className="w-full h-fit  px-10 ">
        <h1 className="text-[20px] font-medium ">Terms And Condition</h1>
        <div className="w-5/5  bg-black">
          <JoditEditor
            className="my-5 bg-red-300"
            ref={editor}
            // value={content}
            value=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium totam voluptates blanditiis dicta facilis..."
            onChange={(newContent) => {
              setContent(newContent);
            }}
            config={{
              controls: true,
              theme: "default",
              allowResizeX: false,
              allowResizeY: false,
            }}
          />
        </div>
        <div className="flex items-center justify-end">
          <button className="bg-prince hover:bg-prince/90 text-white  px-10 py-2.5 mt-5 rounded-md">
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default TermsAndCondition;
