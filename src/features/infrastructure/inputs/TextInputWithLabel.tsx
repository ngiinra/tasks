import React from "react";
import TextInput from "./TextInput";

function TextInputWithLabel({
  sizes,
  label,
  value,
  setterFn,
  inputExtraClass,
  readonly,
}: {
  sizes: string[];
  label: string;
  value: string | null;
  setterFn: Function;
  inputExtraClass?: string;
  readonly?: boolean;
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
          readonly={readonly}
        />
      </div>
    </div>
  );
}

export default TextInputWithLabel;
