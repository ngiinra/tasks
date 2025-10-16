import useTheme from "@/hooks/useTheme";
import React from "react";

function Devider({ title }: { title?: string }) {
  const ui = useTheme();
  return (
    <div
      className={`border-b-1 ${ui.deviderBorder} my-4 relative h-5 bg-inherit`}
    >
      {title && (
        <p
          className={`absolute right-[10%] bottom-[-50%] bg-inherit px-4 font-bold ${ui.deviderText}`}
        >
          {title}
        </p>
      )}
    </div>
  );
}

export default Devider;
