import React from "react";

function InputGroups({
  sizes,
  label,
  name,
  options,
  defaultValue,
}: {
  sizes: string[];
  label: string;
  name: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
}) {
  return (
    <div className={`flex w-full items-center flex-wrap`}>
      <label className={`${sizes[0]}`}>{label}</label>
      <div className={`flex gap-5 ${sizes[1]} px-2`}>
        {options.map((option) => (
          <div
            className="flex gap-2 flex-row-reverse items-center"
            key={option.value}
          >
            <label htmlFor={option.value}>{option.label}</label>
            <input
              id={option.value}
              type="radio"
              value={option.value}
              name={name}
              defaultChecked={
                defaultValue?.toLocaleLowerCase() ===
                option.value.toLocaleLowerCase()
              }
              className="size-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputGroups;
