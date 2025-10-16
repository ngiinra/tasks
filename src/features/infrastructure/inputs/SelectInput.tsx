"use client"; //بخاطر onchange
import useTheme from "@/hooks/useTheme";
import React from "react";

function SelectInput({
  options,
  defaultValue,
  setValue,
  extraClass,
}: {
  options: { text: string; value: string }[];
  defaultValue: string;
  setValue: Function;
  extraClass?: string;
}) {
  const ui = useTheme();
  return (
    <select
      className={`w-full border-1 ${ui.mainBorder} ${
        extraClass ? extraClass : "px-3 py-2"
      } rounded-lg ${ui.inputBg} outline-0 shadow-xs`}
      value={defaultValue}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((opt: { text: string; value: string }) => (
        <option value={opt.value} key={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;
