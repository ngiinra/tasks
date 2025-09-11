"use client"; //بخاطر onchange
import useTheme from "@/hooks/useTheme";
import React from "react";

function SelectInput({
  options,
  defaultValue,
  setValue,
}: {
  options: { text: string; value: string }[];
  defaultValue: string;
  setValue: Function;
}) {
  const ui = useTheme();
  return (
    <select
      className={`w-full border-1 ${ui.mainBorder} px-3 py-2 rounded-lg ${ui.inputBg} outline-0 shadow-xs`}
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
