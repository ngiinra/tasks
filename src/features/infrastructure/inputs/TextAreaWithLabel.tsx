import React from "react";
import TextArea from "./TextArea";

function TextAreaWithLabel({
  sizes,
  label,
  value,
  setterFn,
}: {
  sizes: string[];
  label: string;
  value: string;
  setterFn: Function;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center w-full gap-x-2">
      <div className={sizes[0]}>
        <label className="w-full">{label}</label>
      </div>
      <div className={sizes[1]}>
        <TextArea value={value} setterFn={setterFn} />
      </div>
    </div>
  );
}

export default TextAreaWithLabel;
