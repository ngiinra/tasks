"use client"; // for onchange
import useTheme from "@/hooks/useTheme";
import React from "react";

function TextInput({
  value,
  setterFn,
  extraClass,
  placeHolder,
}: {
  value: string;
  setterFn: Function;
  extraClass?: string;
  placeHolder?: string;
}) {
  const ui = useTheme();
  return (
    <input
      type="text"
      value={value}
      placeholder={placeHolder}
      className={`px-3 py-2 border-1 ${ui.mainBorder} rounded-lg w-full outline-0 shadow-xs ${ui.inputBg} ${extraClass}`}
      onChange={(e) => setterFn(e.target.value)}
    />
  );
}

export default TextInput;
