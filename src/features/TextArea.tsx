import useTheme from "@/hooks/useTheme";
import React from "react";

function TextArea({ value, setterFn }: { value: string; setterFn: Function }) {
  const ui = useTheme();
  return (
    <textarea
      value={value}
      className={`px-3 py-2 border-1 ${ui.mainBorder} rounded-lg w-full outline-0 shadow-xs ${ui.inputBg}`}
      onChange={(e) => setterFn(e)}
    ></textarea>
  );
}

export default TextArea;
