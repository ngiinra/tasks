"use client";
import useTheme from "@/hooks/useTheme";
import React from "react";

function Pagetitle({ title, inline }: { title: string; inline?: boolean }) {
  const ui = useTheme();
  return (
    <h1
      className={`mb-8 pb-4 border-b-2 ${ui.titleBorder} text-xl ${
        inline ? "inline" : ""
      }`}
    >
      {title}
    </h1>
  );
}

export default Pagetitle;
