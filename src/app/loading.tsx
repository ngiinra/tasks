"use client";
import useTheme from "@/hooks/useTheme";
import React from "react";

function loading() {
  const ui = useTheme();
  return (
    <div
      className={`h-screen w-full m-0 ${ui.loadingBg} flex items-center justify-center`}
    >
      در حال دریافت اطلاعات
    </div>
  );
}

export default loading;
