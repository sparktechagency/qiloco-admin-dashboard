import React from "react";
import { useState } from "react";

import { Button, Tabs } from "antd";

import { IoArrowBackCircleOutline } from "react-icons/io5";
import TermsAndConModal from "./TermsAndConModal";

const TermsAndConArticle = () => {
  return (
    <div className="w-full text-left text-lg leading-6 mt-20">
      <h2 className="font-semibold text-[24px]">Terms And Conditions</h2>
      <p className="mt-10 text-[16px] text-[#5C5C5C] break-words leading-7">
        Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci.
        Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis
        aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis
        habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan
        vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse
        convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis
        convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa
        donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis
        pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit
        pulvinar fermentum in id sed. At pellentesque non semper eget egestas
        vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh
        quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum
        donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus.
        Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus
        arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi
        lectus.
        <br />
        Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci.
        Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis
        aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis
        habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan
        vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse
        convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis
        convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa
        donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis
        pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit
        pulvinar fermentum in id sed. At pellentesque non semper eget egestas
        vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh
        quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum
        donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus.
        Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus
        arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi
        lectus.
      </p>
    </div>
  );
};

const TermsAndConCS = ({ onOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="mt-5">
      <div className="flex flex-col ">
        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-semibold flex items-center gap-1">
            <IoArrowBackCircleOutline
              size={26}
              className="font-medium cursor-pointer"
            />
            Terms And Condition
          </h1>
        </div>
      </div>
      <TermsAndConArticle />
      <Button
        className="w-36 h-12 bg-dashboard text-white text-lg border-none mt-10"
        onClick={() => setIsModalOpen(true)}
      >
        Edit
      </Button>
      <TermsAndConModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Customers",
    children: <TermsAndConCS />,
  },
  {
    key: "2",
    label: "Sales",
    children: <TermsAndConCS />,
  },
];

export default function TermsAndCondition() {
  return (
    <div className="mx-14 mt-24">
      <Tabs
        defaultActiveKey="1"
        items={items}
        size="large"
        onChange={onChange}
        type="card"
      />
    </div>
  );
}
