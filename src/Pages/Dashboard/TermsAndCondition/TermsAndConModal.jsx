import { IoMdCloseCircleOutline, IoMdCloseCircle } from "react-icons/io";

import { Button } from "antd";
import { IoArrowBackCircleOutline } from "react-icons/io5";
// import TextArea from "antd/es/input/TextArea";
// import TextEditor from "./TextEditor";
import TermsAndConditionEdit from "./TermsAndConEdit";
// import ModalForm from "./BlogForm";

const TermsAndConModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-gray-100 p-10  rounded-2xl shadow-lg w-[1000px] h-[800px] relative"
        onClick={handleModalClick}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <IoMdCloseCircleOutline
            size={26}
            className="fill-gray-600 hover:fill-black transition-colors duration-200"
          />
        </button>
        <div className="w-full h-auto flex justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-1.5">
            <IoArrowBackCircleOutline
              size={26}
              className="font-medium cursor-pointer"
            />
            Editing Terms & Condition
          </h2>
        </div>

        <div className="mt-16 flex ">
          {/* <TextEditor /> */}
          <TermsAndConditionEdit />
        </div>
      </div>
    </div>
  );
};

export default TermsAndConModal;
