import React from "react";
import SelectInput from "./SelectInput";

function SelectInputWithLabel({
  options,
  defaultValue,
  setValue,
  label,
  sizes,
}: {
  options: { text: string; value: string }[];
  defaultValue: string;
  setValue: Function;
  label: string;
  sizes: string[];
}) {
  return (
    <div className="flex flex-col md:flex-row items-center w-full gap-x-2">
      <div className={sizes[0]}>
        <label className="w-full">{label}</label>
      </div>
      <div className={sizes[1]}>
        <SelectInput
          options={options}
          defaultValue={defaultValue}
          setValue={setValue}
        />
      </div>
    </div>
  );
}

export default SelectInputWithLabel;
