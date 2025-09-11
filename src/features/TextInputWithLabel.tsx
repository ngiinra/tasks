import React from "react";
import TextInput from "./TextInput";

function TextInputWithLabel({
  sizes,
  label,
  value,
  setterFn,
  inputExtraClass,
}: {
  sizes: string[];
  label: string;
  value: string;
  setterFn: Function;
  inputExtraClass?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center w-full gap-x-2">
      <div className={sizes[0]}>
        <label className="w-full">{label}</label>
      </div>
      <div className={sizes[1]}>
        <TextInput
          value={value}
          setterFn={setterFn}
          extraClass={inputExtraClass}
        />
      </div>
    </div>
  );
}

export default TextInputWithLabel;
