import React from "react";
import MultiSelect from "./MultiSelect";

function MultiSelectWithLabel({
  sizes,
  label,
  list,
  setterFn,
  defaultValues,
}: {
  sizes: string[];
  label: string;
  list: { text: string; value: string }[];
  setterFn: Function;
  defaultValues?: string[];
}) {
  return (
    <div className="flex flex-col md:flex-row items-center w-full gap-x-2">
      <div className={sizes[0]}>
        <label className="w-full">{label}</label>
      </div>
      <div className={sizes[1]}>
        <MultiSelect
          list={list}
          setterFn={setterFn}
          defaultValues={defaultValues}
        />
      </div>
    </div>
  );
}

export default MultiSelectWithLabel;
