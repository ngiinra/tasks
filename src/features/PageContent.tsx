"use client";
import useTheme from "@/hooks/useTheme";
import React from "react";
import Pagetitle from "./Pagetitle";

function PageContent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const ui = useTheme();
  return (
    <div className="pt-5">
      <div
        className={`lg:mx-auto max-w-6xl p-10 rounded-lg ${ui.pageBg} ${ui.pageText}`}
      >
        <Pagetitle title={title} />
        {children}
      </div>
    </div>
  );
}

export default PageContent;
