"use client"; // for onchange
import useTheme from "@/hooks/useTheme";
import React from "react";

function TextInput({
  value,
  setterFn,
  extraClass,
  placeHolder,
  name,
  readonly = false,
}: {
  value: string | null;
  setterFn: Function;
  extraClass?: string;
  placeHolder?: string;
  name?: string;
  readonly?: boolean;
}) {
  const ui = useTheme();
  return (
    <input
      type="text"
      value={!!value ? value : ""}
      name={name ? name : "textInput"}
      placeholder={placeHolder}
      className={`px-3 py-2 ${
        readonly ? ` bg-inherit` : `${ui.inputBg}`
      } border-1 ${
        ui.mainBorder
      } rounded-lg w-full outline-0 shadow-xs ${extraClass}`}
      onChange={(e) => setterFn(e.target.value)}
      readOnly={readonly}
    />
  );
}

export default TextInput;
