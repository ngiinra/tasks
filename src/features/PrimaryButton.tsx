"use client"; //بخاطر onclick
import useTheme from "@/hooks/useTheme";
import React from "react";

function PrimaryButton({
  text,
  onClick,
  extraClass,
  isLoading,
}: {
  text: string;
  onClick: Function;
  extraClass?: string;
  isLoading: boolean;
}) {
  const ui = useTheme();
  return (
    <button
      className={`px-3 py-2 text-center m-1 border-1 ${ui.buttonBg} ${ui.buttonText} ${ui.hoverButton} outline-0 shadow-md cursor-pointer rounded-lg ${extraClass} disabled:opacity-30`}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      disabled={isLoading}
    >
      {isLoading ? "لطفا شکیبا باشید" : text}
    </button>
  );
}

export default PrimaryButton;
