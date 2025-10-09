import useTheme from "@/hooks/useTheme";
import React from "react";

function TextArea({
  value,
  setterFn,
  placeHolder,
}: {
  value: string;
  setterFn: Function;
  placeHolder?: string;
}) {
  const ui = useTheme();
  return (
    <textarea
      value={value}
      placeholder={placeHolder}
      className={`px-3 py-2 border-1 ${ui.mainBorder} rounded-lg w-full outline-0 shadow-xs ${ui.inputBg}`}
      onChange={(e) => setterFn(e.target.value)}
    ></textarea>
  );
}

export default TextArea;
